<?php if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

/** @var array $arParams */
/** @var array $arResult */
/** @global CMain $APPLICATION */
/** @var CBitrixComponent $component */

$APPLICATION->IncludeComponent(
    "bitrix:news.detail",
    "",
    [
        "IBLOCK_TYPE" => $arParams["IBLOCK_TYPE"],
        "IBLOCK_ID" => $arParams["IBLOCK_ID"],
        "ELEMENT_CODE" => $arResult["VARIABLES"]["ELEMENT_CODE"],
        "ELEMENT_ID" => $arResult["VARIABLES"]["ELEMENT_ID"],
        "FIELD_CODE" => ["ID", "NAME", "DETAIL_TEXT"],
        "PROPERTY_CODE" => ["SUBTITLE"],
        "SET_TITLE" => "Y",
        "SET_BROWSER_TITLE" => "Y",
        "SET_META_KEYWORDS" => "Y",
        "SET_META_DESCRIPTION" => "Y",
        "SET_STATUS_404" => "Y",
        "CACHE_TYPE" => "A",
        "CACHE_TIME" => "36000000",
    ],
    $component
);

$APPLICATION->IncludeComponent(
    "bitrix:news.list",
    "other_stocks",
    [
        "IBLOCK_TYPE" => $arParams["IBLOCK_TYPE"],
        "IBLOCK_ID" => $arParams["IBLOCK_ID"],
        "NEWS_COUNT" => 2,
        "SORT_BY1" => "ACTIVE_FROM",
        "SORT_ORDER1" => "DESC",
        "FIELD_CODE" => ["ID", "NAME", "DETAIL_PAGE_URL"],
        "PROPERTY_CODE" => ["SUBTITLE"],
        "DETAIL_URL" => "/stocks/#ELEMENT_CODE#/",
        "CACHE_TYPE" => "A",
        "CACHE_TIME" => "36000000",
        "SET_TITLE" => "N",
        "INCLUDE_IBLOCK_INTO_CHAIN" => "N",
        "ADD_SECTIONS_CHAIN" => "N",
    ],
    $component
);