<?php
define("STOP_STATISTICS", true);
define("BX_SECURITY_SHOW_MESSAGE", true);
require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/header.php");

global $APPLICATION;

$APPLICATION->SetTitle("Тест панели");

echo "Тестовая страница";

$APPLICATION->ShowPanel();

\Bitrix\Main\Diag\Debug::dump([
    'isAuthorized' => $USER->IsAuthorized(),
    'userID' => $USER->GetID(),
    'login' => $USER->GetLogin(),
    'groups' => $USER->GetUserGroupArray()
]);

require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/footer.php");