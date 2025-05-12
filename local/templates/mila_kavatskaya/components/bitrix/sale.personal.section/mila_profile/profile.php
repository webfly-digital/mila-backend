<?php if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

/** @var array $arResult */
/** @global CMain $APPLICATION */
/** @var CBitrixComponent $component */
?>

<div class="profile_layout">
    <p class="heading_1 upper">Личные данные</p>
    <div class="profile_layout-content">
        <?php include __DIR__ . '/snippet.php'; ?>

        <div class="profile_layout-info">
            <?php
            $APPLICATION->IncludeComponent(
                'bitrix:main.profile',
                'mila_info',
                [
                    'SET_TITLE'   => 'N',
                    'CHECK_RIGHTS'=> 'N',
                    'SEND_INFO'   => 'N',
                ],
                $component
            );
            ?>
        </div>
    </div>
</div>