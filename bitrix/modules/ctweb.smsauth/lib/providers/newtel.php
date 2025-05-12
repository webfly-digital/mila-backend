<?
namespace Ctweb\SMSAuth;

use Bitrix\Main\Config\Option;
use Bitrix\Main\Localization\Loc;
use Bitrix\Main\Web\Json;

Loc::loadMessages(__FILE__);

class ProviderNEWTEL extends ProviderBase
{
    protected $code = 'NEWTEL';

    public function sendQuery($method, $arParams = [])
    {
        $token = $this->options[$this->getFieldKey('LOGIN')];
        $signatureKey = $this->options[$this->getFieldKey('TOKEN')];

        $jsonParams = json_encode($arParams, JSON_FORCE_OBJECT);
        $time = time();

        $sign = $token . $time . hash('sha256',
                $method . "\n" .
                $time . "\n" .
                $token . "\n" .
                $jsonParams . "\n" .
                $signatureKey
            );

        $curl = curl_init();
        curl_setopt_array($curl, [
            CURLINFO_HEADER_OUT => true,
            CURLOPT_HEADER => 0,
            CURLOPT_HTTPHEADER => [
                'Authorization: Bearer ' . $sign,
                'Content-Type: application/json',
            ],
            CURLOPT_POST => true,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_SSL_VERIFYPEER => false,
            CURLOPT_URL =>"https://api.new-tel.net/{$method}",
            CURLOPT_POSTFIELDS => $jsonParams,
        ]);
        $response = curl_exec($curl);

        return Json::decode($response);
    }

    public function getBalance()
    {
        $response = $this->sendQuery('company/get-state', []);
        if ($response['status'] === 'error') {
            return $response['message'];
        }

        return ['balance' => "{$response['data']['state']['balance']} ({$response['data']['state']['credit']}) {$response['data']['state']['currency']}"];
    }

    public function sendSMS($arFields)
    {
        if (strlen($arFields['PHONE']) <= 0) {
            $this->LAST_ERROR = GetMessage('CSR_ERROR_NO_PHONE');
            Module::addLog("{$arFields['PHONE']}: " . $this->LAST_ERROR, 'ERROR');
            return false;
        }

        $arSend = array();
        $arSend['dstNumber'] = preg_replace("/[^\d]/", "", $arFields["PHONE"]);
        $arSend['async'] = 1;

        $type = $this->options[$this->getFieldKey('TYPE')];
        if ($type === 'voice') {
            $method = "call-password/start-voice-password-call";
            $arSend['text'] = $arFields['CODE'];
        } else {
            $method = "call-password/start-password-call";
            $arSend['pin'] = $arFields['CODE'];
        }

        $response = self::sendQuery($method, $arSend);

        if ($response['status'] === 'success') {
            $arFields["RESULT"] = 'success';
            Module::addLog("{$arFields['PHONE']}: success");
            return true;
        }

        $arFields["RESULT"] = 'fail';
        Module::addLog("{$arFields['PHONE']}: " . $response['message'], 'ERROR');
        $this->LAST_ERROR = $response['message'];

        return false;
    }

    public function showAuthForm($tabControl)
    {
        $auth_token = $this->options[$this->getFieldKey('LOGIN')];
        $sign_token = $this->options[$this->getFieldKey('TOKEN')];
        $type = $this->options[$this->getFieldKey('TYPE')];

        $tabControl->AddEditField($this->getFieldKey('LOGIN'), GetMessage("CSR_AUTH_API_KEY"), false, array("size" => 30, "maxlength" => 255), $auth_token);
        $tabControl->AddEditField($this->getFieldKey('TOKEN'), GetMessage("CSR_SIGN_API_KEY"), false, array("size" => 30, "maxlength" => 255), $sign_token);
        if (!empty($auth_token) && !empty($sign_token)) {
            $balance = $this->getBalance();
            if (is_array($balance)) {
                $tabControl->AddDropdownField($this->getFieldKey('TYPE'), GetMessage("CSR_MESSAGE_TYPE"), false, ['call' => GetMessage("CSR_MESSAGE_TYPE_CALL"), 'voice' => GetMessage("CSR_MESSAGE_TYPE_VOICE")], $type);
                $tabControl->AddViewField($this->getFieldKey('BALANCE'), GetMessage("CSR_BALANCE"), $balance['balance']);
                $tabControl->AddViewField("CSR_CONNECT_OK", "", GetMessage("CSR_CONNECT_OK"));
            } else {
                $tabControl->AddViewField("CSR_NOTE_SMS_PROVIDER", "", GetMessage("CSR_CHECK_API", array("#ERROR_TEXT#" => $balance)));
            }
        } else {
            $tabControl->AddViewField("CSR_NOTE_SMS_PROVIDER", "", GetMessage("CSR_NEED_REGISTER", array("#SMSLINK#" => "https://new-tel.met/")));
        }
    }

    public function showSendersForm($tabControl)
    {
        $tabControl->addHiddenField("ALPHABET", "0123456789");
        $tabControl->addHiddenField("CODE_LENGTH", "5");
        $tabControl->addHiddenField("CSR_CODE_EXAMPLE", "");
        if ($this->options['ALPHABET'] != '0123456789' || $this->options['CODE_LENGTH'] != '5') {
            $tabControl->addViewField('CSR_NEED_SAVE', "", "<div class='adm-info-message-red'><div class='adm-info-message' style='padding-left: 30px;'>" . GetMessage("CSR_ERROR_SAVE_SETTINGS") . "</div></div>");
        }
        // noop
    }


    public function getDefaultOptions()
    {
        return array(
            $this->getFieldKey('BALANCE') => '',
            $this->getFieldKey('LOGIN') => '',
            $this->getFieldKey('TOKEN') => '',
            $this->getFieldKey('TYPE') => 'call',
        );
    }
}