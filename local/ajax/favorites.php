<?php

define("NO_KEEP_STATISTIC", true);
define("NO_AGENT_CHECK", true);
define("PUBLIC_AJAX_MODE", true);
require_once($_SERVER["DOCUMENT_ROOT"] . "/bitrix/modules/main/include/prolog_before.php");

header('Content-Type: application/json');

use Bitrix\Main\Context;
use Webfly\Tools\Favorites;

$request = Context::getCurrent()->getRequest();

global $USER;

if (!$USER->IsAuthorized()) {
    echo json_encode(['redirectToLogin' => true]);
    die;
}

$data = json_decode($request->getInput(), true);
$productId = (int)($data['id'] ?? 0);

if (!$productId) {
    echo json_encode(['success' => false]);
    die;
}

if (Favorites::isFavorite($productId)) {
    Favorites::remove($productId);
    $favorited = false;
} else {
    Favorites::add($productId);
    $favorited = true;
}

echo json_encode([
    'success' => true,
    'favorited' => $favorited,
    'count' => Favorites::count(),
]);