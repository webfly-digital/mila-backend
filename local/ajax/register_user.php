<?php
define("NO_KEEP_STATISTIC", true);
define("NO_AGENT_CHECK", true);
define("PUBLIC_AJAX_MODE", true);
require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/modules/main/include/prolog_before.php");

use Bitrix\Main\Context;

global $USER;

$request = Context::getCurrent()->getRequest();

if (!$request->isPost() || !$request->isAjaxRequest()) {
    echo json_encode(['status' => 'error', 'message' => 'Некорректный запрос']);
    die();
}

$data = $request->getPostList()->toArray();

$password = randString(8);

$userFields = [
    "NAME"             => trim($data["NAME"]),
    "LAST_NAME"        => trim($data["LAST_NAME"]),
    "PERSONAL_PHONE"   => trim($data["PERSONAL_PHONE"]),
    "EMAIL"            => trim($data["EMAIL"]),
    "LOGIN"            => trim($data["EMAIL"]),
    "LID"              => SITE_ID,
    "ACTIVE"           => "Y",
    "GROUP_ID"         => [3],
    "PASSWORD"         => $password,
    "CONFIRM_PASSWORD" => $password,
];

// Кастомные поля — только если юр. лицо
if ($data["USER_TYPE"] === "legal") {
    $userFields["UF_COMPANY_NAME"]  = trim($data["UF_COMPANY_NAME"]);
    $userFields["UF_INN"]           = trim($data["UF_INN"]);
    $userFields["UF_KPP"]           = trim($data["UF_KPP"]);
    $userFields["UF_LEGAL_ADDRESS"] = trim($data["UF_LEGAL_ADDRESS"]);
    $userFields["UF_DIRECTOR"]      = trim($data["UF_DIRECTOR"]);
}

$user = new CUser();
$userId = $user->Add($userFields);

if ($userId > 0) {
    $USER->Authorize($userId);

    echo json_encode([
        'status' => 'success',
        'message' => 'Пользователь зарегистрирован',
        'user_id' => $userId,
    ]);
} else {
    echo json_encode([
        'status' => 'error',
        'message' => $user->LAST_ERROR,
    ]);
}