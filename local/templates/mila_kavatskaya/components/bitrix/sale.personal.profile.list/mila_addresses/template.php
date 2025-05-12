<?php if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

/** @var array $arResult */
?>

<div class="addresses_list">
    <?php if (empty($arResult["PROFILES"])) { ?>
        <p class="text">Вы пока не добавили адрес доставки</p>
    <?php } else { ?>
        <?php foreach ($arResult["PROFILES"] as $profile) { ?>
            <?php
            $props = $profile["PROPS"];
            $address = '';
            $type = '';

            foreach ($props as $prop) {
                if (mb_stripos($prop["CODE"], "ADDRESS") !== false) {
                    $address = $prop["VALUE"];
                }

                if (mb_stripos($prop["CODE"], "TYPE") !== false) {
                    $type = $prop["VALUE"];
                }
            }

            $detailUrl = $profile["URL_TO_DETAIL"];
            $deleteUrl = $profile["URL_TO_DETELE"];
            ?>

            <a href="<?= $detailUrl ?>" class="address_item">
                <?php if ($type) { ?>
                    <p class="small_text grey"><?= htmlspecialcharsbx($type) ?></p>
                <?php } ?>

                <div class="heading_5"><?= htmlspecialcharsbx($address) ?></div>

                <p class="small_text grey">Дом</p>

                <div class="buttons">
                    <a href="<?= $deleteUrl ?>" class="delete"></a>
                </div>
            </a>
        <?php } ?>
    <?php } ?>
</div>