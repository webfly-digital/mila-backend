<?php
require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/header.php");

/** @global CMain $APPLICATION */

$APPLICATION->SetTitle("Акции");

$APPLICATION->IncludeComponent(
    "bitrix:news",
    "stocks",
    [
        "IBLOCK_TYPE" => "content",
        "IBLOCK_ID" => (string)STOCKS_IBLOCK_ID,
        "NEWS_COUNT" => "20",
        "SORT_BY1" => "ACTIVE_FROM",
        "SORT_ORDER1" => "DESC",
        "SORT_BY2" => "SORT",
        "SORT_ORDER2" => "ASC",
        "CACHE_TYPE" => "A",
        "CACHE_TIME" => "36000000",
        "SEF_MODE" => "Y",
        "SEF_FOLDER" => "/stocks/",
        "SEF_URL_TEMPLATES" => [
            "news" => "",
            "detail" => "#ELEMENT_CODE#/",
        ],
        "LIST_ACTIVE_DATE_FORMAT" => "d F Y",
        "SET_TITLE" => "Y",
        "SET_BROWSER_TITLE" => "Y",
        "SET_META_KEYWORDS" => "Y",
        "SET_META_DESCRIPTION" => "Y",
        "INCLUDE_IBLOCK_INTO_CHAIN" => "Y",
        "ADD_SECTIONS_CHAIN" => "N",
        "SET_STATUS_404" => "Y",
    ],
    false
);

require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/footer.php");