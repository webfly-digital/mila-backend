<?php
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

use Bitrix\Main\Page\Asset;

/**
 * @global CMain $APPLICATION
 */

$oAsset = Asset::getInstance();
?>
<?php if ($APPLICATION->GetCurPage(false) !== SITE_DIR) { ?>
    </div>
<?php } ?>

</main>
<div class="container">
    <footer class="footer">
        <div class="footer_col">
            <a href="/catalog/" class="heading_3_italic">Каталог</a>
            <?php $APPLICATION->IncludeComponent(
                "bitrix:menu",
                "footer_links",
                [
                    "ROOT_MENU_TYPE" => "footer_catalog",
                    "MENU_CACHE_TYPE" => "A",
                    "MENU_CACHE_TIME" => "3600",
                    "MENU_CACHE_USE_GROUPS" => "Y",
                    "MAX_LEVEL" => "1",
                    "CHILD_MENU_TYPE" => "",
                    "USE_EXT" => "N",
                    "ALLOW_MULTI_SELECT" => "N"
                ]
            ); ?>
        </div>

        <div class="footer_col">
            <a href="/about/" class="heading_3_italic">Информация</a>
            <?php $APPLICATION->IncludeComponent(
                "bitrix:menu",
                "footer_links",
                [
                    "ROOT_MENU_TYPE" => "footer_info",
                    "MENU_CACHE_TYPE" => "A",
                    "MENU_CACHE_TIME" => "3600",
                    "MENU_CACHE_USE_GROUPS" => "Y",
                    "MAX_LEVEL" => "1",
                    "CHILD_MENU_TYPE" => "",
                    "USE_EXT" => "N",
                    "ALLOW_MULTI_SELECT" => "N"
                ]
            ); ?>
        </div>

        <div class="footer_subscribe">
            <?php $APPLICATION->IncludeComponent("bitrix:main.include", "", ["AREA_FILE_SHOW" => "file", "PATH" => SITE_TEMPLATE_PATH . "/include/footer/subscribe_1.php"]); ?>
            <form class="subscribe_input">
                <input type="email" placeholder="E-mail">
                <button type="submit" class="submit"></button>
            </form>
            <?php $APPLICATION->IncludeComponent("bitrix:main.include", "", ["AREA_FILE_SHOW" => "file", "PATH" => SITE_TEMPLATE_PATH . "/include/footer/subscribe_2.php"]); ?>
        </div>
        <div class="footer_contacts">
            <a href="tel:+79999999999" class="heading_4">8 (999) 999-99-99</a>
            <p class="text">с 9:00 до 20:00</p>
            <div class="call_link">Обратный звонок</div>

            <nav>
                <?php
                $APPLICATION->IncludeFile(
                    SITE_TEMPLATE_PATH . "/include/common/socials.php",
                    [],
                    ["MODE" => "html"]
                );
                ?>
            </nav>
        </div>
        <div class="footer_notify">
            <article>
                <?php
                $APPLICATION->IncludeComponent(
                    "bitrix:main.include",
                    "",
                    ["AREA_FILE_SHOW" => "file",
                        "PATH" => SITE_TEMPLATE_PATH . "/include/footer/notify.php"]
                );
                ?>
            </article>
        </div>
        <div class="subfooter">
            <?php
            $APPLICATION->IncludeFile(
                SITE_TEMPLATE_PATH . "/include/footer/subfooter.php",
                [],
                ["MODE" => "html"]
            );
            ?>


        </div>

        <?php
        // Подключение попапов через включаемые области
        $APPLICATION->IncludeComponent("bitrix:main.include", "", ["AREA_FILE_SHOW" => "file", "PATH" => SITE_TEMPLATE_PATH . "/include/popups/popup_auth.php"]);
//        $APPLICATION->IncludeComponent("bitrix:main.include", "", ["AREA_FILE_SHOW" => "file", "PATH" => SITE_TEMPLATE_PATH . "/include/popups/popup_auth_next.php"]);
        $APPLICATION->IncludeComponent("bitrix:main.include", "", ["AREA_FILE_SHOW" => "file", "PATH" => SITE_TEMPLATE_PATH . "/include/popups/popup_register.php"]);
        $APPLICATION->IncludeComponent("bitrix:main.include", "", ["AREA_FILE_SHOW" => "file", "PATH" => SITE_TEMPLATE_PATH . "/include/popups/popup_cart.php"]);
        $APPLICATION->IncludeComponent("bitrix:main.include", "", ["AREA_FILE_SHOW" => "file", "PATH" => SITE_TEMPLATE_PATH . "/include/popups/popup_review.php"]);
        $APPLICATION->IncludeComponent("bitrix:main.include", "", ["AREA_FILE_SHOW" => "file", "PATH" => SITE_TEMPLATE_PATH . "/include/popups/popup_cities.php"]);
        ?>
    </footer>

    <?php /*
    // Подключение JS
    //todo: временно подключаем через cdn
    $oAsset->addString('<script type="module" src="https://unpkg.com/imask"></script>', true);
    $oAsset->addString('<script type="module" src="https://cdn.jsdelivr.net/npm/easydropdown@4.2.0/dist/index.min.js"></script>', true);
    $oAsset->addString('<script type="module" src="https://unpkg.com/dropzone"></script>', true);
    $oAsset->addString('<script type="module" src="https://cdnjs.cloudflare.com/ajax/libs/glightbox/3.2.0/js/glightbox.min.js"></script>', true);

    // Подключение основного JS сайта
    $oAsset->addString('<script src="' . SITE_TEMPLATE_PATH . '/assets/js/swiper-bundle.min.js?t=' . filemtime($_SERVER['DOCUMENT_ROOT'] . SITE_TEMPLATE_PATH . '/assets/js/swiper-bundle.min.js') . '"></script>', true);
    $oAsset->addString('<script src="' . SITE_TEMPLATE_PATH . '/assets/js/main.js?t=' . filemtime($_SERVER['DOCUMENT_ROOT'] . SITE_TEMPLATE_PATH . '/assets/js/main.js') . '"></script>', true);
    */ ?>
    <?php
    //        $oAsset->addJs(SITE_TEMPLATE_PATH . '/assets/js/main.js?t=' . filemtime($_SERVER['DOCUMENT_ROOT'] . SITE_TEMPLATE_PATH . '/assets/js/main.js'));
    //        $oAsset->addJs(SITE_TEMPLATE_PATH . '/assets/js/swiper.js?t=' . filemtime($_SERVER['DOCUMENT_ROOT'] . SITE_TEMPLATE_PATH . '/assets/js/swiper.js'));

    $oAsset->addString('<script src="' . SITE_TEMPLATE_PATH . '/assets/js/swiper.js?t=' . filemtime($_SERVER['DOCUMENT_ROOT'] . SITE_TEMPLATE_PATH . '/assets/js/swiper.js') . '"></script>', true);
    $oAsset->addString('<script src="' . SITE_TEMPLATE_PATH . '/assets/js/main.js?t=' . filemtime($_SERVER['DOCUMENT_ROOT'] . SITE_TEMPLATE_PATH . '/assets/js/main.js') . '"></script>', true);

    ?>
</div>
</body>
</html>