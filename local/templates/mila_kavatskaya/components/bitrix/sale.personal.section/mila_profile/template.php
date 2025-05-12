<?php if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

/** @var array             $arResult        */
/** @var CBitrixComponent  $component       */
/** @global CMain          $APPLICATION     */

$this->setFrameMode(true);

// определяем текущую под-страницу
$componentPage = $arResult['PAGE'] ?? 'index';

// заголовки для хлебных крошек
$headings = [
    'index'     => 'Мой кабинет',
    'orders'    => 'Мои заказы',
    'profiles'      => 'Личные данные',
    'addresses' => 'Адреса доставки',
];

// заголовок страницы + крошки
if (isset($headings[$componentPage])) {
    $APPLICATION->SetTitle($headings[$componentPage]);
    $APPLICATION->AddChainItem('Личный кабинет', '/profile/');
    if ($componentPage !== 'index') {
        $APPLICATION->AddChainItem($headings[$componentPage]);
    }
}

// подключаем нужный под-шаблон
switch ($componentPage) {
    case 'orders':
        include __DIR__ . '/orders.php';
        break;
    case 'info':
        include __DIR__ . '/profiles.php';
        break;
    case 'addresses':
        include __DIR__ . '/addresses.php';
        break;
    default:
        include __DIR__ . '/index.php';
}