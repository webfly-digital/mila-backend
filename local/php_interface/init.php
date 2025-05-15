<?php
use Bitrix\Main\Loader;

Loader::registerAutoLoadClasses(null, [
    'Webfly\\Entities\\FavoritesTable' => '/local/include/webfly/class/entities/FavoritesTable.php',
    'Webfly\\Tools\\Favorites' => '/local/include/webfly/class/tools/Favorites.php',
]);

if (file_exists(__DIR__ . "/include/constants.php")) {
    require_once __DIR__ . "/include/constants.php";
}