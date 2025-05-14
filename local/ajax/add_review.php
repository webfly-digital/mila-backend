<?php
define("STOP_STATISTICS", true);
define("NO_AGENT_CHECK", true);
define("PUBLIC_AJAX_MODE", true);

require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/modules/main/include/prolog_before.php");

use Bitrix\Main\Loader;
use Bitrix\Main\Application;

$response = ['success' => false];

if (!Loader::includeModule("iblock")) {
    $response['error'] = 'Модуль инфоблоков не подключен';
    echo json_encode($response);
    return;
}

$request = Application::getInstance()->getContext()->getRequest();

$name = trim($request->getPost("name"));
$comment = trim($request->getPost("comment"));
$rating = (int)$request->getPost("rating");
$images = $request->getFile("images");

if (!$name || !$comment || !$rating) {
    $response['error'] = 'Не заполнены обязательные поля';
    echo json_encode($response);
    return;
}

$elementFields = [
    "IBLOCK_ID" => REVIEWS_IBLOCK_ID,
    "NAME" => $name,
    "ACTIVE" => "Y",
    "PREVIEW_TEXT" => $comment,
    "PROPERTY_VALUES" => [
        "RATING" => $rating
    ]
];

if (!empty($images)) {
    $files = [];

    if (!is_array($images["name"])) {
        $files[] = $images;
    } else {
        foreach ($images["name"] as $k => $v) {
            $files[] = [
                "name" => $images["name"][$k],
                "type" => $images["type"][$k],
                "tmp_name" => $images["tmp_name"][$k],
                "error" => $images["error"][$k],
                "size" => $images["size"][$k],
            ];
        }
    }

    $propertyImages = [];
    foreach ($files as $file) {
        $propertyImages[] = [
            "VALUE" => [
                "name" => $file["name"],
                "type" => $file["type"],
                "tmp_name" => $file["tmp_name"],
                "error" => $file["error"],
                "size" => $file["size"],
            ],
            "DESCRIPTION" => ""
        ];
    }
    $elementFields["PROPERTY_VALUES"]["IMAGES"] = $propertyImages;
}

$el = new CIBlockElement();
if ($el->Add($elementFields)) {
    $response['success'] = true;
} else {
    $response['error'] = 'Ошибка при добавлении отзыва';
}

echo json_encode($response);