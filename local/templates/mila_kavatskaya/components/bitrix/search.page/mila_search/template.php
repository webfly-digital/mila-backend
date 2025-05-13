<?php if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

/** @var array $arResult */
/** @global CMain $APPLICATION */

$ids = [];
foreach ($arResult["SEARCH"] as $item) {
    if (
        $item['MODULE_ID'] === 'iblock' &&
        $item['PARAM1'] === CATALOG_IBLOCK_TYPE &&
        $item['PARAM2'] == CATALOG_IBLOCK_ID &&
        is_numeric($item['ITEM_ID'])
    ) {
        $ids[] = (int)$item['ITEM_ID'];
    }
}

/* ----------------------------------------------------- */
/*  Основная область                                     */
/* ----------------------------------------------------- */

if (empty($ids)) { ?>

    <div class="search_not_found">
        <p class="heading_4">
            По запросу «<?= htmlspecialcharsbx($arResult['REQUEST']['QUERY']) ?>» ничего не найдено
        </p>
        <a class="button" href="/catalog/">Перейти в каталог</a>
    </div>

<?php } else {

    global $arrSearchFilter;
    $arrSearchFilter = ['ID' => $ids];

    $APPLICATION->IncludeComponent(
        'bitrix:catalog.section',
        'product_cards',
        [
            'IBLOCK_TYPE'          => CATALOG_IBLOCK_TYPE,
            'IBLOCK_ID'            => CATALOG_IBLOCK_ID,
            'FILTER_NAME'          => 'arrSearchFilter',
            'PAGE_ELEMENT_COUNT'   => count($ids),
            'PROPERTY_CODE'        => ['VES'],
            'OFFERS_PROPERTY_CODE' => ['VES'],
            'PRICE_CODE'           => ['RETAIL_PRICE'],
            'SHOW_ALL_WO_SECTION'  => 'Y',
            'ELEMENT_SORT_FIELD'   => 'AVAILABLE',
            'ELEMENT_SORT_ORDER'   => 'DESC',
            'CACHE_TYPE'           => 'A',
            'CACHE_TIME'           => '36000000',
            'MODE' => 'search',
        ],
        false
    );
}

/* ----------------------------------------------------- */
/*  Дополнительный блок внизу («Попробуйте также …»)     */
/* ----------------------------------------------------- */

global $arrExtraFilter;
$arrExtraFilter = [];

$APPLICATION->IncludeComponent(
    'bitrix:catalog.section',
    'product_cards',
    [
        'IBLOCK_TYPE'          => CATALOG_IBLOCK_TYPE,
        'IBLOCK_ID'            => CATALOG_IBLOCK_ID,
        'FILTER_NAME'          => 'arrExtraFilter',
        'PAGE_ELEMENT_COUNT'   => 4,
        'PROPERTY_CODE'        => ['VES'],
        'OFFERS_PROPERTY_CODE' => ['VES'],
        'PRICE_CODE'           => ['RETAIL_PRICE'],
        'SHOW_ALL_WO_SECTION'  => 'Y',
        'CACHE_TYPE'           => 'A',
        'CACHE_TIME'           => '36000000',
        'MODE' => 'popular',
    ],
    false
);