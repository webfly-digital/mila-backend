<?php require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/header.php");

use Webfly\Tools\Favorites;

/** @global CMain $APPLICATION */

$APPLICATION->SetTitle("Избранное");

$ids = Favorites::getIds();

if (!empty($ids)) {
    $GLOBALS['arrFavoritesFilter'] = ['ID' => $ids];
} else {
    // заглушка, чтобы компонент не вывел весь каталог
    $GLOBALS['arrFavoritesFilter'] = ['ID' => 0];
}

$APPLICATION->IncludeComponent(
    'bitrix:catalog.section',
    'product_cards',
    [
        'IBLOCK_TYPE'          => CATALOG_IBLOCK_TYPE,
        'IBLOCK_ID'            => CATALOG_IBLOCK_ID,
        'FILTER_NAME'          => 'arrFavoritesFilter',
        'PAGE_ELEMENT_COUNT'   => count($ids) ?: 1,
        'PROPERTY_CODE'        => ['VES'],
        'OFFERS_PROPERTY_CODE' => ['VES'],
        'PRICE_CODE'           => ['RETAIL_PRICE'],
        'SHOW_ALL_WO_SECTION'  => 'Y',
        'ELEMENT_SORT_FIELD'   => 'UF_DATE_CREATE',
        'ELEMENT_SORT_ORDER'   => 'DESC',
        'CACHE_TYPE'           => 'A',
        'CACHE_TIME'           => '36000000',
        'MODE' => 'favorites',
    ],
    false
);

require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/footer.php");