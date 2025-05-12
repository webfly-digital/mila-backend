<?php
require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/header.php");

/**
 * @global CMain $APPLICATION
 */

$APPLICATION->SetTitle("Главная");
$APPLICATION->AddChainItem("Главная", "/");
?>
    <div class="container">
        <section class="main_banner">
            <article>
                <p class="heading_5">Интернет-магазин чая и кофе Милы Кавацкой</p>
                <p class="heading_1 upper">Качество с <span class="heading_1_italic">персональной</span> ответственностью</p>
                <img class="sign" src="<?= SITE_TEMPLATE_PATH ?>/assets/img/svg/sign1.svg" alt="">
            </article>
            <video poster="<?= SITE_TEMPLATE_PATH ?>/assets/img/png/main_banner.png" muted autoplay loop>
                <source src="<?= SITE_TEMPLATE_PATH ?>/assets/img/video1.mp4">
            </video>
        </section>
        <section class="default" data-type="badges_holder">
            <?php

            global $arrSectionFilter;
            $arrSectionFilter = [
                "UF_SHOW_IN_COMPILATIONS" => 1 // Отбираем только разделы, где флаг свойства "Отображать в подборках на главной" установлен в "Да"
            ];

            $APPLICATION->IncludeComponent(
                "bitrix:catalog.section.list",
                "main_compilations",
                [
                    "IBLOCK_TYPE" => "catalog",
                    "IBLOCK_ID" => CATALOG_IBLOCK_ID,
                    "COUNT_ELEMENTS" => "Y",
                    "FILTER_NAME" => "arrSectionFilter",
                    "CACHE_TYPE" => "A",
                    "CACHE_TIME" => "36000000",
                    "SECTION_URL" => "/catalog/#SECTION_CODE#/",
                    "ADD_SECTIONS_CHAIN" => "N",
                    "SORT_BY" => "SORT",
                    "SORT_ORDER" => "ASC"
                ],
                false
            );
            ?>
        </section>
        <section>
            <?php
            $APPLICATION->IncludeComponent(
                "bitrix:news.list",
                "stories",
                [
                    "IBLOCK_TYPE" => "content",
                    "IBLOCK_ID" => STORIES_IBLOCK_ID,
                    "NEWS_COUNT" => 5,
                    "SORT_BY1" => "SORT",
                    "SORT_ORDER1" => "ASC",
                    "FIELD_CODE" => ["NAME", "PREVIEW_TEXT", "PREVIEW_PICTURE"],
                    "PROPERTY_CODE" => ["TITLE_HTML", "LINK", "WHITE"],
                    "SET_TITLE" => "N",
                    "DISPLAY_PANEL" => "N",
                    "CACHE_TYPE" => "A",
                    "CACHE_TIME" => "36000000",
                ],
                false
            );
            ?>
        </section>
    </div>

    <section class="catalog w-bg">
        <video poster="<?= SITE_TEMPLATE_PATH ?>/assets/img/png/catalog_bg.png">
            <source src="">
        </video>
        <div class="container">
            <div class="catalog-inner">
                <a href="catalog.html" class="heading_1 upper">Каталог</a>
                <div class="catalog_grid">
                    <div class="catalog_grid-item">
                        <a href="" class="heading_2">Чай<span>(341)</span></a>
                        <nav>
                            <a href="">чай черный</a>
                            <a href="">чай черный классический</a>
                            <a href="">чай черный десертный</a>
                            <a href="">чай зеленый</a>
                            <a href="">чай зеленый классический</a>
                            <a href="">чай зеленый десертный</a>
                            <a href="">чай белый</a>
                            <a href="">чай красный</a>
                            <a href="">улун</a>
                            <a href="">пу эр</a>
                            <a href="">связанный чай</a>
                            <a href="">травяной чай</a>
                            <a href="" class="else">смотреть все</a>
                        </nav>
                    </div>
                    <div class="catalog_grid-item">
                        <a href="" class="heading_2">Кофе<span>(92)</span></a>
                        <nav>
                            <a href="">классический (плантационный)</a>
                            <a href="">десертный</a>
                            <a href="">эспрессо бленды</a>
                            <a href="">молотый</a>
                        </nav>
                    </div>
                    <div class="catalog_grid-item">
                        <a href="" class="heading_2">Аксессуары<span>(134)</span></a>
                        <nav>
                            <a href="">посуда из стекла</a>
                            <a href="">френч-прессы</a>
                            <a href="">посуда из керамики и фарфора</a>
                            <a href="">посуда чугунная</a>
                            <a href="">турки и кофеварки</a>
                            <a href="">этническая посуда</a>
                            <a href="">баночки для чая и кофе</a>
                            <a href="">сита и фильтры для заваривания</a>
                            <a href="">пакеты</a>
                        </nav>
                    </div>
                    <div class="catalog_grid-item">
                        <a href="" class="heading_2">Подарки<span>(28)</span></a>
                        <nav>
                            <a href="">чайные</a>
                            <a href="">кофейные</a>
                            <a href="">чайнокофейные</a>
                            <a href="">корпоративные</a>
                        </nav>
                    </div>
                    <div class="catalog_grid-item">
                        <a href="" class="heading_2">Сладости<span>(37)</span></a>
                        <nav>
                            <a href="">джем/конфитюр/варенье</a>
                            <a href="">соленая карамель</a>
                            <a href="">мед</a>
                            <a href="">сиропы</a>
                            <a href="">шоколад/конфеты</a>
                            <a href="">драже/леденцы</a>
                        </nav>
                    </div>
                    <div class="catalog_grid-item">
                        <a href="" class="heading_2">Подарочная карта<span></span></a>
                        <nav>
                            <a href="">день рождения</a>
                            <a href="">новый год</a>
                            <a href="">любовь</a>
                            <a href="">женщине</a>
                            <a href="">мужчине</a>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <div class="container">
        <section class="default">
            <div class="head center">
                <p class="heading_1 upper"><span class="heading_1_italic red">Популярный</span> кофе</p>
            </div>
            <div class="populars">
                <div class="product_card" data-type="badges_holder">
                    <a href="" class="imgholder">
                        <div class="labels">
                            <p class="label rasp">скоро</p>
                        </div>
                        <img src="<?= SITE_TEMPLATE_PATH ?>/assets/img/png/prod_coffee_1.png" alt="">
                        <div class="like active"></div>
                    </a>
                    <div class="stars" data-score="4"></div>
                    <p class="text grey">Классический кофе</p>
                    <a href="" class="heading_4">Бразилия Cuppello</a>
                    <p class="text">Чай из Южной части Шри-Ланки с цветочным ароматом и насыщенным вкусом с нотками ириса, дерева и меда</p>
                    <nav class="badges medium" data-type="grind_badges">
                        <p class="badge">в зернах</p>
                        <p class="badge">молотый</p>
                    </nav>
                    <nav class="badges medium" data-type="badges">
                        <p class="badge">25 г</p>
                        <p class="badge">50 г</p>
                        <p class="badge">100 г</p>
                        <p class="badge">500 г</p>
                    </nav>
                    <div class="product_card-footer">
                        <div class="badges_content" data-type="badges_content">
                            <p class="heading_4 price">100 ₽ <span>200 ₽</span></p>
                            <p class="heading_4 price">200 ₽ <span>400 ₽</span></p>
                            <p class="heading_4 price">400 ₽ <span>800 ₽</span></p>
                            <p class="heading_4 price">800 ₽ <span>1 600 ₽</span></p>
                        </div>
                        <div class="button"><i class="icon-cart"></i>В корзину</div>
                    </div>
                </div>
                <div class="product_card" data-type="badges_holder">
                    <a href="" class="imgholder">
                        <div class="labels"> <!-- нет лейблов --> </div>
                        <img src="<?= SITE_TEMPLATE_PATH ?>/assets/img/png/prod_coffee_1.png" alt="">
                        <div class="like"></div>
                    </a>
                    <div class="stars" data-score="5"></div>
                    <p class="text grey">Классический кофе</p>
                    <a href="" class="heading_4">Доминикана Бараона</a>
                    <p class="text">Чай из Южной части Шри-Ланки с цветочным ароматом и насыщенным вкусом с нотками ириса, дерева и меда</p>
                    <nav class="badges medium" data-type="grind_badges">
                        <p class="badge">в зернах</p>
                        <p class="badge">молотый</p>
                    </nav>
                    <nav class="badges medium" data-type="badges">
                        <p class="badge">25 г</p>
                        <p class="badge">50 г</p>
                        <p class="badge">100 г</p>
                        <p class="badge">500 г</p>
                    </nav>
                    <div class="product_card-footer">
                        <div class="badges_content" data-type="badges_content">
                            <p class="heading_4 price">100 ₽ <span>200 ₽</span></p>
                            <p class="heading_4 price">200 ₽ <span>400 ₽</span></p>
                            <p class="heading_4 price">400 ₽ <span>800 ₽</span></p>
                            <p class="heading_4 price">800 ₽ <span>1 600 ₽</span></p>
                        </div>
                        <div class="button"><i class="icon-cart"></i>В корзину</div>
                    </div>
                </div>
                <div class="product_card" data-type="badges_holder">
                    <a href="" class="imgholder">
                        <div class="labels"> <!-- нет лейблов --> </div>
                        <img src="<?= SITE_TEMPLATE_PATH ?>/assets/img/png/prod_coffee_1.png" alt="">
                        <div class="like"></div>
                    </a>
                    <div class="stars" data-score="5"></div>
                    <p class="text grey">Классический кофе</p>
                    <a href="" class="heading_4">Колумбия Эксельсо</a>
                    <p class="text">Чай из Южной части Шри-Ланки с цветочным ароматом и насыщенным вкусом с нотками ириса, дерева и меда</p>
                    <nav class="badges medium" data-type="grind_badges">
                        <p class="badge">в зернах</p>
                        <p class="badge">молотый</p>
                    </nav>
                    <nav class="badges medium" data-type="badges">
                        <p class="badge">25 г</p>
                        <p class="badge">50 г</p>
                        <p class="badge">100 г</p>
                        <p class="badge">500 г</p>
                    </nav>
                    <div class="product_card-footer">
                        <div class="badges_content" data-type="badges_content">
                            <p class="heading_4 price">100 ₽ <span>200 ₽</span></p>
                            <p class="heading_4 price">200 ₽ <span>400 ₽</span></p>
                            <p class="heading_4 price">400 ₽ <span>800 ₽</span></p>
                            <p class="heading_4 price">800 ₽ <span>1 600 ₽</span></p>
                        </div>
                        <div class="button"><i class="icon-cart"></i>В корзину</div>
                    </div>
                </div>
                <div class="product_card" data-type="badges_holder">
                    <a href="" class="imgholder">
                        <div class="labels">
                            <p class="label blue">new</p>
                        </div>
                        <img src="<?= SITE_TEMPLATE_PATH ?>/assets/img/png/prod_coffee_1.png" alt="">
                        <div class="like"></div>
                    </a>
                    <div class="stars" data-score="5"></div>
                    <p class="text grey">Классический кофе</p>
                    <a href="" class="heading_4">Эфиопия Шакисо</a>
                    <p class="text">Чай из Южной части Шри-Ланки с цветочным ароматом и насыщенным вкусом с нотками ириса, дерева и меда</p>
                    <nav class="badges medium" data-type="grind_badges">
                        <p class="badge">в зернах</p>
                        <p class="badge">молотый</p>
                    </nav>
                    <nav class="badges medium" data-type="badges">
                        <p class="badge">25 г</p>
                        <p class="badge">50 г</p>
                        <p class="badge">100 г</p>
                        <p class="badge">500 г</p>
                    </nav>
                    <div class="product_card-footer">
                        <div class="badges_content" data-type="badges_content">
                            <p class="heading_4 price">100 ₽ <span>200 ₽</span></p>
                            <p class="heading_4 price">200 ₽ <span>400 ₽</span></p>
                            <p class="heading_4 price">400 ₽ <span>800 ₽</span></p>
                            <p class="heading_4 price">800 ₽ <span>1 600 ₽</span></p>
                        </div>
                        <div class="button"><i class="icon-cart"></i>В корзину</div>
                    </div>
                </div>
                <a href="" class="else_link upper red">Смотреть все</a>
            </div>
        </section>

        <section class="loyalty">
            <?php
            $APPLICATION->IncludeFile(
                SITE_TEMPLATE_PATH . "/include/main/loyalty_banner.php.php",
                [],
                ["MODE" => "html"]
            );
            ?>
        </section>

        <section class="default">
            <div class="head">
                <div class="heading_1 upper">Статьи</div>
                <?php

                global $arBlogFilterMain;
                $arBlogFilterMain = ["PROPERTY_SHOW_ON_MAIN_PAGE" => 246]; // id значения "Да" свойства "Погазывать на главной"

                $APPLICATION->IncludeComponent(
                    "bitrix:news.list",
                    "main_articles",
                    [
                        "IBLOCK_TYPE" => "content",
                        "IBLOCK_ID" => BLOG_IBLOCK_ID,
                        "NEWS_COUNT" => 4,
                        "SORT_BY1" => "ACTIVE_FROM",
                        "SORT_ORDER1" => "DESC",
                        "FILTER_NAME" => "arBlogFilterMain",
                        "FIELD_CODE" => ["NAME", "PREVIEW_TEXT", "PREVIEW_PICTURE", "DATE_ACTIVE_FROM"],
                        "PROPERTY_CODE" => ["SHOW_ON_MAIN_PAGE", "AUTHOR"],
                        "DETAIL_URL" => "/blog/#SECTION_CODE_PATH#/#ELEMENT_CODE#/",
                        "CACHE_TYPE" => "A",
                        "CACHE_TIME" => "36000000",
                        "SET_TITLE" => "N",
                        "DISPLAY_PANEL" => "N",
                    ],
                    false
                );
                ?>
            </div>
        </section>

        <section class="halfs">
            <?php $APPLICATION->IncludeFile(
                SITE_TEMPLATE_PATH . "/include/main/about_block.php",
                [],
                ["MODE" => "html"]
            ); ?>

        </section>

        <section class="pluses">
            <?php
            $APPLICATION->IncludeComponent(
                "bitrix:news.list",
                "advantages",
                [
                    "IBLOCK_TYPE" => "content",
                    "IBLOCK_ID" => ADVANTAGES_IBLOCK_ID,
                    "NEWS_COUNT" => 100,
                    "SORT_BY1" => "SORT",
                    "SORT_ORDER1" => "ASC",
                    "FIELD_CODE" => ["NAME", "PREVIEW_TEXT", "PREVIEW_PICTURE"],
                    "PROPERTY_CODE" => ["ICON"],
                    "SET_TITLE" => "N",
                    "DISPLAY_PANEL" => "N",
                    "CACHE_TYPE" => "A",
                    "CACHE_TIME" => "36000000",
                ],
                false
            );
            ?>
        </section>
    </div>
<?php require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/footer.php"); ?>