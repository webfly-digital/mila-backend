<?php
require $_SERVER['DOCUMENT_ROOT'] . '/bitrix/header.php';

/** @global CMain $APPLICATION */
/** @global CUser $USER */

$APPLICATION->SetTitle('Личный кабинет');

// получаем скидку пользователя
$discount = 0;
if ($USER->IsAuthorized()) {
    $rsUser = CUser::GetByID($USER->GetID());
    if ($arUser = $rsUser->Fetch()) {
        $discount = (int)($arUser['UF_DISCOUNT_PERCENT'] ?? 0);
    }
}

$APPLICATION->IncludeComponent(
    'bitrix:sale.personal.section',
    'mila_profile',
    [
        'SEF_MODE' => 'Y',
        'SEF_FOLDER' => '/profile/',

        // показываем только нужные разделы
        'SHOW_ORDER_PAGE' => 'Y',
        'SHOW_PROFILE_PAGE' => 'Y',
        'SHOW_PRIVATE_PAGE' => 'N',
        'SHOW_CONTACT_PAGE' => 'N',
        'SHOW_ACCOUNT_PAGE' => 'N',
        'SHOW_SUBSCRIBE_PAGE' => 'N',

        'USER_DISCOUNT' => $discount, // скидка пользователя

        // маршруты
        'SEF_URL_TEMPLATES' => [
            'index' => '',            // /profile/
            'info' => 'profiles/',       // /profile/profiles/
            'orders' => 'orders/',     // /profile/orders/
            'addresses' => 'addresses/',  // /profile/addresses/
        ],
    ]
);

require $_SERVER['DOCUMENT_ROOT'] . '/bitrix/footer.php';