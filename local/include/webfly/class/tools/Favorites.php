<?php

namespace Webfly\Tools;

use Webfly\Entities\FavoritesTable;
use Bitrix\Main\Context;
use Bitrix\Main\Engine\CurrentUser;
use Bitrix\Main\Type\DateTime;

class Favorites
{
    /**
     * Возвращает массив ID товаров в избранном у текущего пользователя
     *
     * @return int[]
     */
    public static function getIds(): array
    {
        $userId = self::getUserId();
        if (!$userId) {
            return [];
        }

        $result = [];

        $rows = FavoritesTable::getList([
            'select' => ['UF_PRODUCT_ID'],
            'filter' => ['=UF_USER_ID' => $userId],
        ]);

        while ($row = $rows->fetch()) {
            $result[] = (int)$row['UF_PRODUCT_ID'];
        }

        return $result;
    }

    /**
     * Проверяет, есть ли товар в избранном
     */
    public static function isFavorite(int $productId): bool
    {
        $userId = self::getUserId();
        if (!$userId) {
            return false;
        }

        $row = FavoritesTable::getRow([
            'filter' => [
                '=UF_USER_ID' => $userId,
                '=UF_PRODUCT_ID' => $productId,
            ]
        ]);

        return (bool)$row;
    }

    /**
     * Добавляет товар в избранное
     */
    public static function add(int $productId): bool
    {
        $userId = self::getUserId();
        if (!$userId) {
            return false;
        }

        // избегаем дублей
        if (self::isFavorite($productId)) {
            return true;
        }

        $result = FavoritesTable::add([
            'UF_USER_ID' => $userId,
            'UF_PRODUCT_ID' => $productId,
            'UF_DATE_CREATE' => new DateTime(),
        ]);

        return $result->isSuccess();
    }

    /**
     * Удаляет товар из избранного
     */
    public static function remove(int $productId): bool
    {
        $userId = self::getUserId();
        if (!$userId) {
            return false;
        }

        $row = FavoritesTable::getRow([
            'select' => ['ID'],
            'filter' => [
                '=UF_USER_ID' => $userId,
                '=UF_PRODUCT_ID' => $productId,
            ]
        ]);

        if ($row && $row['ID']) {
            $result = FavoritesTable::delete($row['ID']);
            return $result->isSuccess();
        }

        return false;
    }

    /**
     * Количество товаров в избранном
     */
    public static function count(): int
    {
        return count(self::getIds());
    }

    /**
     * Возвращает ID текущего пользователя
     */
    protected static function getUserId(): ?int
    {
        $userId = CurrentUser::get()->getId();
        return $userId > 0 ? $userId : null;
    }
}