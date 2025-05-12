<?php
require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/header.php");

/**
 * @global CMain $APPLICATION
 */

$APPLICATION->SetTitle("Контакты");
$APPLICATION->AddChainItem("Контакты", "/contacts/");
?>

    <section class="contacts_page">
        <div class="head">
            <p class="heading_1 upper">Контакты</p>

            <nav class="info">
                <?php
                $APPLICATION->IncludeFile(
                    SITE_TEMPLATE_PATH . "/include/contacts/contacts_info.php",
                    [],
                    ["MODE" => "html"]
                );
                ?>
            </nav>

            <nav class="socials">
                <?php
                $APPLICATION->IncludeFile(
                    SITE_TEMPLATE_PATH . "/include/common/socials.php",
                    [],
                    ["MODE" => "html"]
                );
                ?>
            </nav>
        </div>

        <div class="contacts_shops">
            <?php
            $APPLICATION->IncludeComponent(
                "bitrix:news.list",
                "contacts",
                [
                    "IBLOCK_ID" => CONTACTS_IBLOCK_ID,
                    "IBLOCK_TYPE" => "content",
                    "NEWS_COUNT" => "33",
                    "SORT_BY1" => "SORT",
                    "SORT_ORDER1" => "ASC",
                    "PROPERTY_CODE" => ["ADDRESS", "WORKING_HOURS"],
                    "DETAIL_URL" => "",
                    "CACHE_TYPE" => "A",
                    "CACHE_TIME" => "36000000",
                    "SET_TITLE" => "N",
                    "SET_BROWSER_TITLE" => "N",
                    "SET_META_KEYWORDS" => "N",
                    "SET_META_DESCRIPTION" => "N",
                    "SET_LAST_MODIFIED" => "N",
                    "INCLUDE_SUBSECTIONS" => "Y",
                    "DISPLAY_PANEL" => "N",
                    "ACTIVE_DATE_FORMAT" => "d.m.Y"
                ],
                false
            );
            ?>
        </div>
    </section>

<?php require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/footer.php");