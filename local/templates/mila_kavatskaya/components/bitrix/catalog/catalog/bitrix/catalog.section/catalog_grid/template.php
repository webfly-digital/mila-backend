<?php if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

/**
 * Карточки каталога с вкраплением статей из блога
 *
 * @var array                    $arResult
 * @var CBitrixComponentTemplate $this
 */

use Webfly\Tools\Favorites;

$this->setFrameMode(true);

global $arrFilter;

$favoritesIds = Favorites::getIds();

// Глобальный счётчик карточек
if (!isset($GLOBALS['CAT_ITEM_IDX'])) {
    $GLOBALS['CAT_ITEM_IDX'] = 0;
}

// Получение ID статей и их позиций из пользовательских полей раздела
$articles = [];
$articlePositions = [];

if (!empty($arParams['UF_BLOG_ARTICLE']) && is_array($arParams['UF_BLOG_ARTICLE'])) {
    $articleIds = $arParams['UF_BLOG_ARTICLE'];

    $rsArticles = CIBlockElement::GetList(
        [],
        [
            'IBLOCK_ID' => BLOG_IBLOCK_ID,
            'ID' => $articleIds,
            'ACTIVE' => 'Y'
        ],
        false,
        false,
        [
            'ID',
            'NAME',
            'DETAIL_PAGE_URL',
            'PROPERTY_CATALOG_PICTURE',
            'PREVIEW_PICTURE'
        ]
    );

    while ($article = $rsArticles->GetNext()) {
        $picture = '';
        if (!empty($article['PROPERTY_CATALOG_PICTURE_VALUE'])) {
            $picture = CFile::GetPath($article['PROPERTY_CATALOG_PICTURE_VALUE']);
        } elseif (!empty($article['PREVIEW_PICTURE'])) {
            $picture = CFile::GetPath($article['PREVIEW_PICTURE']);
        }

        $articles[$article['ID']] = [
            'ID' => $article['ID'],
            'NAME' => $article['NAME'],
            'URL' => $article['DETAIL_PAGE_URL'],
            'PICTURE' => $picture,
        ];
    }
}

if (!empty($arParams['UF_BLOG_ARTICLE_POS'])) {
    $articlePositions = (array)$arParams['UF_BLOG_ARTICLE_POS'];
}

// Собираем массив товаров и статей вместе
$items = $arResult['ITEMS'];
$resultItems = [];

foreach ($items as $index => $item) {
    ++$GLOBALS['CAT_ITEM_IDX'];

    // Перед товаром вставляем статью, если есть в нужной позиции
    foreach ($articlePositions as $posKey => $position) {
        if ($GLOBALS['CAT_ITEM_IDX'] == $position) {
            $articleId = $arParams['UF_BLOG_ARTICLE'][$posKey] ?? null;
            if ($articleId && isset($articles[$articleId])) {
                $resultItems[] = ['TYPE' => 'ARTICLE', 'DATA' => $articles[$articleId]];
            }
        }
    }

    $resultItems[] = ['TYPE' => 'PRODUCT', 'DATA' => $item];
}

foreach ($resultItems as $entry) {
    if ($entry['TYPE'] === 'PRODUCT') {
        $item = $entry['DATA'];
        $labels = [];

        if (!empty($item['PROPERTIES']['LEYBLY_STATUSY']['VALUE_ENUM'])) {
            $labels = $item['PROPERTIES']['LEYBLY_STATUSY']['VALUE_ENUM'];
        }

        $picture = $item['PREVIEW_PICTURE']['SRC']
            ?: $item['DETAIL_PICTURE']['SRC']
                ?: SITE_TEMPLATE_PATH . '/assets/img/png/placeholder.png';

        $typeName = $item['PROPERTIES']['TIP_CHAYA']['VALUE']
            ?: $item['PROPERTIES']['TIP_KOFE']['VALUE']
                ?: '';

        $price = $item['ITEM_PRICES'][0]['PRINT_PRICE'];
        $oldPrice = $item['ITEM_PRICES'][0]['PRINT_BASE_PRICE'];
        $showOld = $oldPrice && $oldPrice !== $price;

        $isFavorite = in_array($item['ID'], $favoritesIds, true);
        ?>

        <div class="product_card" data-type="badges_holder" id="<?= $item['ID'] ?>">
            <a href="<?= $item['DETAIL_PAGE_URL'] ?>" class="imgholder">
                <div class="labels">
                    <?php foreach ($labels as $lbl) {
                        echo '<p class="label red">' . htmlspecialcharsbx($lbl) . '</p>';
                    } ?>
                </div>
                <img src="<?= $picture ?>" alt="<?= htmlspecialcharsbx($item['NAME']) ?>">
            </a>
            <div class="like<?= $isFavorite ? ' active' : '' ?>" data-fav="<?= $item['ID'] ?>"></div>

            <div class="stars" data-score="0"></div>

            <?php if ($typeName) { ?>
                <p class="text grey"><?= htmlspecialcharsbx($typeName) ?></p>
            <?php } ?>

            <a href="<?= $item['DETAIL_PAGE_URL'] ?>" class="heading_4"><?= htmlspecialcharsbx($item['NAME']) ?></a>

            <?php if ($item['PREVIEW_TEXT']) { ?>
                <p class="text"><?= htmlspecialcharsbx($item['PREVIEW_TEXT']) ?></p>
            <?php } ?>

            <?php if (!empty($item['OFFERS'])): ?>
                <nav class="badges medium" data-type="badges">
                    <?php foreach ($item['OFFERS'] as $offer) {
                        $weight = $offer['PROPERTIES']['VES']['VALUE'];
                        if ($weight) {
                            echo '<p class="badge">' . htmlspecialcharsbx($weight) . ' г</p>';
                        }
                    } ?>
                </nav>
            <?php endif; ?>

            <div class="product_card-footer">
                <div class="badges_content" data-type="badges_content">
                    <p class="heading_4 price active">
                        <?= $price ?>
                        <?php if ($showOld) { ?><span><?= $oldPrice ?></span><?php } ?>
                    </p>
                </div>
                <div class="button add2basket" data-id="<?= $item['ID'] ?>">
                    <i class="icon-cart"></i>В корзину
                </div>
            </div>
        </div>

        <?php
    } elseif ($entry['TYPE'] === 'ARTICLE') {
        $article = $entry['DATA'];
        ?>

        <a href="<?= $article['URL'] ?>" class="catalog_mini_banner">
            <p class="label transparent">полезное</p>
            <p class="title"><?= htmlspecialcharsbx($article['NAME']) ?></p>
            <div class="arrow">Читать статью</div>
            <img src="<?= $article['PICTURE'] ?>" alt="<?= htmlspecialcharsbx($article['NAME']) ?>">
        </a>

        <?php
    }
}