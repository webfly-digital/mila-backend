<?php if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

/** @var array $arResult */

// Группируем пункты по уровню
$menuTree = [];
$parents = [];

foreach ($arResult as $item) {
    if ($item["DEPTH_LEVEL"] == 1) {
        $menuTree[] = $item;
        $parents[] = &$menuTree[array_key_last($menuTree)];
    } elseif ($item["DEPTH_LEVEL"] == 2 && !empty($parents)) {
        $parents[array_key_last($parents)]["CHILDREN"][] = $item;
    }
}

// Рендерим
foreach ($menuTree as $item) {
    $link = htmlspecialcharsbx($item["LINK"]);
    $text = htmlspecialcharsbx($item["TEXT"]);

    if (!empty($item["CHILDREN"])) {
        echo '<div class="dropdown">';
        echo '<a href="' . $link . '">' . $text . '</a>';
        echo '<div class="droplist text">';
        foreach ($item["CHILDREN"] as $child) {
            echo '<a href="' . htmlspecialcharsbx($child["LINK"]) . '">' . htmlspecialcharsbx($child["TEXT"]) . '</a>';
        }
        echo '</div></div>';
    } else {
        echo '<a href="' . $link . '">' . $text . '</a>';
    }
}