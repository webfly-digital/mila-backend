<?php

namespace Ctweb\SMSAuth\Controller;

use Bitrix\Main\Engine\Controller;
use Bitrix\Main\Localization\Loc;
use Bitrix\Main\Config\Option;
use Bitrix\Main\PhoneNumber;
use Bitrix\Main\UserTable;
use Bitrix\Main\Loader;

use Ctweb\SMSAuth\Manager;
use Ctweb\SMSAuth\Module;

Loc::loadMessages(__FILE__);

class Sms extends Controller
{
    public function configureActions()
    {
        return [
            'sendTemplate' => [
                'prefilters' => []
            ],
        ];
    }

    public function sendTemplateAction($phone, $fields)
    {
        $options = Module::getOptions();

        $obProvider = null;
        try {
            $obProvider = Module::getProvider($options['PROVIDER']);

            $arFields = $fields + ['PHONE' => $phone];

            $event = new \Bitrix\Main\Event(Module::MODULE_ID, "OnSendSMS", array(&$arFields, &$obProvider));
            $event->send();

            $success = $obProvider->sendSMS($arFields);

            $event = new \Bitrix\Main\Event(Module::MODULE_ID, "OnAfterSendSMS", array($success, $arFields, $obProvider));
            $event->send();

            if ($success)
                return [
                    'status' => 'success'
                ];
            else
                return [
                    'status' => 'error',
                    'message' => $obProvider->LAST_ERROR
                ];
        } catch (\Exception $e) {
            return [
                'status' => 'error',
                'message' => $e->getMessage()
            ];
        }
    }
}