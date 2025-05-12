<?php if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

/** @var array $arResult */

$this->setFrameMode(true);
?>
<section class="info_section">
    <div class="title">
        <div class="heading_1 upper">
            <?= $arResult["NAME"] ?>
            <?php if (!empty($arResult["PROPERTIES"]["SUBTITLE"]["VALUE"])): ?>
                <br><span class="heading_1_italic red"><?= $arResult["PROPERTIES"]["SUBTITLE"]["VALUE"] ?></span>
            <?php endif; ?>
        </div>
    </div>

    <div class="right_content">
        <?= $arResult["DETAIL_TEXT"] ?>
    </div>
</section>