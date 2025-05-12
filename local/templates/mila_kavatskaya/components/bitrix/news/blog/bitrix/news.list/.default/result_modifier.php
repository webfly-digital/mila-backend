<?php
if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true) die();

/** @var array $arParams */
/** @var array $arResult */

$arFilter = [
    "IBLOCK_ID" => $arParams["IBLOCK_ID"],
    "ACTIVE" => "Y",
    "!UF_SHOW_IN_BLOG_FILTER" => false
];

$dbSections = CIBlockSection::GetList(
    ["SORT" => "ASC"],
    $arFilter,
    false,
    ["ID", "NAME", "CODE"]
);

$arResult["SECTIONS"] = [];
while ($arSection = $dbSections->Fetch())
{
    // формируем ассоциативный массив: ключ — ID
    $arResult["SECTIONS"][$arSection["ID"]] = [
        "ID"   => $arSection["ID"],
        "CODE" => $arSection["CODE"],
        "NAME" => $arSection["NAME"],
    ];
}