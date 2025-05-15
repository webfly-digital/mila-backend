<?php

namespace Webfly\Entities;

use Bitrix\Main\Entity;
use Bitrix\Main\Type\DateTime;

/**
 * ORM-таблица избранного (HL-блок Favorites)
 */
class FavoritesTable extends Entity\DataManager
{
    public static function getTableName(): string
    {
        return 'b_hlbd_favorites';
    }

    public static function getMap(): array
    {
        return [
            new Entity\IntegerField('ID', [
                'primary' => true,
                'autocomplete' => true,
            ]),
            new Entity\IntegerField('UF_USER_ID', [
                'required' => true,
            ]),
            new Entity\IntegerField('UF_PRODUCT_ID', [
                'required' => true,
            ]),
            new Entity\DatetimeField('UF_DATE_CREATE', [
                'default_value' => function () {
                    return new DateTime();
                }
            ]),
        ];
    }
}