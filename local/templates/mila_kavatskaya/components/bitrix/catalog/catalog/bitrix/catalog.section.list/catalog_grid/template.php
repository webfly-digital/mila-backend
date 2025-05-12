<?php if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();
/** @var array $arResult */

use Bitrix\Main\Diag\Debug;
use Bitrix\Main\Loader;

Loader::includeModule('iblock');

// Маппинг разделов к ID нужных свойств
//todo: Как минимум вынести в константы
$sectionPropertyMap = [
    'Чай' => 103,         // TIP_CHAYA
    'Кофе' => 102,        // TIP_KOFE
    'Сладости' => 104,    // TIP_SLADOSTEY
    'Аксессуары' => 105,  // TIP_AKSESSUARA
];
?>

<section class="catalog">
    <div class="catalog-inner">
        <p class="heading_1 upper">Каталог</p>
        <div class="catalog_grid">
            <?php foreach ($arResult['SECTIONS'] as $root): ?>
                <div class="catalog_grid-item">
                    <a href="<?= $root['SECTION_PAGE_URL'] ?>" class="heading_2">
                        <?= $root['NAME'] ?>
                        <?php if ($root['ELEMENT_CNT']): ?>
                            <span>(<?= $root['ELEMENT_CNT'] ?>)</span>
                        <?php endif; ?>
                    </a>

                    <nav>
                        <?php
                        $propertyId = $sectionPropertyMap[$root['NAME']] ?? null;

                        if ($propertyId) {
                            $res = CIBlockPropertyEnum::GetList(
                            ['SORT' => 'ASC'],
                                ['PROPERTY_ID' => $propertyId]
                        );

                            while ($enum = $res->Fetch()) {
                                $url = $root['SECTION_PAGE_URL'] .
                                    '?arrFilter_' . $propertyId . '=' . $enum['ID'] . '&set_filter=y';

                                echo '<a href="' . htmlspecialcharsbx($url) . '">' .
                                    htmlspecialcharsbx($enum['VALUE']) . '</a>';
                            }
                        }

                        ?>
                        <a href="<?= $root['SECTION_PAGE_URL'] ?>" class="else">смотреть все</a>
                    </nav>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>