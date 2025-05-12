<?php if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

/** @var array $arResult */
/** @global CMain $APPLICATION */
/** @var CBitrixComponent $component */
?>

<div class="profile_layout">
    <p class="heading_1 upper">Адреса доставки</p>
    <div class="profile_layout-content">
        <?php include __DIR__ . '/snippet.php'; ?>

        <div class="profile_layout-addresses">
            <?php
            $APPLICATION->IncludeComponent(
                'bitrix:sale.personal.profile.list',
                'mila_addresses',
                [
                    'PATH_TO_DETAIL' => $arResult['PATH_TO_PROFILE_DETAIL'],
                    'SET_TITLE'      => 'N',
                ],
                $component
            );
            ?>
            <a class="address_add button_text"
               href="<?= $arResult['PATH_TO_PROFILE_NEW'] ?? '#' ?>">
                Добавить адрес
            </a>
        </div>
    </div>
</div>