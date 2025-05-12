<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();?>

<?php
//Формируем маску для кода
$arResult['CODE_MASK'] = '';
for($i = 0; $i < COption::GetOptionString("ctweb.smsauth", "CODE_LENGTH"); $i++){
    if(!empty($arResult['CODE_MASK'])) $arResult['CODE_MASK'].= ' ';
    $arResult['CODE_MASK'].= '*';
}

//Маска для телефона
$arResult['PHONE_MASK'] = COption::GetOptionString("ctweb.smsauth", "CWSA_PHONE_MASK");

//Обрезаем номер телефона
if(!is_null($arResult['USER_VALUES']))
	$arResult['HIDDEN_PHONE'] = '*******'.mb_substr($arResult['USER_VALUES'][$arParams['REQUIRE_FIELDS']], -4);
?>
