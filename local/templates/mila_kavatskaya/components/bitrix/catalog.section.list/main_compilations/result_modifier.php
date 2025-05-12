<?php
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();



/** @var array $arParams */
/** @var array $arResult */

// Мы уже имеем $arResult["SECTIONS"] = верхние разделы.
// Теперь для каждого верхнего раздела подгружаем суб-секции.
// Берём ТОЛЬКО ПЕРВЫЕ 3 АКТИВНЫХ ПОДРАЗДЕЛА

foreach ($arResult["SECTIONS"] as $key => $section) {
    // Запросим первые 3 активных подраздела
    $subSections = [];
    // todo: обязательно переписать это на d7
    $res = CIBlockSection::GetList(
        ["SORT" => "ASC"],
        [
            "IBLOCK_ID" => $arParams["IBLOCK_ID"],
            "ACTIVE" => "Y",
            "SECTION_ID" => $section["ID"], // смотрим детей
        ],
        true,  // $bCountElements = true, чтобы получить ELEMENT_CNT
        [
            "ID", "NAME", "SECTION_PAGE_URL", "PICTURE", "DESCRIPTION",
            "UF_SHOW_IN_COMPILATIONS", "CODE", "ELEMENT_CNT"
        ],
        ["nTopCount" => 3]
    );

    while ($sub = $res->GetNext()) {
        // Картинка
        if ($sub["PICTURE"]) {
            $sub["PICTURE"] = CFile::GetFileArray($sub["PICTURE"]);
        }
        $subSections[] = $sub;
    }

    $arResult["SECTIONS"][$key]["SUBSECTIONS"] = $subSections;

    //\Bitrix\Main\Diag\Debug::dump($arResult["SECTIONS"]);
}