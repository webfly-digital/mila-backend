<?php if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

/** @var array $arResult */

?>

<nav class="text">
    <?php foreach ($arResult as $item) { ?>
        <a href="<?= htmlspecialcharsbx($item['LINK']) ?>">
            <?= htmlspecialcharsbx($item['TEXT']) ?>
        </a>
    <?php } ?>
</nav>