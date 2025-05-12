<?
if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true)
{
	die();
}

/**
 * @global CMain $APPLICATION
 * @var array $arParams
 * @var array $arResult
 * @var CBitrixComponent $component
 */

//one css for all system.auth.* forms
$APPLICATION->SetAdditionalCSS("/bitrix/css/main/system.auth/flat/style.css");
?>
<?
	$phoneField = COption::GetOptionString("ctweb.smsauth", "PHONE_FIELD");
	
	$APPLICATION->IncludeComponent(
	"ctweb:sms.register",
	"flat",
	Array(
		"REQUIRE_FIELDS" => array($phoneField=>$phoneField)
	)
);?>