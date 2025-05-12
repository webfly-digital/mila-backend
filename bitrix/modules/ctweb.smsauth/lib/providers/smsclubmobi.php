<?

namespace Ctweb\SMSAuth;

use Bitrix\Main\Config\Option;
use Bitrix\Main\Localization\Loc;
use Bitrix\Main\Web\Json;

Loc::loadMessages(__FILE__);


class ProviderSMSCLUBMOBI extends ProviderBase
{
    protected $code = 'SMSCLUBMOBI';

    public function sendQuery($method, $arParams)
    {
        $token = $this->options[$this->getFieldKey('TOKEN')];

        $json = Json::encode($arParams);

        $context = stream_context_create(array(
            'http' => array(
                'method' => 'POST',
                'header'  => "Authorization: Bearer $token\r\nContent-type: application/json",
                'content' => $json
            )
        ));
        $url = 'https://im.smsclub.mobi/sms/' . $method;

        $content = file_get_contents($url, false, $context);
        if (!$content)
            return [
                'error_code' => 400,
                'error_response' => "Unknown error"
            ];

        $content = Json::decode($content);

        return $content;
    }

    public static function getErrorCodes()
    {
        return array(
            '1' => Loc::getMessage('CSR_ERROR_PARAMETER'),
            '2' => Loc::getMessage('CSR_ERROR_CREDINALS'),
            '3' => Loc::getMessage('CSR_ERROR_BALANCE'),
            '4' => Loc::getMessage('CSR_ERROR_IP_BAN'),
            '5' => Loc::getMessage('CSR_ERROR_DATE_FORMAT'),
            '6' => Loc::getMessage('CSR_ERROR_MESSAGE_BAN'),
            '7' => Loc::getMessage('CSR_ERROR_PHONE'),
            '8' => Loc::getMessage('CSR_ERROR_NOT_SENDED'),
            '9' => Loc::getMessage('CSR_ERROR_TOO_MANY'),
            400 => Loc::getMessage('CSR_ERROR_PARAMETER'),
        );
    }

    public function getBalance()
    {
        $response = $this->sendQuery('balance', []);
        if (!$response['success_request'])
            return $response['error'];

        return ['balance' => (float) $response['success_request']['info']['money']];
    }

    public function getSenders()
    {
        $response = self::sendQuery('originator', []);

        if (!$response['success_request'])
            return $response['error'];

        $arSenders = array();
        foreach ($response['success_request']['info'] as $sender) {
            $arSenders[$sender] = $sender;
        }

        return $arSenders;
    }

    public function sendSMS($arFields)
    {
        if (strlen($arFields['PHONE']) <= 0) {
            $this->LAST_ERROR = GetMessage('CSR_ERROR_NO_PHONE');
            return false;
        }

        // Sender
        $sender = $this->options[$this->getFieldKey('SENDERS')];
        if (!trim($sender)) {
            $this->LAST_ERROR = GetMessage('CSR_SENDERS_NOT_FOUND');
            Module::addLog("{$arFields['PHONE']}: " . $this->LAST_ERROR, 'ERROR');
            return false;
        }

        $arSend = array();
        $arSend['message'] = $this->PrepareMessage($this->options['TEXT_MESSAGE'], $arFields);
        $arSend['phone'] = explode(',', preg_replace("/\+/", '', $arFields["PHONE"]));

        // Sender
        $arSend['src_addr'] = $sender;

        $res = self::sendQuery('send', $arSend);

        if (!$res['success_request']) {
            $arFields["RESULT"] = 'fail';
            $this->LAST_ERROR = $this->getError($res['error_code']);
            Module::addLog("{$arFields['PHONE']}: " . $this->LAST_ERROR, 'ERROR');

            return false;
        }

        $arFields["RESULT"] = 'success';
        Module::addLog("{$arFields['PHONE']}: success");

        return true;
    }



    public function showAuthForm($tabControl)
    {
        $token = $this->options[$this->getFieldKey('TOKEN')];

        $tabControl->AddEditField($this->getFieldKey('TOKEN'), GetMessage('CSR_TOKEN'), false, array("size" => 30, "maxlength" => 255), $token);
        if (!empty($token)) {
            $balance = $this->getBalance();
            if (is_array($balance)) {
                $tabControl->AddViewField($this->getFieldKey('BALANCE'), GetMessage("CSR_BALANCE"), $balance['balance']);
                $tabControl->AddViewField("CSR_CONNECT_OK", "", GetMessage("CSR_CONNECT_OK"));
            } else {
                $tabControl->AddViewField("CSR_NOTE_SMS_PROVIDER", "", GetMessage("CSR_CHECK_API", array("#ERROR_TEXT#" => $balance)));
            }
        } else {
            $tabControl->AddViewField("CSR_NOTE_SMS_PROVIDER", "", GetMessage("CSR_NEED_REGISTER", array("#SMSLINK#" => "https://my.smsclub.mobi/")));
        }
    }

}