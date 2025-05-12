<?php if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

/** @var array $arResult */

$this->setFrameMode(true);

if (empty($arResult["ITEMS"])) {
    return;
}
?>

<section class="default">
    <div class="head">
        <div class="heading_1 upper">Акции</div>
    </div>

    <div class="stocks_list">
        <?php foreach ($arResult["ITEMS"] as $arItem): ?>
            <a href="<?= $arItem["DETAIL_PAGE_URL"] ?>">
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
</section>