<?php

use Bitrix\Highloadblock as HL;
use Bitrix\Main\Loader;

if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

class WebflyCompilationsComponent extends CBitrixComponent
{
    public function executeComponent()
    {
        if (empty($this->arParams['HLBLOCK_ID']) || empty($this->arParams['TYPE'])) {
            return;
        }

        Loader::includeModule('highloadblock');
        Loader::includeModule('iblock');

        $type = $this->arParams['TYPE'];
        $hlId = (int)$this->arParams['HLBLOCK_ID'];

        $hlblock = HL\HighloadBlockTable::getById($hlId)->fetch();
        if (!$hlblock) {
            $this->arResult['ITEMS'] = [];
            $this->includeComponentTemplate();
            return;
        }

        $entity = HL\HighloadBlockTable::compileEntity($hlblock);
        $dataClass = $entity->getDataClass();

        $ufTypeId = $this->getUfTypeId($type);
        if (!$ufTypeId) {
            $this->arResult['ITEMS'] = [];
            $this->includeComponentTemplate();
            return;
        }

        $rows = $dataClass::getList([
            'filter' => ['UF_TYPE' => $ufTypeId],
            'order' => ['ID' => 'ASC'],
        ])->fetchAll();

        $iblockPropertyId = match ($type) {
            'Чай' => 110,
            'Кофе' => 109,
            'Подарки' => 111,
            default => null,
        };

        if (!$iblockPropertyId) {
            $this->arResult['ITEMS'] = [];
            $this->includeComponentTemplate();
            return;
        }

        $enumMap = $this->getIblockEnumMap($iblockPropertyId);

        foreach ($rows as &$row) {
            $xmlId = $row['UF_XML_ID'] ?? null;
            $row['IB_PROPERTY_ID'] = $enumMap[$xmlId] ?? null;
        }
        unset($row);

        $this->arResult['PROPERTY_ID'] = $iblockPropertyId;
        $this->arResult['ITEMS'] = $rows;

        $this->includeComponentTemplate();
    }

    private function getUfTypeId(string $type): ?int
    {
        $enum = new \CUserFieldEnum();
        $res = $enum->GetList([], ['USER_FIELD_NAME' => 'UF_TYPE']);

        while ($item = $res->Fetch()) {
            if (trim($item['VALUE']) === $type) {
                return (int)$item['ID'];
            }
        }

        return null;
    }

    private function getIblockEnumMap(int $propertyId): array
    {
        $result = [];
        $res = \CIBlockPropertyEnum::GetList([], ['PROPERTY_ID' => $propertyId]);

        while ($item = $res->Fetch()) {
            $result[$item['XML_ID']] = (int)$item['ID'];
        }

        return $result;
    }
}