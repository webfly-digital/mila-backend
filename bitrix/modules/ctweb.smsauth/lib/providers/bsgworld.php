<?

namespace Ctweb\SMSAuth;

use Bitrix\Main\Config\Option;
use Bitrix\Main\Localization\Loc;
use Bitrix\Main\Web\Json;

Loc::loadMessages(__FILE__);

class ProviderBSGWORLD extends ProviderBase
{
    protected $code = 'BSGWORLD';

    public function sendQuery($method, $arParams = [], $requestMethod = null)
    {
        $token = $this->options[$this->getFieldKey('TOKEN')];
        $url = "https://api.bsg.hk/v1.0/{$method}";

        $curl = curl_init();
        curl_setopt_array($curl, [
            CURLOPT_HTTPHEADER => [
                'X-API-KEY: ' . $token,
                'Content-Type: application/json',
            ],
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_URL => $url,
        ]);
        if (!empty($arParams)) {
            curl_setopt($curl, CURLOPT_POSTFIELDS, Json::encode($arParams));
            curl_setopt($curl, CURLOPT_POST, true);
        }
        if ($requestMethod) {
            curl_setopt($curl, CURLOPT_CUSTOMREQUEST, $requestMethod);
        }
        $response = curl_exec($curl);

        curl_close($curl);

        return Json::decode($response);
    }

    public static function getErrorCodes()
    {
        return array(
            1 => GetMessage('CSR_ERROR_CREDINALS'),
        );
    }

    public function getBalance()
    {
        $response = $this->sendQuery('common/balance');
        if ($response['error'])
            return $this->getError($response['error']);

        return ['balance' => number_format($response['amount'], 2, '.', ' ') . " {$response['currency']}"];
    }

    public function sendSMS($arFields)
    {
        if (strlen($arFields['PHONE']) <= 0) {
            $this->LAST_ERROR = GetMessage('CSR_ERROR_NO_PHONE');
            Module::addLog("{$arFields['PHONE']}: " . $this->LAST_ERROR, 'ERROR');
            return false;
        }

        $arSend = array();

        // Sender
        $sender = $this->options[$this->getFieldKey('SENDERS')];
        if (!trim($sender)) {
            $this->LAST_ERROR = GetMessage('CSR_ERROR_NO_SENDER');
            Module::addLog("{$arFields['PHONE']}: " . $this->LAST_ERROR, 'ERROR');
            return false;
        }

        $arSend['originator'] = $sender;
        $arSend['msisdn'] = $arFields["PHONE"];
        $arSend['body'] = $this->PrepareMessage($this->options['TEXT_MESSAGE'], $arFields);
        $arSend['validity'] = 1;

        $arSend['destination'] = "phone";

        $arSend['reference'] = md5($arFields['PHONE']. time());

        $res = self::sendQuery('sms/create', $arSend, 'PUT');

        if (!$res['error'] && !$res['result']['error']) {
            $arFields["RESULT"] = 'success';
            Module::addLog("{$arFields['PHONE']}: success");
            return true;
        }

        $arFields["RESULT"] = 'fail';
        $error = $this->getError($res['result']['error'] ?: $res['error']);
        if (!$error)
            $error = $res['result']['errorDescription'] ?: $res['errorDescription'];

        Module::addLog("{$arFields['PHONE']}: " . $error, 'ERROR');
        $this->LAST_ERROR = $error;

        return false;
    }

    public function showAuthForm($tabControl)
    {
        $api_key = $this->options[$this->getFieldKey('TOKEN')];

        $tabControl->AddEditField($this->getFieldKey('TOKEN'), GetMessage('CSR_TOKEN'), false, array("size" => 30, "maxlength" => 255), $api_key);
        if (!empty($api_key)) {
            $balance = $this->getBalance();
            if (is_array($balance)) {
                $tabControl->AddViewField($this->getFieldKey('BALANCE'), GetMessage("CSR_BALANCE"), $balance['balance']);
                $tabControl->AddViewField("CSR_CONNECT_OK", "", GetMessage("CSR_CONNECT_OK"));
            } else {
                $tabControl->AddViewField("CSR_NOTE_SMS_PROVIDER", "", GetMessage("CSR_CHECK_API", array("#ERROR_TEXT#" => $balance)));
            }
        } else {
            $tabControl->AddViewField("CSR_NOTE_SMS_PROVIDER", "", GetMessage("CSR_NEED_REGISTER", array("#SMSLINK#" => "https://bsg.world/")));
        }
    }

    public function showSendersForm($tabControl)
    {
        $tabControl->AddEditField($this->getFieldKey('SENDERS'), GetMessage("CSR_SENDERS"), true, [], $this->options[$this->getFieldKey('SENDERS')]);
    }


    public function getDefaultOptions()
    {
        return array(
            $this->getFieldKey('BALANCE') => '',
            $this->getFieldKey('TOKEN') => '',
            $this->getFieldKey('SENDERS') => '',
        );
    }
}