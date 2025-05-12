<?

namespace Ctweb\SMSAuth;

use Bitrix\Main\Config\Option;
use Bitrix\Main\Localization\Loc;
use Bitrix\Main\Web\Json;

Loc::loadMessages(__FILE__);

class ProviderTURBOSMSUA extends ProviderBase
{
    protected $code = 'TURBOSMSUA';

    public function sendQuery($method, $arParams)
    {
        $arParams["token"] = $this->options[$this->getFieldKey('TOKEN')];
        $url = "https://api.turbosms.ua/{$method}.json";

        $url .= "?" . http_build_query($arParams);

        $content = file_get_contents($url);
        if (!$content) {
            return [
                'response_code' => 301,
            ];
        }
        $content = Json::decode($content);

        return $content;
    }

    public static function getErrorCodes()
    {
        return array(
            '0'   => Loc::getMessage('CW_SA_TURBOSMSUA_ERROR_0'),
            '1'   => Loc::getMessage('CW_SA_TURBOSMSUA_ERROR_1'),
            '103' => Loc::getMessage('CW_SA_TURBOSMSUA_ERROR_103'),
            '104' => Loc::getMessage('CW_SA_TURBOSMSUA_ERROR_104'),
            '105' => Loc::getMessage('CW_SA_TURBOSMSUA_ERROR_105'),
            '106' => Loc::getMessage('CW_SA_TURBOSMSUA_ERROR_106'),
            '200' => Loc::getMessage('CW_SA_TURBOSMSUA_ERROR_200'),
            '201' => Loc::getMessage('CW_SA_TURBOSMSUA_ERROR_201'),
            '202' => Loc::getMessage('CW_SA_TURBOSMSUA_ERROR_202'),
            '203' => Loc::getMessage('CW_SA_TURBOSMSUA_ERROR_203'),
            '204' => Loc::getMessage('CW_SA_TURBOSMSUA_ERROR_204'),
            '205' => Loc::getMessage('CW_SA_TURBOSMSUA_ERROR_205'),
            '206' => Loc::getMessage('CW_SA_TURBOSMSUA_ERROR_206'),
            '300' => Loc::getMessage('CW_SA_TURBOSMSUA_ERROR_300'),
            '301' => Loc::getMessage('CW_SA_TURBOSMSUA_ERROR_301'),
            '302' => Loc::getMessage('CW_SA_TURBOSMSUA_ERROR_302'),
            '303' => Loc::getMessage('CW_SA_TURBOSMSUA_ERROR_303'),
            '304' => Loc::getMessage('CW_SA_TURBOSMSUA_ERROR_304'),
            '305' => Loc::getMessage('CW_SA_TURBOSMSUA_ERROR_305'),
            '306' => Loc::getMessage('CW_SA_TURBOSMSUA_ERROR_306'),
            '307' => Loc::getMessage('CW_SA_TURBOSMSUA_ERROR_307'),
            '400' => Loc::getMessage('CW_SA_TURBOSMSUA_ERROR_400'),
            '401' => Loc::getMessage('CW_SA_TURBOSMSUA_ERROR_401'),
            '402' => Loc::getMessage('CW_SA_TURBOSMSUA_ERROR_402'),
            '403' => Loc::getMessage('CW_SA_TURBOSMSUA_ERROR_403'),
            '404' => Loc::getMessage('CW_SA_TURBOSMSUA_ERROR_404'),
            '405' => Loc::getMessage('CW_SA_TURBOSMSUA_ERROR_405'),
            '406' => Loc::getMessage('CW_SA_TURBOSMSUA_ERROR_406'),
            '407' => Loc::getMessage('CW_SA_TURBOSMSUA_ERROR_407'),
            '408' => Loc::getMessage('CW_SA_TURBOSMSUA_ERROR_408'),
            '409' => Loc::getMessage('CW_SA_TURBOSMSUA_ERROR_409'),
            '410' => Loc::getMessage('CW_SA_TURBOSMSUA_ERROR_410'),
            '411' => Loc::getMessage('CW_SA_TURBOSMSUA_ERROR_411'),
            '412' => Loc::getMessage('CW_SA_TURBOSMSUA_ERROR_412'),
            '413' => Loc::getMessage('CW_SA_TURBOSMSUA_ERROR_413'),
            '414' => Loc::getMessage('CW_SA_TURBOSMSUA_ERROR_414'),
            '415' => Loc::getMessage('CW_SA_TURBOSMSUA_ERROR_415'),
            '501' => Loc::getMessage('CW_SA_TURBOSMSUA_ERROR_501'),
            '502' => Loc::getMessage('CW_SA_TURBOSMSUA_ERROR_502'),
            '503' => Loc::getMessage('CW_SA_TURBOSMSUA_ERROR_503'),
            '504' => Loc::getMessage('CW_SA_TURBOSMSUA_ERROR_504'),
            '505' => Loc::getMessage('CW_SA_TURBOSMSUA_ERROR_505'),
            '800' => Loc::getMessage('CW_SA_TURBOSMSUA_ERROR_800'),
            '801' => Loc::getMessage('CW_SA_TURBOSMSUA_ERROR_801'),
            '802' => Loc::getMessage('CW_SA_TURBOSMSUA_ERROR_802'),
            '803' => Loc::getMessage('CW_SA_TURBOSMSUA_ERROR_803'),
            '999' => Loc::getMessage('CW_SA_TURBOSMSUA_ERROR_999'),
        );
    }

    public function getBalance()
    {
        $response = $this->sendQuery('user/balance', []);
        if ($response['response_status'] !== 'OK')
            return $this->getError($response['response_code']);

        return $response['response_result'];
    }

    public function sendSMS($arFields)
    {
        if (strlen($arFields['PHONE']) <= 0) {
            $this->LAST_ERROR = GetMessage('CSR_ERROR_NO_PHONE');
            Module::addLog("{$arFields['PHONE']}: " . $this->LAST_ERROR, 'ERROR');
            return false;
        }

        // Sender
        $sender = $this->options[$this->getFieldKey('SENDERS')];
        if (!trim($sender)) {
            $this->LAST_ERROR = GetMessage('CW_SA_TURBOSMSUA_ERROR_200');
            Module::addLog("{$arFields['PHONE']}: " . $this->LAST_ERROR, 'ERROR');
            return false;
        }

        $arSend = array();
        $arSend['recipients'] = explode(",", $arFields["PHONE"]);

        $type = $this->options[$this->getFieldKey('TYPE')];

        if ($type === 'all') {
            $arSend['sms'] = [
                'text' => $this->PrepareMessage($this->options['TEXT_MESSAGE'], $arFields),
                'sender' => $sender,
            ];
            $arSend['viber'] = [
                'text' => $this->PrepareMessage($this->options['TEXT_MESSAGE'], $arFields),
                'sender' => $sender,
            ];
        } elseif ($type === 'viber') {
            $arSend['viber'] = [
                'text' => $this->PrepareMessage($this->options['TEXT_MESSAGE'], $arFields),
                'sender' => $sender,
            ];
        } else {
            $arSend['sms'] = [
                'text' => $this->PrepareMessage($this->options['TEXT_MESSAGE'], $arFields),
                'sender' => $sender,
            ];
        }

        $res = self::sendQuery('message/send', $arSend);

        if (in_array((int) $res['response_code'], [800, 801, 802, 803])) {
            $arFields["RESULT"] = 'success';
            Module::addLog("{$arFields['PHONE']}: success");

            return true;
        }

        $arFields["RESULT"] = 'fail';
        Module::addLog("{$arFields['PHONE']}: " . $this->getError($res['response_code']), 'ERROR');
        $this->LAST_ERROR = $this->getError($res['response_code']);

        return false;
    }

    public function showAuthForm($tabControl)
    {
        $api_key = $this->options[$this->getFieldKey('TOKEN')];
        $type = $this->options[$this->getFieldKey('TYPE')];

        $tabControl->AddEditField($this->getFieldKey('TOKEN'), GetMessage('CSR_TOKEN'), false, array("size" => 30, "maxlength" => 255), $api_key);
        if (!empty($api_key)) {
            $balance = $this->getBalance();
            if (is_array($balance)) {
                $tabControl->AddDropdownField($this->getFieldKey('TYPE'), GetMessage("CSR_TYPE"), false, ['sms' => "SMS", 'viber' => "Viber", 'all' => "SMS + Viber", ], $type);
                $tabControl->AddViewField($this->getFieldKey('BALANCE'), GetMessage("CSR_BALANCE"), $balance['balance']);
                $tabControl->AddViewField("CSR_CONNECT_OK", "", GetMessage("CSR_CONNECT_OK"));
            } else {
                $tabControl->AddViewField("CSR_NOTE_SMS_PROVIDER", "", GetMessage("CSR_CHECK_API", array("#ERROR_TEXT#" => $balance)));
            }
        } else {
            $tabControl->AddViewField("CSR_NOTE_SMS_PROVIDER", "", GetMessage("CSR_NEED_REGISTER", array("#SMSLINK#" => "https://turbosms.ua/")));
        }
    }

    public function showSendersForm($tabControl)
    {
        $tabControl->AddEditField($this->getFieldKey('SENDERS'), GetMessage("CSR_SENDERS"), true, [], $this->options[$this->getFieldKey('SENDERS')]);
    }


    public function getDefaultOptions() {
        return array(
            $this->getFieldKey('BALANCE') => '',
            $this->getFieldKey('TOKEN') => '',
            $this->getFieldKey('TYPE') => 'sms',
            $this->getFieldKey('SENDERS') => 'Market',
        );
    }
}