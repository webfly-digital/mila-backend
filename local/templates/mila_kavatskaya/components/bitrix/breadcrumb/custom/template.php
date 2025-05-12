<?php if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();
/** @var array $arResult */

if (empty($arResult)) {
    return "";
}

$strReturn = '<nav class="breadcrumbs">';

foreach ($arResult as $key => $item) {
    if ($item["LINK"] !== "" && $key != count($arResult) - 1) {
        $strReturn .= '<a href="' . htmlspecialcharsbx($item["LINK"]) . '">' . htmlspecialcharsbx($item["TITLE"]) . '</a>';
    } else {
        $strReturn .= '<span>' . htmlspecialcharsbx($item["TITLE"]) . '</span>';
    }
}

$strReturn .= '</nav>';

return $strReturn;