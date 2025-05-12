<?php
require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/header.php");

/**
 * @global CMain $APPLICATION
 */

$APPLICATION->SetTitle("Система лояльности");
$APPLICATION->AddChainItem("Система лояльности", "/loyalty/");
?>
    <section class="info_section">
        <div class="heading_1 upper">
            <?php $APPLICATION->IncludeComponent("bitrix:main.include", "", ["AREA_FILE_SHOW" => "file", "PATH" => SITE_TEMPLATE_PATH . "/include/loyalty/title.php"]); ?>
        </div>
        <ul class="loyalty_system">
            <?php $APPLICATION->IncludeComponent("bitrix:main.include", "", ["AREA_FILE_SHOW" => "file", "PATH" => SITE_TEMPLATE_PATH . "/include/loyalty/list.php"]); ?>
        </ul>
        <div class="right_content">
            <?php $APPLICATION->IncludeComponent("bitrix:main.include", "", ["AREA_FILE_SHOW" => "file", "PATH" => SITE_TEMPLATE_PATH . "/include/loyalty/content.php"]); ?>
        </div>
    </section>
<?php require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/footer.php"); ?>