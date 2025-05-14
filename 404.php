<?php
include_once($_SERVER["DOCUMENT_ROOT"] . "/bitrix/modules/main/include/urlrewrite.php");

CHTTP::SetStatus("404 Not Found");
@define("ERROR_404", "Y");

require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/header.php");

/** @global CMain $APPLICATION */

$APPLICATION->SetTitle("Страница не найдена");
?>

<section class="default">
    <div class="error-page">
        <p class="error-number">404</p>
        <p class="text">Извините, страница не найдена</p>
        <a href="/catalog/" class="button">Вернуться в каталог</a>
    </div>
</section>

<?php require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/footer.php"); ?>