<?php if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

/** @var array $arResult */

if (empty($arResult["ITEMS"])) {
    return;
}
?>

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
        <?php foreach ($arResult["ITEMS"] as $item) { ?>
            <div class="review_item">
                <div class="review_item-head">
                    <p class="heading_5"><?= htmlspecialcharsbx($item["NAME"]) ?></p>
                    <div class="stars" data-score="<?= (int)$item["DISPLAY_PROPERTIES"]["RATING"]["VALUE"] ?>"></div>
                    <p class="text grey"><?= $item["DISPLAY_ACTIVE_FROM"] ?></p>
                </div>
                <div class="review_item-content">
                    <p class="text"><?= $item["PREVIEW_TEXT"] ?></p>
                </div>

                <?php if (!empty($item["DISPLAY_PROPERTIES"]["IMAGES"]["FILE_VALUE"])) { ?>
                    <figure class="review_item-images">
                        <?php
                        $images = $item["DISPLAY_PROPERTIES"]["IMAGES"]["FILE_VALUE"];
                        if (!isset($images[0])) $images = [$images]; // Если одиночный файл
                        foreach ($images as $img) {
                            ?>
                            <img src="<?= $img["SRC"] ?>" alt="">
                        <?php } ?>
                    </figure>
                <?php } ?>

                <?php if (!empty($item["DETAIL_TEXT"])) { ?>
                    <div class="review_item-answer">
                        <p class="menu_text">Ответ Mila Kavatskaya</p>
                        <p class="text"><?= $item["DETAIL_TEXT"] ?></p>
                    </div>
                <?php } ?>
            </div>
        <?php } ?>
    </div>
</section>