<?php if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

/** @var array $arResult */
/** @global CMain $APPLICATION */
/** @var CBitrixComponent $component */
?>

<div class="profile_layout">
    <p class="heading_1 upper">Мои заказы</p>
    <div class="profile_layout-content">

        <?php
        global $discount;
        include __DIR__ . '/snippet.php';
        ?>

        <div class="profile_layout-orders">
            <?php
            $APPLICATION->IncludeComponent(
                'bitrix:sale.personal.order.list',
                'mila_orders',
                [
                    'PATH_TO_DETAIL' => $arResult['PATH_TO_ORDER_DETAIL'],
                    'SET_TITLE'      => 'N',
                ]
            );
            ?>
        </div>
    </div>
</div>