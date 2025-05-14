<?php require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/header.php");

/** @global CMain $APPLICATION */

$APPLICATION->SetTitle("Сотрудничество");
$APPLICATION->AddChainItem("Сотрудничество", "/cooperation/");
?>

    <section class="info_section">
        <div class="heading_1 upper">Сотрудничество</div>
        <img src="<?= SITE_TEMPLATE_PATH ?>/assets/img/jpg/disney.jpg" alt="">
        <div class="right_content">
            <?php
            $APPLICATION->IncludeComponent(
                "bitrix:main.include",
                "",
                [
                    "AREA_FILE_SHOW" => "file",
                    "PATH" => SITE_TEMPLATE_PATH . "/include/about/cooperation_text.php",
                    "EDIT_TEMPLATE" => ""
                ],
                false
            );
            ?>
            <div class="button bordered full-w">Связаться с нами</div>
        </div>
    </section>

<?php
$APPLICATION->IncludeComponent(
    "bitrix:news.list",
    "partners_slider",
    [
        "IBLOCK_TYPE" => "content",
        "IBLOCK_ID" => PARTNERS_IBLOCK_ID,
        "NEWS_COUNT" => "50",
        "SORT_BY1" => "SORT",
        "SORT_ORDER1" => "ASC",
        "PROPERTY_CODE" => [],
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