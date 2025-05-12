<?

namespace Ctweb\SMSAuth;

use Bitrix\Main\Config\Option;
use Bitrix\Main\Localization\Loc;
use Bitrix\Main\Web\Json;

Loc::loadMessages(__FILE__);

class ProviderKAZINFOTEH extends ProviderBase
{
    protected $code = 'KAZINFOTEH';

    public function sendQuery($method, $arParams = [])
    {
        $arParams['username'] = $this->options[$this->getFieldKey('LOGIN')];
        $arParams['password'] = $this->options[$this->getFieldKey('TOKEN')];
        $arParams['action'] = $method;

        $curl = curl_init();
        curl_setopt_array($curl, [
            CURLOPT_PORT => 9507,
            CURLOPT_HEADER => 0,
            CURLOPT_URL => "http://kazinfoteh.org/api?" . http_build_query($arParams),
            CURLOPT_RETURNTRANSFER => true,
        ]);

        $response = curl_exec($curl);
        curl_close($curl);

        return $this->parseResponse($response);
    }

    private function xml2array($xmlObject, $out = array())
    {
        foreach ((array)$xmlObject as $index => $node)
            $out[$index] = (is_object($node)) ? $this->xml2array($node) : $node;

        return $out;
    }

    private function parseResponse($response)
    {
        $xml = simplexml_load_string($response);

        return $this->xml2array($xml);
    }

    public static function getErrorCodes()
    {
        return array();
    }

    public function getBalance()
    {
        // noop
    }

    public function getSenders()
    {
        // noop
    }

    public function sendSMS($arFields)
    {
        if (strlen($arFields['PHONE']) <= 0) {
            $this->LAST_ERROR = GetMessage('CSR_ERROR_NO_PHONE');
            return false;
        }

        $arSend = array();
        $arSend['messagedata'] = $this->PrepareMessage($this->options['TEXT_MESSAGE'], $arFields);
        $arSend['recipient'] = $arFields["PHONE"];
        $arSend['messagetype'] = 'SMS:TEXT';

        // Sender
        $arSend['originator'] = $this->options[$this->getFieldKey('SENDERS')];

        $res = self::sendQuery('sendmessage', $arSend);

        if ($res['action'] !== 'sendmessage') {
            $arFields["RESULT"] = 'fail';
            Module::addLog("{$arFields['PHONE']}: " . $res['data']['errormessage'], 'ERROR');
            $this->LAST_ERROR = $res['data']['errormessage'];

            return false;
        }

        if ($res['data']['acceptreport']['statuscode']) {
            $arFields["RESULT"] = 'fail';
            Module::addLog("{$arFields['PHONE']}: " . $res['data']['statusmessage'], 'ERROR');
            $this->LAST_ERROR = $res['data']['statusmessage'];

            return false;
        }

        $arFields["RESULT"] = 'success';
        Module::addLog("{$arFields['PHONE']}: success");

        return true;
    }

    public function showAuthForm($tabControl)
    {
        $username = $this->options[$this->getFieldKey('LOGIN')];
        $password = $this->options[$this->getFieldKey('TOKEN')];

        $tabControl->AddEditField($this->getFieldKey('LOGIN'), GetMessage('CSR_LOGIN'), false, array("size" => 30, "maxlength" => 255), $username);
        $tabControl->AddEditField($this->getFieldKey('TOKEN'), GetMessage('CSR_PASSWORD'), false, array("size" => 30, "maxlength" => 255), $password);
    }

    public function showSendersForm($tabControl)
    {
        $tabControl->AddEditField($this->getFieldKey('SENDERS'), GetMessage("CSR_SENDERS"), true, [], $this->options[$this->getFieldKey('SENDERS')]);
    }

    public function getDefaultOptions()
    {
        return array(
            $this->getFieldKey('LOGIN') => '',
            $this->getFieldKey('TOKEN') => '',
            $this->getFieldKey('SENDERS') => '',
        );
    }
}