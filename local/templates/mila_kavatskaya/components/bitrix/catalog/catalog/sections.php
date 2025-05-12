<?php if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

/** @var array $arResult */
/** @var CBitrixComponent $component */
/** @global CMain $APPLICATION */

$APPLICATION->IncludeComponent(
    'bitrix:catalog.section.list',
    'catalog_grid',
    [
        'IBLOCK_TYPE' => 'content',
        'IBLOCK_ID' => CATALOG_IBLOCK_ID,
        'SECTION_ID' => 0,
        'SECTION_CODE' => '',
        'TOP_DEPTH' => 1,
        'COUNT_ELEMENTS' => 'Y',
        'CACHE_TYPE' => 'A',
        'CACHE_TIME' => 3600000,
        'SECTION_URL' => $arResult['FOLDER'] . $arResult['URL_TEMPLATES']['section'],
    ],
    $component,
    ['HIDE_ICONS' => 'Y']
);