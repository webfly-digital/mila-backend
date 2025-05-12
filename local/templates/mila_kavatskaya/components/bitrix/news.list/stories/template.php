<?php if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

/** @var array $arResult */

$this->setFrameMode(true);

if (empty($arResult["ITEMS"])) return;
?>

<div class="stories swiper-container">
    <div class="swiper-wrapper">
        <?php foreach ($arResult["ITEMS"] as $arItem) {
            $link = $arItem["PROPERTIES"]["LINK"]["VALUE"] ?? "#";
            $isWhite = $arItem["PROPERTIES"]["WHITE"]["VALUE_XML_ID"] === "Y";
            $class = 'story-item swiper-slide' . ($isWhite ? ' white' : '');

            $titleRaw = $arItem["PROPERTIES"]["TITLE_HTML"]["~VALUE"];
            $title = is_array($titleRaw) && !empty($titleRaw["TEXT"])
                ? $titleRaw["TEXT"]
                : htmlspecialchars($arItem["NAME"]);

            $text = $arItem["PREVIEW_TEXT"];
            $image = $arItem["PREVIEW_PICTURE"]["SRC"] ?? '';
            ?>
            <a href="<?= $link ?>" class="<?= $class ?>">
                <p class="heading_3_italic upper"><?= $title ?></p>
                <?php if ($text) { ?>
                    <p class="text"><?= $text ?></p>
                <?php } ?>
                <?php if ($image) { ?>
                    <img src="<?= $image ?>" alt="<?= htmlspecialchars($arItem["NAME"]) ?>">
                <?php } ?>
            </a>
        <?php } ?>
    </div>
    <div class="scrollbar">
        <div class="swiper-scrollbar"></div>
    </div>
</div>