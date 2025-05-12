<?php if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

/** @var array $arResult */

$this->setFrameMode(true);

if (empty($arResult["ITEMS"])) {
    return;
}
?>

<section class="default">
    <div class="head">
        <p class="heading_1 upper">Другие акции</p>
    </div>

    <div class="other_stocks swiper-container">
        <div class="swiper-wrapper">
            <?php foreach ($arResult["ITEMS"] as $arItem): ?>
                <a href="<?= $arItem["DETAIL_PAGE_URL"] ?>" class="swiper-slide">
                    <p class="heading_2_italic upper">
                        <?= $arItem["NAME"] ?>
                        <?php if (!empty($arItem["PROPERTIES"]["SUBTITLE"]["VALUE"])): ?>
                            <br><span class="red"><?= $arItem["PROPERTIES"]["SUBTITLE"]["VALUE"] ?></span>
                        <?php endif; ?>
                    </p>
                    <?php if (!empty($arItem["PREVIEW_TEXT"])): ?>
                        <p class="text"><?= $arItem["PREVIEW_TEXT"] ?></p>
                    <?php endif; ?>
                </a>
            <?php endforeach; ?>
        </div>

        <div class="scrollbar">
            <div class="swiper-scrollbar"></div>
        </div>
    </div>
</section>