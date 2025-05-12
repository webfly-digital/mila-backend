<?php
require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/header.php");

/**
 * @global CMain $APPLICATION
 */

$APPLICATION->SetTitle("Доставка и оплата");
$APPLICATION->AddChainItem("Доставка и оплата", "/delivery/");
?>
    <section class="info_section">
        <div class="heading_1 upper">Доставка и оплата</div>
        <div class="right_content">
            <p class="heading_4">Доставка</p>
            <?php
            $APPLICATION->IncludeFile(
                SITE_TEMPLATE_PATH . "/include/delivery/delivery_text.php",
                [],
                ["MODE" => "html"]
            );
            ?>
            <ul class="partners">
                <?php
                $APPLICATION->IncludeFile(
                    SITE_TEMPLATE_PATH . "/include/delivery/delivery_logos.php",
                    [],
                    ["MODE" => "html"]
                );
                ?>
            </ul>
            <p class="heading_4">Оплата</p>
            <?php
            $APPLICATION->IncludeFile(
                SITE_TEMPLATE_PATH . "/include/delivery/payment_text.php",
                [],
                ["MODE" => "html"]
            );
            ?>
        </div>
    </section>

<?php require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/footer.php");