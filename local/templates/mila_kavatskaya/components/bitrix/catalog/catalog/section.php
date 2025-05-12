<?php if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

/**
 * Шаблон раздела каталога
 *
 * @var array            $arResult
 * @var CBitrixComponent $component
 * @global CMain         $APPLICATION
 */

$this->setFrameMode(true);

/** Получаем название, ID и код текущего раздела */
$sectionName = '';
$sectionId = 0;
$sectionCode = $arResult['VARIABLES']['SECTION_CODE'] ?? '';
$blogArticleIds = [];
$blogArticlePositions = [];

if ($sectionCode) {
    $rsSection = CIBlockSection::GetList(
        [],
        [
            'IBLOCK_ID' => CATALOG_IBLOCK_ID,
            'CODE' => $sectionCode,
            'ACTIVE' => 'Y'
        ],
        false,
        ['ID', 'NAME', 'CODE', 'DESCRIPTION', 'UF_BANNER_TEXT', 'UF_BANNER_VIDEO', 'UF_BLOG_ARTICLE', 'UF_BLOG_ARTICLE_POS']
    );
    if ($arSection = $rsSection->GetNext()) {
        $sectionName = $arSection['NAME'];
        $sectionId = (int)$arSection['ID'];
        $sectionCode = $arSection['CODE'];
        $sectionDescription = $arSection['DESCRIPTION'];
        $bannerText = $arSection['UF_BANNER_TEXT'];
        $bannerVideo = CFile::GetPath($arSection['UF_BANNER_VIDEO']);
        $blogArticleIds = $arSection['UF_BLOG_ARTICLE'];
        $blogArticlePositions = $arSection['UF_BLOG_ARTICLE_POS'];
    }
}

/** Считаем количество товаров в разделе */
$sectionElementCount = 0;
if ($sectionId > 0) {
    $rsElements = CIBlockElement::GetList(
        [],
        [
            'IBLOCK_ID' => CATALOG_IBLOCK_ID,
            'SECTION_ID' => $sectionId,
            'ACTIVE' => 'Y',
            'INCLUDE_SUBSECTIONS' => 'Y'
        ],
        false,
        false,
        ['ID']
    );
    $sectionElementCount = $rsElements->SelectedRowsCount();
}

/** Хлебные крошки */
if ($sectionName) {
    $APPLICATION->AddChainItem($sectionName);
    }

$APPLICATION->SetTitle($sectionName);

/** Баннер раздела */
?>
    <section class="catalog_inner-banner">
        <article>
            <p class="title"><?= htmlspecialcharsbx($sectionName) ?></p>
            <?php if (!empty($bannerText)): ?>
                <p class="text"><?= htmlspecialcharsbx($bannerText) ?></p>
            <?php endif; ?>
        </article>
        <video poster="<?= $bannerVideo ?>">
            <?php if (!empty($bannerVideo)): ?>
                <source src="<?= $bannerVideo ?>">
            <?php endif; ?>
        </video>
    </section>

<?php
// todo: пока выбор подборок зададим хардкодом. Потом с этим надо будет что-то сделать. В константы хотя бы вынести, но это полумера.
/** Подборки (HL-блок) */
$APPLICATION->IncludeComponent(
    'webfly:compilations',
    'slider',
    [
        'HLBLOCK_ID' => COMPILATIONS_HLBLOCK_ID,
        'TYPE' => match ($sectionCode) {
            'coffee' => 'Кофе',
            'gifts' => 'Подарки',
            default => 'Чай'
        },
    ],
    $component,
    ['HIDE_ICONS' => 'Y']
);
?>

    <section class="default">
        <div class="head">
            <div class="heading_1 upper">
                <?= htmlspecialcharsbx($sectionName) ?>
                <span class="counter">(<?= $sectionElementCount ?>)</span>
            </div>

            <div class="buttons">
                <p class="filter" data-opener="filter_<?= htmlspecialcharsbx($sectionCode) ?>">Фильтры</p>

                <?php
                /** Фильтр для попапа */
                $APPLICATION->IncludeComponent(
                    'bitrix:catalog.smart.filter',
                    'popup',
                    [
                        'IBLOCK_ID' => CATALOG_IBLOCK_ID,
                        'SECTION_ID' => $sectionId,
                        'FILTER_NAME' => 'arrFilter',
                        'POPUP_ID' => 'filter_' . $sectionCode,
                    ],
                    $component,
                    ['HIDE_ICONS' => 'Y']
                );
                ?>

                <select class="ezdd" id="catalog_sort" onchange="location=this.value;">
                    <?php
                    $base = $APPLICATION->GetCurPageParam('', ['sort', 'order']);
                    $sortOptions = [
                        '' => 'По умолчанию',
                        'price_asc' => 'Сначала дешевле',
                        'price_desc' => 'Сначала дороже',
                    ];
                    foreach ($sortOptions as $sortKey => $sortTitle) {
                        $selected = ($_GET['sort'] ?? '') === $sortKey ? 'selected' : '';
                        $url = $sortKey
                            ? $base . (strpos($base, '?') ? '&' : '?') . "sort={$sortKey}"
                            : $base;
                        echo "<option value=\"{$url}\" {$selected}>{$sortTitle}</option>";
                    }
                    ?>
                </select>
            </div>

            <div class="categories">
                <?php
                // todo: вынести в константы — маппинг разделов на ID свойств
                $sectionPropertyMap = [
                    'Чай' => 103,
                    'Кофе' => 102,
                    'Сладости' => 104,
                    'Аксессуары' => 105,
                ];

                $propertyId = $sectionPropertyMap[$sectionName] ?? null;

                if ($propertyId) {
                    $res = CIBlockPropertyEnum::GetList(
                        ['SORT' => 'ASC'],
                        ['PROPERTY_ID' => $propertyId]
                    );

                    while ($enum = $res->Fetch()) {
                        $url = $APPLICATION->GetCurPageParam(
                            'arrFilter_' . $propertyId . '=' . $enum['ID'] . '&set_filter=y',
                            ['arrFilter_' . $propertyId, 'set_filter']
                        );

                        echo '<p><a href="' . htmlspecialcharsbx($url) . '">' . htmlspecialcharsbx($enum['VALUE']) . '</a></p>';
                    }
                }
                ?>
            </div>
        </div>

        <div class="catalog_wrapper">
            <?php
            $GLOBALS['arrFilter'] = [];

            foreach ($_GET as $key => $value) {
                if (preg_match('/^arrFilter_(\d+)$/', $key, $matches)) {
                    $propertyId = (int)$matches[1];
                    $filterValue = (int)$value;
                    if ($propertyId > 0 && $filterValue > 0) {
                        $GLOBALS['arrFilter']['PROPERTY_' . $propertyId] = $filterValue;
                    }
                }
            }

            $APPLICATION->IncludeComponent(
                'bitrix:catalog.section',
                'catalog_grid',
                [
                    'IBLOCK_ID' => CATALOG_IBLOCK_ID,
                    'SECTION_ID' => $sectionId,
                    'PAGE_ELEMENT_COUNT' => 12,
                    'FILTER_NAME' => 'arrFilter',
                    'PRICE_CODE' => ['RETAIL_PRICE'],
                    'SET_TITLE' => 'N',
                    'PROPERTY_CODE' => ['LEYBLY_STATUSY', 'MORE_PHOTO', 'PODBORKA_KOFE', 'PODBORKA_CHAYA', 'PODBORKA_PODARKOV'],
                    'OFFERS_PROPERTY_CODE' => ['VES', 'POMOL'],
                    'UF_BLOG_ARTICLE' => $blogArticleIds,
                    'UF_BLOG_ARTICLE_POS' => $blogArticlePositions,
                ],
                $component
            );
            ?>
        </div>
    </section>

<?php if (!empty($sectionDescription)) { ?>
    <section class="default">
        <div class="text_content"><?= $sectionDescription ?></div>
    </section>
<?php }