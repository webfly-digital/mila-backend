<?php
define("NO_KEEP_STATISTIC", true);
define("NO_AGENT_CHECK", true);
define("PUBLIC_AJAX_MODE", true);
require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/modules/main/include/prolog_before.php");

use Bitrix\Main\Loader;
use Bitrix\Main\Web\Json;

header('Content-Type: application/json; charset=UTF-8');

$q = trim($_GET['q'] ?? '');
if (mb_strlen($q) < 3) {
    echo Json::encode([]);
    return;
}

Loader::includeModule('iblock');
Loader::includeModule('catalog');

$result = [];

// Путь к fallback-изображению
$fallback = '/local/components/webfly/search.ajax/templates/.default/img/fallback.png';

$res = CIBlockElement::GetList(
    ['SORT' => 'ASC'],
    [
        'IBLOCK_ID' => CATALOG_IBLOCK_ID,
        'ACTIVE' => 'Y',
        '%NAME' => $q
    ],
    false,
    ['nTopCount' => 5],
    ['ID', 'NAME', 'DETAIL_PAGE_URL', 'DETAIL_PICTURE', 'PREVIEW_PICTURE']
);

while ($item = $res->GetNext()) {
    $image = '';
    $price = '';

    // Выбираем приоритетно DETAIL_PICTURE, потом PREVIEW_PICTURE, потом fallback
    $pictureId = $item['DETAIL_PICTURE'] ?: $item['PREVIEW_PICTURE'];
    if ($pictureId) {
        $file = CFile::GetFileArray($pictureId);
        $image = $file['SRC'] ?? $fallback;
    } else {
        $image = $fallback;
    }

    // Получаем цену (если есть)
    $productPrice = \CCatalogProduct::GetOptimalPrice($item['ID']);
    if (!empty($productPrice['RESULT_PRICE']['DISCOUNT_PRICE'])) {
        $price = $productPrice['RESULT_PRICE']['DISCOUNT_PRICE'];
    }

    $result[] = [
        'name'  => $item['NAME'],
        'url'   => $item['DETAIL_PAGE_URL'],
        'image' => $image,
        'price' => $price
    ];
}

echo Json::encode($result, JSON_UNESCAPED_UNICODE);