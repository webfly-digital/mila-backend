<?php if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

/** @var array $arResult */

// todo: Доделать выпадающее меню после загрузки каталога
foreach ($arResult as $item) { ?>
    <div class="dropdown">
        <a href="<?= htmlspecialcharsbx($item["LINK"]) ?>" class="heading_5">
            <?= htmlspecialcharsbx($item["TEXT"]) ?>
        </a>
    </div>
<?php }