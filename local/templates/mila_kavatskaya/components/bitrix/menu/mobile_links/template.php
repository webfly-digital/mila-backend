<?php if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

/** @var array $arResult */

foreach ($arResult as $item) {
    echo '<a href="' . htmlspecialcharsbx($item["LINK"]) . '">' . htmlspecialcharsbx($item["TEXT"]) . '</a>';
}