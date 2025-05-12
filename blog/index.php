<?php
require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/header.php");

/** @global CMain $APPLICATION */

$APPLICATION->SetTitle("Блог");

$APPLICATION->IncludeComponent(
    "bitrix:news",
    "blog",
    [
        "IBLOCK_TYPE" => "content",
        "IBLOCK_ID" => (string)BLOG_IBLOCK_ID,
        "NEWS_COUNT" => "8",
        "SORT_BY1" => "SORT",
        "SORT_ORDER1" => "ASC",
        "CACHE_TYPE" => "A",
        "CACHE_TIME" => "36000000",
        "SEF_MODE" => "Y",
        "SEF_FOLDER" => "/blog/",
        "SEF_URL_TEMPLATES" => [
            "news" => "",
            "detail" => "#SECTION_CODE_PATH#/#ELEMENT_CODE#/",
        ],
        "LIST_ACTIVE_DATE_FORMAT" => "d F Y",
        "SET_TITLE" => "Y",
        "SET_STATUS_404" => "Y",
        "INCLUDE_IBLOCK_INTO_CHAIN" => "Y",
        "ADD_SECTIONS_CHAIN" => "N",
        "DETAIL_PROPERTY_CODE" => ["RELATED_ARTICLES"]
    ],
    false
);
require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/footer.php");