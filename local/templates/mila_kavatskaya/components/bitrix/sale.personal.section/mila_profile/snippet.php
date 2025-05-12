<?php
/** snippet.php — служебный фрагмент, подключаем ниже трижды*/

/** @var array $arResult */
/** @var string $componentPage */


$discount = (int)($arParams['USER_DISCOUNT'] ?? 0);
?>

<div class="accent_block">
    <p class="big"><?= $discount ?>%</p>
    <p class="heading_5">Ваша скидка</p>
    <a class="text" href="/loyalty/">Подробнее</a>
</div>

<nav class="nav_block text">
    <?php
    $tabs = [
        'orders' => ['Мои заказы', $arResult['PATH_TO_ORDERS']],
        'info' => ['Личные данные', $arResult['PATH_TO_PROFILE']],
        'addresses' => ['Адреса доставки', $arResult['PATH_TO_ADDRESSES']],
    ];

    foreach ($tabs as $code => [$title, $link]) {
        $active = $code === $componentPage;
        if ($active) {
            echo "<span class=\"{$code} active\">{$title}</span>";
        } else {
            echo "<a class=\"{$code}\" href=\"{$link}\">{$title}</a>";
        }
    }
    ?>
    <a class="logout" href="/?logout=yes">Выйти</a>
</nav>