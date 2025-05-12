<?

namespace Ctweb\SMSAuth;

use Bitrix\Main\Config\Option;
use Bitrix\Main\Localization\Loc;
use Bitrix\Main\Web\Json;

Loc::loadMessages(__FILE__);

class ProviderMAINSMSRU extends ProviderBase
{
    protected $code = 'MAINSMSRU';

    public function sendQuery($method, $arParams)
    {
        $arParams["apikey"] = $this->options[$this->getFieldKey('TOKEN')];
        $url = 'https://mainsms.ru/api/mainsms/' . $method;
        $url .= '?' . http_build_query($arParams);
        $content = file_get_contents($url);
        $content = Json::decode($content);

        return $content;
    }

    public static function getErrorCodes()
    {
        return array(
            '1' => Loc::getMessage('CW_SA_MAINSMSRU_ERROR_1'),
            '2' => Loc::getMessage('CW_SA_MAINSMSRU_ERROR_2'),
            '3' => Loc::getMessage('CW_SA_MAINSMSRU_ERROR_3'),
            '4' => Loc::getMessage('CW_SA_MAINSMSRU_ERROR_4'),
            '5' => Loc::getMessage('CW_SA_MAINSMSRU_ERROR_5'),
            '6' => Loc::getMessage('CW_SA_MAINSMSRU_ERROR_6'),
            '7' => Loc::getMessage('CW_SA_MAINSMSRU_ERROR_7'),
            '8' => Loc::getMessage('CW_SA_MAINSMSRU_ERROR_8'),
            '9' => Loc::getMessage('CW_SA_MAINSMSRU_ERROR_9'),
            '10' => Loc::getMessage('CW_SA_MAINSMSRU_ERROR_10'),
        );
    }

    public function getBalance()
    {
        $arParams = array(
            "project" => $this->options[$this->getFieldKey('LOGIN')],
        );
        $arResult = $this->sendQuery('message/balance', $arParams);
        if ($arResult['status'] !== 'success') {
            return $arResult['message'];
        }

        return ['balance' => $arResult['balance']];
    }

    public function getSenders()
    {
        $arResult = self::sendQuery('sender/list', array(
            'project' => $this->options[$this->getFieldKey('LOGIN')],
        ));

        $arSenders = array();
        if (is_array($arResult['senders'])) {
            foreach ($arResult['senders'] as $sender) {
                $arSenders[$sender] = $sender;
            }
        }

        return $arSenders;
    }

    public function sendSMS($arFields)
    {
        if (strlen($arFields['PHONE']) <= 0) {
            $this->LAST_ERROR = GetMessage('CSR_ERROR_NO_PHONE');
            return false;
        }
        $arSend = array();
        $arSend['message'] = $this->PrepareMessage($this->options['TEXT_MESSAGE'], $arFields);
        $arSend['recipients'] = $arFields["PHONE"];
        $arSend['project'] = $this->options[$this->getFieldKey('LOGIN')];

        if ($this->options[$this->getFieldKey('TEST_SMS')]) {
            $arSend['test'] = 1;
        } else {
            $arSend['test'] = 0;
        }

        // Sender
        $arSend['sender'] = $this->options[$this->getFieldKey('SENDERS')];
        if (empty($arSend['sender']))
            $arSend['sender'] = false;

        $res = self::sendQuery('message/send', $arSend);

        if ($res['status'] !== 'success') {
            $arFields["RESULT"] = 'fail';
            Module::addLog("{$arFields['PHONE']}: " . $this->getError($res['error']), 'ERROR');
            $this->LAST_ERROR = $this->getError($res['error']);

            return false;
        } else {
            $arFields["RESULT"] = 'success';
            Module::addLog("{$arFields['PHONE']}: success");

            return true;
        }

    }

    public function showAuthForm($tabControl)
    {
        $project = $this->options[$this->getFieldKey('LOGIN')];
        $api_key = $this->options[$this->getFieldKey('TOKEN')];

        $tabControl->AddEditField($this->getFieldKey('LOGIN'), GetMessage('CSR_PROJECT'), false, array("size" => 30, "maxlength" => 255), $project);
        $tabControl->AddEditField($this->getFieldKey('TOKEN'), GetMessage('CSR_API_KEY'), false, array("size" => 30, "maxlength" => 255), $api_key);
        if (!empty($api_key) && !empty($project)) {
            $balance = $this->getBalance();
            if (is_array($balance)) {
                $tabControl->AddViewField($this->getFieldKey('BALANCE'), GetMessage("CSR_BALANCE"), $balance['balance']);
                $tabControl->AddCheckBoxField($this->getFieldKey('TEST_SMS'), GetMessage("CSR_TEST_SMS"), false, 1, $this->options[$this->getFieldKey('TEST_SMS')]);
                $tabControl->AddViewField("CSR_CONNECT_OK", "", GetMessage("CSR_CONNECT_OK"));
            } else {
                $tabControl->AddViewField("CSR_NOTE_SMS_PROVIDER", "", GetMessage("CSR_CHECK_API", Array("#ERROR_TEXT#" => $balance)));
            }
        } else {
            $tabControl->AddViewField("CSR_NOTE_SMS_PROVIDER", "", GetMessage("CSR_NEED_REGISTER", array("#SMSLINK#" => "https://mainsms.ru")));
        }
    }

    public function getDefaultOptions() {
        return array(
            $this->getFieldKey('BALANCE') => '',
            $this->getFieldKey('LOGIN') => '',
            $this->getFieldKey('TOKEN') => '',
            $this->getFieldKey('SENDERS') => '',
            $this->getFieldKey('TEST_SMS') => 0,
        );
    }
}