<?php if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

/** @var array $arResult */

$this->setFrameMode(true);

if (empty($arResult["ITEMS"])) return;

foreach ($arResult["ITEMS"] as $arItem) { ?>
    <div class="shop_item">
        <?php if ($arItem["PREVIEW_PICTURE"]["SRC"]) { ?>
            <img src="<?= $arItem["PREVIEW_PICTURE"]["SRC"] ?>" alt="<?= $arItem["NAME"] ?>">
        <?php } ?>

        <p class="heading_4"><?= $arItem["NAME"] ?></p>

        <?php if (!empty($arItem["PROPERTIES"]["ADDRESS"]["VALUE"])) { ?>
            <p class="text"><?= $arItem["PROPERTIES"]["ADDRESS"]["VALUE"] ?></p>
        <?php } ?>

        <?php if (!empty($arItem["PROPERTIES"]["WORKING_HOURS"]["VALUE"])) { ?>
            <p class="menu_text">
                Режим работы
                <span class="text"><?= $arItem["PROPERTIES"]["WORKING_HOURS"]["VALUE"] ?></span>
            </p>
        <?php } ?>
    </div>
<?php }