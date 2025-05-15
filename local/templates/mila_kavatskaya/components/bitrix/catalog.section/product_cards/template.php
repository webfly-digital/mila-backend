<?php if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

/** @var array $arResult */

/** @var array $arParams */

use Webfly\Tools\Favorites;

if (empty($arResult["ITEMS"])) {
    return;
}

$this->setFrameMode(true);

$mode = $arParams['MODE'] ?? 'catalog';
$favoritesIds = Favorites::getIds();
?>

<section class="default">
    <?php if ($mode === 'search') { ?>
    <div class="head">
        <p class="heading_4">По запросу «<?= htmlspecialcharsbx($_GET['q'] ?? '') ?>» найдено <?= count($arResult["ITEMS"]) ?> товаров</p>
    </div>
    <div class="catalog_wrapper">
        <?php } elseif ($mode === 'popular') { ?>
        <div class="head">
            <p class="heading_1 upper"><span class="heading_1_italic red">Популярные</span> сорта чая</p>
        </div>
        <div class="populars">
            <?php } elseif ($mode === 'favorites') { ?>
            <div class="head">
                <div class="heading_1 upper">Избранное <span class="counter">(<?= count($arResult["ITEMS"]) ?>)</span></div>
            </div>
            <div class="catalog_wrapper">
                <?php } else { ?>
                <div class="catalog_wrapper">
                    <?php } ?>

                    <?php foreach ($arResult["ITEMS"] as $item) {
                        $labels = $item['PROPERTIES']['LEYBLY_STATUSY']['VALUE_ENUM'] ?? [];

                        $picture = $item['PREVIEW_PICTURE']['SRC']
                            ?: $item['DETAIL_PICTURE']['SRC']
                                ?: SITE_TEMPLATE_PATH . '/assets/img/png/placeholder.png';

                        $typeName = $item['PROPERTIES']['TIP_CHAYA']['VALUE']
                            ?: $item['PROPERTIES']['TIP_KOFE']['VALUE']
                                ?: '';

                        $price = $item['ITEM_PRICES'][0]['PRINT_PRICE'] ?? '';
                        $oldPrice = $item['ITEM_PRICES'][0]['PRINT_BASE_PRICE'] ?? '';
                        $showOld = $oldPrice && $oldPrice !== $price;

                        $isFavorite = in_array($item['ID'], $favoritesIds, true);
                        ?>

                        <div class="product_card" data-type="badges_holder" id="<?= $item['ID'] ?>">
                            <a href="<?= $item['DETAIL_PAGE_URL'] ?>" class="imgholder">
                                <div class="labels">
                                    <?php foreach ($labels as $lbl) { ?>
                                        <p class="label red"><?= htmlspecialcharsbx($lbl) ?></p>
                                    <?php } ?>
                                </div>
                                <img src="<?= $picture ?>" alt="<?= htmlspecialcharsbx($item['NAME']) ?>">
                                <div class="like<?= $isFavorite ? ' active' : '' ?>" data-fav="<?= $item['ID'] ?>"></div>
                            </a>

                            <div class="stars" data-score="0"></div>

                            <?php if ($typeName) { ?>
                                <p class="text grey"><?= htmlspecialcharsbx($typeName) ?></p>
                            <?php } ?>

                            <a href="<?= $item['DETAIL_PAGE_URL'] ?>" class="heading_4"><?= htmlspecialcharsbx($item['NAME']) ?></a>

                            <?php if ($item['PREVIEW_TEXT']) { ?>
                                <p class="text"><?= htmlspecialcharsbx($item['PREVIEW_TEXT']) ?></p>
                            <?php } ?>

                            <?php if (!empty($item['OFFERS'])) { ?>
                                <nav class="badges medium" data-type="badges">
                                    <?php foreach ($item['OFFERS'] as $offer) {
                                        $weight = $offer['PROPERTIES']['VES']['VALUE'];
                                        if ($weight) { ?>
                                            <p class="badge"><?= htmlspecialcharsbx($weight) ?> г</p>
                                        <?php }
                                    } ?>
                                </nav>
                            <?php } ?>

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
                    <?php } ?>

                </div> <!-- .catalog_wrapper или .populars -->
</section>