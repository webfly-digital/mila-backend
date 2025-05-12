<?php if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

/** @var array $arResult */
/**@var int $discount*/
?>

<div class="profile_layout">
    <p class="heading_1 upper">Мой кабинет</p>

    <div class="profile_links">
        <a class="orders"    href="<?= $arResult['PATH_TO_ORDERS']    ?>">Мои заказы</a>
        <a class="info"      href="<?= $arResult['PATH_TO_PROFILE']   ?>">Личные данные</a>
        <a class="addresses" href="<?= $arResult['PATH_TO_ADDRESSES'] ?>">Адреса доставки</a>

        <div class="accent_block">
            <p class="big"><?= $discount ?>%</p>
            <p class="heading_5">Ваша скидка</p>
            <a class="text" href="/loyalty/">Подробнее</a>
        </div>
    </div>
</div>