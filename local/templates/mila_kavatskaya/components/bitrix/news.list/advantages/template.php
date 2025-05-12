<?php if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

/** @var array $arResult */

$this->setFrameMode(true);

if (empty($arResult["ITEMS"])) return;

foreach ($arResult["ITEMS"] as $arItem) { ?>
    <div class="plus_item">
        <?php
        $icon = $arItem["PROPERTIES"]["ICON"]["VALUE"];
        if (!empty($icon)) {
            echo '<img src="' . htmlspecialchars($icon) . '" alt="' . htmlspecialchars($arItem["NAME"]) . '">';
        } elseif (!empty($arItem["PREVIEW_PICTURE"]["SRC"])) {
            echo '<img src="' . $arItem["PREVIEW_PICTURE"]["SRC"] . '" alt="' . htmlspecialchars($arItem["NAME"]) . '">';
        }
        ?>
        <p class="heading_5"><?= $arItem["NAME"] ?></p>
        <p class="text"><?= $arItem["PREVIEW_TEXT"] ?></p>
    </div>
<?php }