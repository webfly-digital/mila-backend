<?php if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

/** @var array $arResult */
/** @var CBitrixComponentTemplate $this */

$this->setFrameMode(true);

$item = $arResult;
$props = $item['PROPERTIES'];

// Картинки галереи
$gallery = [];
if (!empty($item['MORE_PHOTO'])) {
    foreach ($item['MORE_PHOTO'] as $photo) {
        $gallery[] = $photo['SRC'];
    }
} elseif (!empty($item['DETAIL_PICTURE']['SRC'])) {
    $gallery[] = $item['DETAIL_PICTURE']['SRC'];
}

// Лейблы
$labels = $props['LEYBLY_STATUSY']['VALUE_ENUM'] ?? [];

// Тип товара
$typeName = $props['TIP_KOFE']['VALUE']
    ?: $props['TIP_CHAYA']['VALUE']
        ?: $props['TIP_SLADOSTEY']['VALUE']
            ?: $props['TIP_AKSESSUARA']['VALUE']
                ?: $props['TIP_PODARKOV']['VALUE']
                    ?: '';

// Параметры для графиков
function getPercent($value)
{
    return $value ? intval($value) * 10 : 0;
}
$acid = getPercent($props['KISLOTNOST']['VALUE_ENUM_ID']);
$bitterness = getPercent($props['GORECH']['VALUE_ENUM_ID']);
$density = getPercent($props['PLOTNOST']['VALUE_ENUM_ID']);
$sweetness = getPercent($props['SLADOST']['VALUE_ENUM_ID']);
$roast = getPercent($props['STEPEN_OBZHARKI']['VALUE_ENUM_ID']);

// Вкусы и ноты
$tastes = array_merge(
    (array)($props['VKUS']['VALUE'] ?? []),
    (array)($props['NOTY']['VALUE'] ?? [])
);

// Бейджи по помолу
$grind = (array)($props['POMOL']['VALUE'] ?? []);

// Вес и цены через торговые предложения
$weights = [];
$prices = [];
if (!empty($item['OFFERS'])) {
    foreach ($item['OFFERS'] as $offer) {
        if (!empty($offer['PROPERTIES']['VES']['VALUE'])) {
            $weights[] = $offer['PROPERTIES']['VES']['VALUE'] . ' г';
            $prices[] = [
                'PRICE' => $offer['ITEM_PRICES'][0]['PRINT_PRICE'],
                'OLD'   => $offer['ITEM_PRICES'][0]['PRINT_BASE_PRICE'] ?? ''
            ];
        }
    }
} else {
    if (!empty($item['ITEM_PRICES'])) {
        foreach ($item['ITEM_PRICES'] as $price) {
            $prices[] = [
                'PRICE' => $price['PRINT_PRICE'],
                'OLD'   => $price['PRINT_BASE_PRICE'] ?? ''
            ];
        }
    }
}
?>

<section class="product_detail">
    <div class="product_slider">
        <div class="buttons">
            <?php foreach ((array)$labels as $label) { ?>
                <div class="label blue"><?= htmlspecialcharsbx($label) ?></div>
            <?php } ?>
            <div class="favourite" data-id="<?= $item['ID'] ?>"></div>
        </div>

        <?php if (!empty($gallery)) { ?>
            <div class="product_slider-big swiper">
                <div class="swiper-wrapper">
                    <?php foreach ($gallery as $img) { ?>
                        <div class="swiper-slide"><img src="<?= $img ?>" alt=""></div>
                    <?php } ?>
                </div>
            </div>
            <div class="product_slider-thumbs swiper">
                <div class="swiper-wrapper">
                    <?php foreach ($gallery as $img) { ?>
                        <div class="swiper-slide"><img src="<?= $img ?>" alt=""></div>
                    <?php } ?>
                </div>
            </div>
            <div class="nav-buttons">
                <div class="button-prev"></div>
                <div class="button-next"></div>
            </div>
            <div class="pagination"></div>
        <?php } ?>
    </div>

    <div class="product_info">
        <div class="product_info-head" data-type="badges_holder">
            <?php if ($typeName) { ?><p class="text grey"><?= htmlspecialcharsbx($typeName) ?></p><?php } ?>
            <p class="heading_1 upper"><?= htmlspecialcharsbx($item['NAME']) ?></p>

            <div class="buttons">
                <div class="stars" data-score="0"></div>
                <a href="#product_reviews" class="reviews_link text">Отзывы</a>
            </div>

            <?php if (!empty($props['OPISANIE']['VALUE'])) { ?>
                <p class="text"><?= htmlspecialcharsbx($props['OPISANIE']['VALUE']) ?></p>
            <?php } ?>

            <?php if (!empty($tastes)) { ?>
                <div class="taste_slider_holder">
                    <div class="taste_slider swiper">
                        <div class="swiper-wrapper">
                            <?php foreach ($tastes as $taste) { ?>
                                <div class="swiper-slide">
                                    <p class="text grey"><?= htmlspecialcharsbx($taste) ?></p>
                                </div>
                            <?php } ?>
                        </div>
                    </div>
                    <div class="button-next"></div>
                    <div class="button-prev"></div>
                </div>
            <?php } ?>

            <dl class="coffee_stats">
                <dt>Кислотность</dt><dd><i style="width: <?= $acid ?>%"></i></dd>
                <dt>Горечь</dt><dd><i style="width: <?= $bitterness ?>%"></i></dd>
                <dt>Плотность</dt><dd><i style="width: <?= $density ?>%"></i></dd>
                <dt>Сладость</dt><dd><i style="width: <?= $sweetness ?>%"></i></dd>
                <dt>Степень обжарки</dt><dd><i style="width: <?= $roast ?>%"></i></dd>
            </dl>

            <div class="badges_holder">
                <?php if (!empty($grind)) { ?>
                    <nav class="badges medium" data-type="grind_badges">
                        <?php foreach ($grind as $g) { ?><p class="badge"><?= htmlspecialcharsbx($g) ?></p><?php } ?>
                    </nav>
                <?php } ?>

                <?php if (!empty($weights)) { ?>
                    <div class="badges medium fit" data-type="badges">
                        <?php foreach ($weights as $w) { ?><p class="badge"><?= htmlspecialcharsbx($w) ?></p><?php } ?>
                    </div>
                <?php } ?>
            </div>

            <div class="cart_buttons">
                <div class="badges_content" data-type="badges_content">
                    <?php foreach ($prices as $p) { ?>
                        <p class="heading_3 price">
                            <?= $p['PRICE'] ?><?php if (!empty($p['OLD']) && $p['PRICE'] !== $p['OLD']) { ?><span><?= $p['OLD'] ?></span><?php } ?>
                        </p>
                    <?php } ?>
                </div>
                <div class="button"><i class="icon-cart"></i>В корзину</div>
            </div>
        </div>
    </div>
</section>