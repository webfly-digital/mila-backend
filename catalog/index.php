<?php
require $_SERVER['DOCUMENT_ROOT'] . '/bitrix/header.php';

/** @global CMain $APPLICATION */

$APPLICATION->SetTitle('Каталог');

$APPLICATION->IncludeComponent(
    'bitrix:catalog',
    'catalog',
    [
        'IBLOCK_TYPE' => 'content',
        'IBLOCK_ID' => CATALOG_IBLOCK_ID,
        'SEF_MODE' => 'Y',
        'SEF_FOLDER' => '/catalog/',
        'SEF_URL_TEMPLATES' => [
            'sections' => '',
            'section' => '#SECTION_CODE#/',
            'element' => '#SECTION_CODE#/#ELEMENT_CODE#/',
        ],
        'SECTION_TOP_DEPTH' => 1,
        'SECTION_COUNT_ELEMENTS' => 'Y',
        'SHOW_TOP_ELEMENTS' => 'N',
        'USE_FILTER' => 'Y',
        'USE_COMPARE' => 'N',
        'CACHE_TYPE' => 'A',
        'CACHE_TIME' => 3600000,
        'ADD_SECTIONS_CHAIN' => 'Y',
        'ADD_ELEMENT_CHAIN' => 'N',
    ],
    false
);

require $_SERVER['DOCUMENT_ROOT'] . '/bitrix/footer.php';