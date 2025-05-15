<?php
/** @global CMain $APPLICATION */
?>

<div class="mobile_menu" data-popup="mobile_menu" data-noscroll>
    <!-- <i data-closer="mobile_menu"></i> -->
    <div class="justify">
        <div class="city">
            <p class="menu_text text_link" data-opener="cities">Москва</p>
        </div>
        <p class="menu_text text_link red">Войти</p>
    </div>
    <nav class="navigation heading_4">
        <p data-nav="tea">Чай</p>
        <p data-nav="coffee">Кофе</p>
        <p data-nav="accessories">Аксессуары</p>
        <p data-nav="gifts">Подарки</p>
        <p data-nav="candies">Сладости</p>
        <!-- <a href="">Подарочная карта</a> -->
    </nav>
    <nav class="links heading_5">
        <?php
        $APPLICATION->IncludeComponent(
            "bitrix:menu",
            "mobile_links",
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
        );
        $APPLICATION->IncludeComponent(
            "bitrix:menu",
            "mobile_links",
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
        );
        ?>
    </nav>

    <div class="mobile_menu-contacts">
        <a href="tel:+79999999999" class="heading_4">8 (999) 999-99-99</a>
        <p class="text grey">с 9:00 до 20:00</p>
        <div class="else_link red upper">Обратный звонок</div>
        <nav>
            <a href="" class="vk">
                <i></i>
            </a>
            <a href="" class="wa">
                <i></i>
            </a>
            <a href="" class="tg">
                <i></i>
            </a>
        </nav>
    </div>
    <!-- <div class="button full-w" data-opener="auth">Войти в личный кабинет</div> -->
    <div class="mobile_popup" data-nav-content="tea">
        <p class="text" data-nav-closer="tea">Чай</p>
        <div class="spoiler">
            <p class="spoiler_head heading_4" data-spoiler>Виды</p>
            <nav class="spoiler_content heading_5">
                <a href="">Все виды</a>
                <a href="">Чай черный</a>
                <a href="">Чай классический</a>
                <a href="">Чай черный десертный</a>
                <a href="">Чай зеленый</a>
                <a href="">Чай зеленый десертный</a>
                <a href="">Чай белый</a>
                <a href="">Чай красный</a>
                <a href="">Улун</a>
                <a href="">Пу Эр</a>
            </nav>
        </div>
        <div class="spoiler">
            <p class="spoiler_head heading_4" data-spoiler>Подборки</p>
            <nav class="spoiler_content heading_5">
                <a href="">Подборка</a>
                <a href="">Подборка</a>
                <a href="">Подборка</a>
            </nav>
        </div>
        <div class="spoiler">
            <p class="spoiler_head heading_4" data-spoiler>Страны</p>
            <nav class="spoiler_content heading_5">
                <a href="">Страна</a>
                <a href="">Страна</a>
                <a href="">Страна</a>
            </nav>
        </div>
        <div class="spoiler">
            <p class="spoiler_head heading_4" data-spoiler>Ингредиенты</p>
            <nav class="spoiler_content heading_5">
                <a href="">Ингредиент</a>
                <a href="">Ингредиент</a>
                <a href="">Ингредиент</a>
            </nav>
        </div>
    </div>
    <div class="mobile_popup" data-nav-content="coffee">
        <p class="text" data-nav-closer="coffee">Кофе</p>
        <div class="spoiler">
            <p class="spoiler_head heading_4" data-spoiler>Виды</p>
            <nav class="spoiler_content heading_5">
                <a href="">Вид</a>
                <a href="">Вид</a>
                <a href="">Вид</a>
            </nav>
        </div>
        <div class="spoiler">
            <p class="spoiler_head heading_4" data-spoiler>Подборки</p>
            <nav class="spoiler_content heading_5">
                <a href="">Подборка</a>
                <a href="">Подборка</a>
                <a href="">Подборка</a>
            </nav>
        </div>
        <div class="spoiler">
            <p class="spoiler_head heading_4" data-spoiler>Страны</p>
            <nav class="spoiler_content heading_5">
                <a href="">Страна</a>
                <a href="">Страна</a>
                <a href="">Страна</a>
            </nav>
        </div>
        <div class="spoiler">
            <p class="spoiler_head heading_4" data-spoiler>Ингредиенты</p>
            <nav class="spoiler_content heading_5">
                <a href="">Ингредиент</a>
                <a href="">Ингредиент</a>
                <a href="">Ингредиент</a>
            </nav>
        </div>
    </div>
    <div class="mobile_popup" data-nav-content="accessories">
        <p class="text" data-nav-closer="accessories">Аксессуары</p>
        <div class="spoiler">
            <p class="spoiler_head heading_4" data-spoiler>Виды</p>
            <nav class="spoiler_content heading_5">
                <a href="">Вид</a>
                <a href="">Вид</a>
                <a href="">Вид</a>
            </nav>
        </div>
        <div class="spoiler">
            <p class="spoiler_head heading_4" data-spoiler>Подборки</p>
            <nav class="spoiler_content heading_5">
                <a href="">Подборка</a>
                <a href="">Подборка</a>
                <a href="">Подборка</a>
            </nav>
        </div>
        <div class="spoiler">
            <p class="spoiler_head heading_4" data-spoiler>Страны</p>
            <nav class="spoiler_content heading_5">
                <a href="">Страна</a>
                <a href="">Страна</a>
                <a href="">Страна</a>
            </nav>
        </div>
        <div class="spoiler">
            <p class="spoiler_head heading_4" data-spoiler>Ингредиенты</p>
            <nav class="spoiler_content heading_5">
                <a href="">Ингредиент</a>
                <a href="">Ингредиент</a>
                <a href="">Ингредиент</a>
            </nav>
        </div>
    </div>
    <div class="mobile_popup" data-nav-content="gifts">
        <p class="text" data-nav-closer="gifts">Подарки</p>
        <div class="spoiler">
            <p class="spoiler_head heading_4" data-spoiler>Виды</p>
            <nav class="spoiler_content heading_5">
                <a href="">Вид</a>
                <a href="">Вид</a>
                <a href="">Вид</a>
            </nav>
        </div>
        <div class="spoiler">
            <p class="spoiler_head heading_4" data-spoiler>Подборки</p>
            <nav class="spoiler_content heading_5">
                <a href="">Подборка</a>
                <a href="">Подборка</a>
                <a href="">Подборка</a>
            </nav>
        </div>
        <div class="spoiler">
            <p class="spoiler_head heading_4" data-spoiler>Страны</p>
            <nav class="spoiler_content heading_5">
                <a href="">Страна</a>
                <a href="">Страна</a>
                <a href="">Страна</a>
            </nav>
        </div>
        <div class="spoiler">
            <p class="spoiler_head heading_4" data-spoiler>Ингредиенты</p>
            <nav class="spoiler_content heading_5">
                <a href="">Ингредиент</a>
                <a href="">Ингредиент</a>
                <a href="">Ингредиент</a>
            </nav>
        </div>
    </div>
    <div class="mobile_popup" data-nav-content="candies">
        <p class="text" data-nav-closer="candies">Сладости</p>
        <div class="spoiler">
            <p class="spoiler_head heading_4" data-spoiler>Виды</p>
            <nav class="spoiler_content heading_5">
                <a href="">Вид</a>
                <a href="">Вид</a>
                <a href="">Вид</a>
            </nav>
        </div>
        <div class="spoiler">
            <p class="spoiler_head heading_4" data-spoiler>Подборки</p>
            <nav class="spoiler_content heading_5">
                <a href="">Подборка</a>
                <a href="">Подборка</a>
                <a href="">Подборка</a>
            </nav>
        </div>
        <div class="spoiler">
            <p class="spoiler_head heading_4" data-spoiler>Страны</p>
            <nav class="spoiler_content heading_5">
                <a href="">Страна</a>
                <a href="">Страна</a>
                <a href="">Страна</a>
            </nav>
        </div>
        <div class="spoiler">
            <p class="spoiler_head heading_4" data-spoiler>Ингредиенты</p>
            <nav class="spoiler_content heading_5">
                <a href="">Ингредиент</a>
                <a href="">Ингредиент</a>
                <a href="">Ингредиент</a>
            </nav>
        </div>
    </div>
</div>