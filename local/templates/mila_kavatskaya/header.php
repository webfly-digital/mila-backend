<?php if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

use Bitrix\Main\Page\Asset;

/**
 * @global CMain $APPLICATION
 */

global $USER;

$oAsset = Asset::getInstance();
?>
    <!doctype html>
    <html lang="ru">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title><?php $APPLICATION->ShowTitle(); ?></title>

        <?php
        // Подключение CSS
        $oAsset->addCss(SITE_TEMPLATE_PATH . "/assets/styles/style.css");

        // Подключение jQuery
        $oAsset->addString('<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>', true);
        // Подключение обработчика для иконки избранного
        $oAsset->addJs(SITE_TEMPLATE_PATH . "/assets/js/pages/favorites.js");

        // Прелоад JS
        //    $oAsset->addString('<link crossorigin="anonymous" rel="modulepreload" as="script" href="https://unpkg.com/imask">');
        //    $oAsset->addString('<link crossorigin="anonymous" rel="modulepreload" as="script" href="https://cdn.jsdelivr.net/npm/easydropdown@5.0.2">');
        //    $oAsset->addString('<link crossorigin="anonymous" rel="modulepreload" as="script" href="https://unpkg.com/dropzone">');
        //    $oAsset->addString('<link crossorigin="anonymous" rel="modulepreload" as="script" href="https://cdnjs.cloudflare.com/ajax/libs/glightbox/3.2.0/js/glightbox.min.js">');

        $APPLICATION->ShowHead();
        ?>
    </head>
<body>
<?php $APPLICATION->ShowPanel(); ?>

    <header class="header">
        <div class="container">
            <div class="header_mobile">
                <div class="burger">
                    <i data-toggler="mobile_menu" data-closer="mobile_nav_tea" data-popup="mobile_nav_coffee"></i>
                </div>
                <div class="header_search">
                    <i data-opener="header_search"></i>
                </div>
            </div>
            <div class="header_top">
                <div class="header_top-half">
                    <div class="city">
                        <p class="menu_text text_link" data-opener="cities">Москва</p>
                    </div>
                    <div class="dropdown laptop text">
                        <p>Информация</p>
                        <nav class="droplist">
                            <?php $APPLICATION->IncludeComponent(
                                "bitrix:menu",
                                "header_dropdown",
                                [
                                    "ROOT_MENU_TYPE" => "top_info",
                                    "MENU_CACHE_TYPE" => "A",
                                    "MENU_CACHE_TIME" => "3600",
                                    "MENU_CACHE_USE_GROUPS" => "Y",
                                    "MAX_LEVEL" => "1",
                                    "CHILD_MENU_TYPE" => "",
                                    "USE_EXT" => "N",
                                    "ALLOW_MULTI_SELECT" => "N"
                                ]
                            ); ?>

                        </nav>
                    </div>
                    <nav class="header_top-nav text">
                        <?php $APPLICATION->IncludeComponent(
                            "bitrix:menu",
                            "header_dropdown",
                            [
                                "ROOT_MENU_TYPE" => "top_left",
                                "MENU_CACHE_TYPE" => "A",
                                "MENU_CACHE_TIME" => "3600",
                                "MENU_CACHE_USE_GROUPS" => "Y",
                                "MAX_LEVEL" => "1",
                                "CHILD_MENU_TYPE" => "",
                                "USE_EXT" => "N",
                                "ALLOW_MULTI_SELECT" => "N"
                            ]
                        ); ?>
                    </nav>
                </div>
                <?php $APPLICATION->IncludeComponent(
                    "bitrix:main.include",
                    "",
                    [
                        "AREA_FILE_SHOW" => "file",
                        "PATH" => SITE_TEMPLATE_PATH . "/include/header/logo.php"
                    ]
                ); ?>
                <div class="header_top-half">
                    <nav class="header_top-nav text">
                        <?php $APPLICATION->IncludeComponent(
                            "bitrix:menu",
                            "header_dropdown",
                            [
                                "ROOT_MENU_TYPE" => "top_right",
                                "MENU_CACHE_TYPE" => "A",
                                "MENU_CACHE_TIME" => "3600",
                                "MENU_CACHE_USE_GROUPS" => "Y",
                                "MAX_LEVEL" => "2",
                                "CHILD_MENU_TYPE" => "top_right",
                                "USE_EXT" => "N",
                                "ALLOW_MULTI_SELECT" => "N"
                            ]
                        ); ?>
                    </nav>
                    <?php $APPLICATION->IncludeComponent(
                        "bitrix:main.include",
                        "",
                        [
                            "AREA_FILE_SHOW" => "file",
                            "PATH" => SITE_TEMPLATE_PATH . "/include/header/contacts.php"
                        ]
                    ); ?>
                </div>
            </div>
            <?php
            // TODO: Заменить include-меню на динамическое при появлении каталога.
            // Задача со звёздочкой — нужна генерация блоков с колонками и заголовками, стандартное меню Bitrix не подойдёт.
            ?>
            <nav class="header_nav">
                <nav class="header_nav">
                    <?php $APPLICATION->IncludeComponent(
                        "bitrix:menu",
                        "header_catalog",
                        [
                            "ROOT_MENU_TYPE" => "top",
                            "MENU_CACHE_TYPE" => "A",
                            "MENU_CACHE_TIME" => "3600",
                            "MENU_CACHE_USE_GROUPS" => "Y",
                            "MAX_LEVEL" => "1",
                            "CHILD_MENU_TYPE" => "",
                            "USE_EXT" => "N",
                            "ALLOW_MULTI_SELECT" => "N"
                        ]
                    ); ?>
                </nav>
            </nav>

            <div class="header_user">
                <div class="header_search">
                    <i class="desktop_search_opener" data-opener="header_search"></i>
                    <?php $APPLICATION->IncludeComponent(
                        "bitrix:search.title",
                        "header_search",
                        [
                            "SHOW_INPUT" => "Y",
                            "INPUT_ID" => "title-search-input",
                            "CONTAINER_ID" => "desktop_search",
                            "PRICE_CODE" => ["PRICE_SHKATULKA"],
                            "PRICE_VAT_INCLUDE" => "Y",
                            "PREVIEW_TRUNCATE_LEN" => "150",
                            "SHOW_PREVIEW" => "Y",
                            "PREVIEW_WIDTH" => "64",
                            "PREVIEW_HEIGHT" => "64",
                            "CONVERT_CURRENCY" => "Y",
                            "CURRENCY_ID" => "RUB",
                            "PAGE" => "/search/index.php",
                            "NUM_CATEGORIES" => "1",
                            "TOP_COUNT" => "5",
                            "ORDER" => "date",
                            "USE_LANGUAGE_GUESS" => "Y",
                            "CHECK_DATES" => "Y",
                            "SHOW_OTHERS" => "N",
                            "CATEGORY_0_TITLE" => "Каталог",
                            "CATEGORY_0" => ["catalog"],
                            "CATEGORY_0_iblock_catalog" => ["all"],
                        ]
                    ); ?>
                </div>
                <a href="/profile/favorites/" class="header_user-favourites">
                    <i></i>
                </a>
                <p class="header_user-basket" data-notify="1" data-opener="cart">
                    <i></i>
                </p>
                <?php
                if ($USER->IsAuthorized()) { ?>
                    <a href="/profile/" class="header_user-profile">
                        <i></i>
                    </a>
                <?php } else { ?>
                    <p class="header_user-profile" data-opener="auth">
                        <i></i>
                    </p>
                <?php } ?>
            </div>
        </div>
        <?php include SITE_TEMPLATE_PATH . "/include/menu/mobile_menu.php"; ?>
    </header>

<main class="main">
<?php if ($APPLICATION->GetCurPage(false) !== SITE_DIR) { ?>
    <div class="container">
    <?php $APPLICATION->IncludeComponent(
        "bitrix:breadcrumb",
        "custom",
        [
            "START_FROM" => "0",
            "PATH" => "",
            "SITE_ID" => SITE_ID
        ],
        false
    ); ?>
<?php } ?>