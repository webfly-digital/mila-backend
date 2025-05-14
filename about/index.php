<?php require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/header.php");

use Bitrix\Main\Page\Asset;

/** @global CMain $APPLICATION */

$APPLICATION->SetTitle("О компании");
$APPLICATION->AddChainItem("О компании", "/about/");

Asset::getInstance()->addJs(SITE_TEMPLATE_PATH . "/assets/js/pages/about.js");
?>

<section class="info_section">
    <div class="heading_1 upper">О компании</div>
    <img src="<?= SITE_TEMPLATE_PATH ?>/assets/img/jpg/about-header.jpg" alt="">
    <div class="right_content">
        <?php
        $APPLICATION->IncludeComponent(
            "bitrix:main.include",
            "",
            [
                "AREA_FILE_SHOW" => "file",
                "PATH" => SITE_TEMPLATE_PATH . "/include/about/about_text.php",
                "EDIT_TEMPLATE" => ""
            ],
            false
        );
        ?>
        <img src="<?= SITE_TEMPLATE_PATH ?>/assets/img/jpg/about-inside.jpg" alt="">
    </div>
</section>

<?php
$APPLICATION->IncludeComponent(
    "bitrix:news.list",
    "reviews",
    [
        "IBLOCK_TYPE" => "content",
        "IBLOCK_ID" => REVIEWS_IBLOCK_ID,
        "NEWS_COUNT" => "100",
        "SORT_BY1" => "ACTIVE_FROM",
        "SORT_ORDER1" => "DESC",
        "PROPERTY_CODE" => ["RATING", "IMAGES"],
        "CHECK_DATES" => "Y",
        "SET_TITLE" => "N",
        "INCLUDE_SUBSECTIONS" => "N",
        "SHOW_ALL_ELEMENTS" => "Y",
        "SHOW_DETAIL_LINK" => "N",
        "HIDE_LINK_WHEN_NO_DETAIL" => "Y",
        "CACHE_TYPE" => "A",
        "CACHE_TIME" => "3600",
        "CACHE_FILTER" => "N",
        "CACHE_GROUPS" => "Y"
    ],
    false
);

require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/footer.php"); ?>