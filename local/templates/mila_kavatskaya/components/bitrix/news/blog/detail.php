<?php if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

/** @var array $arParams */
/** @var array $arResult */
/** @global CMain $APPLICATION */
/** @var CBitrixComponent $component */
/** @var CBitrixComponentTemplate $this */

$this->setFrameMode(true);

$APPLICATION->IncludeComponent(
    "bitrix:news.detail",
    "",
    [
        "IBLOCK_TYPE" => $arParams["IBLOCK_TYPE"],
        "IBLOCK_ID" => $arParams["IBLOCK_ID"],
        "ELEMENT_ID" => $arResult["VARIABLES"]["ELEMENT_ID"] ?? null,
        "ELEMENT_CODE" => $arResult["VARIABLES"]["ELEMENT_CODE"] ?? null,
        "FIELD_CODE" => $arParams["DETAIL_FIELD_CODE"] ?? [],
        "PROPERTY_CODE" => [
            "AUTHOR",
            "AUTHOR_QUOTE",
            "AUTHOR_PHOTO",
            "SUBTITLE",
            "PRODUCTS",
            "RELATED_ARTICLES"
        ],
        "DISPLAY_DATE" => $arParams["DISPLAY_DATE"],
        "DISPLAY_NAME" => $arParams["DISPLAY_NAME"],
        "DISPLAY_PICTURE" => $arParams["DISPLAY_PICTURE"],
        "DISPLAY_PREVIEW_TEXT" => $arParams["DISPLAY_PREVIEW_TEXT"],
        "ACTIVE_DATE_FORMAT" => $arParams["DETAIL_ACTIVE_DATE_FORMAT"] ?? "d.m.Y",
        "CACHE_TYPE" => $arParams["CACHE_TYPE"],
        "CACHE_TIME" => $arParams["CACHE_TIME"],
        "CACHE_GROUPS" => $arParams["CACHE_GROUPS"],
        "CHECK_DATES" => $arParams["CHECK_DATES"],
        "SET_TITLE" => $arParams["SET_TITLE"],
        "SET_STATUS_404" => $arParams["SET_STATUS_404"],
        "SHOW_404" => $arParams["SHOW_404"] ?? "N",
        "FILE_404" => $arParams["FILE_404"] ?? "",
    ],
    $component
);