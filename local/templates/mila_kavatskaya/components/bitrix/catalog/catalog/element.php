<?php if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

/**
 * Детальная страница товара (подключение компонента bitrix:catalog.element)
 *
 * @global CMain $APPLICATION
 * @var array $arParams
 * @var array $arResult
 * @var CBitrixComponentTemplate $this
 * @var CBitrixComponent $component
 */

$this->setFrameMode(true);

$APPLICATION->IncludeComponent(
    'bitrix:catalog.element',
    'catalog_detail',
    [
        'IBLOCK_TYPE' => $arParams['IBLOCK_TYPE'],
        'IBLOCK_ID' => $arParams['IBLOCK_ID'],
        'ELEMENT_ID' => $arResult['VARIABLES']['ELEMENT_ID'],
        'ELEMENT_CODE' => $arResult['VARIABLES']['ELEMENT_CODE'],
        'SECTION_ID' => $arResult['VARIABLES']['SECTION_ID'],
        'SECTION_CODE' => $arResult['VARIABLES']['SECTION_CODE'],
        'PROPERTY_CODE' => ['LEYBLY_STATUSY', 'MORE_PHOTO', 'VES', 'POMOL'],
        'PRICE_CODE' => ['BASE'],
        'CACHE_TYPE' => 'A',
        'CACHE_TIME' => 3600000,
        'SET_TITLE' => 'Y',
        'SHOW_PRICE_COUNT' => 1,
    ],
    $component
);