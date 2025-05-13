<?php
require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/header.php");
$APPLICATION->SetTitle("О компании");
$APPLICATION->AddChainItem("О компании", "/about/");
?>

<section class="info_section">
    <div class="heading_1 upper">О компании</div>
    <img src="<?= SITE_TEMPLATE_PATH ?>/assets/img/jpg/about-header.jpg" alt="">
    <div class="right_content">
        <?php
        $APPLICATION->IncludeComponent(
            "bitrix:main.include",
            "",
            [
                "AREA_FILE_SHOW" => "file",
                "PATH" => SITE_TEMPLATE_PATH . "/include/about/about_text.php",
                "EDIT_TEMPLATE" => ""
            ],
            false
        );
        ?>
        <img src="<?= SITE_TEMPLATE_PATH ?>/assets/img/jpg/about-inside.jpg" alt="">
    </div>
</section>

<section class="reviews">
    <div class="head">
        <p class="heading_1 upper">Отзывы</p>
        <div class="buttons">
            <a href="#" class="button bordered">
                Рейтинг яндекс
                <i class="icon-corner-arrow"></i>
            </a>
            <a href="#" class="button bordered">
                Рейтинг 2GIS
                <i class="icon-corner-arrow"></i>
            </a>
        </div>
        <select class="ezdd" name="" id="">
            <option value="">Сначала новые</option>
            <option value="1">Сначала старые</option>
        </select>
        <p class="button_link" data-opener="review">Оставить отзыв</p>
    </div>
    <div class="reviews_items">
        <div class="review_item">
            <div class="review_item-head">
                <p class="heading_5">Наталья И.</p>
                <div class="stars" data-score="5"></div>
                <p class="text grey">12.03.24</p>
            </div>
            <div class="review_item-content">
                <p class="text">Это так вкусно, что невозможно об этом не написать...</p>
            </div>
            <figure class="review_item-images">
                <img src="<?= SITE_TEMPLATE_PATH ?>/assets/img/png/tea_bg.png" alt="">
                <img src="<?= SITE_TEMPLATE_PATH ?>/assets/img/png/tea_bg.png" alt="">
            </figure>
            <div class="review_item-answer">
                <p class="menu_text">Ответ Mila Kavatskaya</p>
                <p class="text">Наталья, спасибо за Ваш отзыв и приятное пожелание!</p>
            </div>
        </div>

        <div class="review_item">
            <div class="review_item-head">
                <p class="heading_5">Наталья И.</p>
                <div class="stars" data-score="4"></div>
                <p class="text grey">12.03.24</p>
            </div>
            <div class="review_item-content">
                <p class="text">Это так вкусно, что невозможно об этом не написать...</p>
            </div>
            <div class="review_item-answer">
                <p class="menu_text">Ответ Mila Kavatskaya</p>
                <p class="text">Наталья, спасибо за Ваш отзыв и приятное пожелание!</p>
            </div>
        </div>
    </div>
</section>

<?php require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/footer.php"); ?>