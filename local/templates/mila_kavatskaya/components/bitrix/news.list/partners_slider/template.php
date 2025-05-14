<?php if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

/** @var array $arResult */

if (empty($arResult["ITEMS"])) {
    return;
}
?>

<section class="default">
    <div class="head">
        <p class="heading_1 upper">Наши партнеры</p>
    </div>
    <div class="partners_slider swiper-container">
        <div class="swiper-wrapper">
            <?php foreach ($arResult["ITEMS"] as $item) { ?>
                <div class="swiper-slide">
                    <img src="<?= $item["PREVIEW_PICTURE"]["SRC"] ?>" alt="<?= $item["NAME"] ?>">
                    <p class="heading_4"><?= $item["NAME"] ?></p>
                    <p class="text"><?= $item["PREVIEW_TEXT"] ?></p>
                </div>
            <?php } ?>
        </div>
        <div class="scrollbar">
            <div class="swiper-scrollbar"></div>
        </div>
    </div>
</section>