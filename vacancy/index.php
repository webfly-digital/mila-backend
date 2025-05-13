<?php require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/header.php");

/** @global CMain $APPLICATION */

$APPLICATION->SetTitle("Вакансии");
$APPLICATION->AddChainItem("Вакансии", "/vacancy/");
?>

<section class="info_section">
    <div class="heading_1 upper">Вакансии</div>
    <img src="<?= SITE_TEMPLATE_PATH ?>/assets/img/jpg/vacancy-header.jpg" alt="">
    <div class="right_content">
        <?php
        $APPLICATION->IncludeComponent(
            "bitrix:main.include",
            "",
            [
                "AREA_FILE_SHOW" => "file",
                "PATH" => SITE_TEMPLATE_PATH . "/include/vacancy/vacancy_text.php",
                "EDIT_TEMPLATE" => ""
            ],
            false
        );
        ?>
        <div class="button bordered full-w">
            Смотреть вакансии на hh.ru
            <i class="icon-corner-arrow"></i>
        </div>
    </div>
</section>

<?php require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/footer.php"); ?>