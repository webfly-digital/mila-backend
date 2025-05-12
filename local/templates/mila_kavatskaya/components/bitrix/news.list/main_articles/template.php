<?php if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

/** @var array $arResult */

$this->setFrameMode(true);

if (empty($arResult["ITEMS"])) return;
?>

<div class="articles swiper-container">
    <div class="swiper-wrapper">
        <?php foreach ($arResult["ITEMS"] as $arItem) { ?>
            <a href="<?= $arItem["DETAIL_PAGE_URL"] ?>" class="article_item swiper-slide">
                <?php if (!empty($arItem["PREVIEW_PICTURE"]["SRC"])) { ?>
                    <figure><img src="<?= $arItem["PREVIEW_PICTURE"]["SRC"] ?>" alt=""></figure>
                <?php } ?>
                <?php if (!empty($arItem["DISPLAY_ACTIVE_FROM"])) { ?>
                    <p class="text grey"><?= $arItem["DISPLAY_ACTIVE_FROM"] ?></p>
                <?php } ?>
                <p class="heading_4"><?= htmlspecialchars($arItem["NAME"]) ?></p>
                <?php if (!empty($arItem["PREVIEW_TEXT"])) { ?>
                    <p class="text"><?= htmlspecialchars($arItem["PREVIEW_TEXT"]) ?></p>
                <?php } ?>
                <?php if (!empty($arItem["PROPERTIES"]["AUTHOR"]["VALUE"])) { ?>
                    <p class="text grey"><?= htmlspecialchars($arItem["PROPERTIES"]["AUTHOR"]["VALUE"]) ?></p>
                <?php } ?>
            </a>
        <?php } ?>
    </div>

    <div class="scrollbar">
        <div class="swiper-scrollbar"></div>
    </div>
    <a href="/blog/" class="else_link upper red">Смотреть все</a>
</div>