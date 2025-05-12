<?php
require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/header.php");

/**
 * @global CMain $APPLICATION
 */

$APPLICATION->SetTitle("Вопрос-ответ");
$APPLICATION->AddChainItem("Вопрос-ответ", "/qna/");

$APPLICATION->IncludeComponent(
"bitrix:news.list",
"faq",
[
"IBLOCK_TYPE" => "content",
"IBLOCK_ID" => QNA_IBLOCK_ID,
"NEWS_COUNT" => "100",
"SORT_BY1" => "SORT",
"SORT_ORDER1" => "ASC",
"FIELD_CODE" => ["NAME", "DETAIL_TEXT"],
"PROPERTY_CODE" => [],
"CHECK_DATES" => "Y",
"DETAIL_URL" => "",
"AJAX_MODE" => "N",
"SET_TITLE" => "N",
"SET_BROWSER_TITLE" => "N",
"SET_META_KEYWORDS" => "N",
"SET_META_DESCRIPTION" => "N",
"INCLUDE_IBLOCK_INTO_CHAIN" => "N",
"ADD_SECTIONS_CHAIN" => "N",
"HIDE_LINK_WHEN_NO_DETAIL" => "Y",
"PARENT_SECTION" => "",
"PARENT_SECTION_CODE" => "",
"INCLUDE_SUBSECTIONS" => "Y",
"DISPLAY_TOP_PAGER" => "N",
"DISPLAY_BOTTOM_PAGER" => "N",
"PAGER_SHOW_ALL" => "N",
"CACHE_TYPE" => "A",
"CACHE_TIME" => "36000000",
"CACHE_FILTER" => "Y",
"CACHE_GROUPS" => "Y",
"ACTIVE_DATE_FORMAT" => "d.m.Y",
],
false
);

require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/footer.php");