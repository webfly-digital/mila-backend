<?php if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

/** @var array $arResult */
/** @global CMain $APPLICATION */

if (empty($arResult['ITEMS'])) {
    return;
}
?>

<section class="default">
    <div class="head center">
        <p class="heading_1 upper">
            <span class="heading_1_italic red">Подборки</span> по вкусу и настроению
        </p>
    </div>

    <nav class="catalog_inner-compilations swiper">
        <div class="swiper-wrapper">
            <?php foreach ($arResult['ITEMS'] as $item) {
                if (empty($item['IB_PROPERTY_ID'])) {
                    continue;
                }

                $link = $APPLICATION->GetCurPageParam(
                    'arrFilter_' . $arResult['PROPERTY_ID'] . '=' . $item['IB_PROPERTY_ID'] . '&set_filter=y',
                    ['arrFilter_' . $arResult['PROPERTY_ID'], 'set_filter']
                );

                ?>
                <a href="<?= htmlspecialcharsbx($link) ?>" class="compilations-item swiper-slide">
                    <?php if (!empty($item['UF_PICTURE'])) {
                        $file = CFile::GetPath($item['UF_PICTURE']);
                        echo '<img src="' . htmlspecialcharsbx($file) . '" alt="' . htmlspecialcharsbx($item['UF_NAME']) . '">';
                    } ?>
                    <p class="menu_text"><?= nl2br(htmlspecialcharsbx($item['UF_NAME'])) ?></p>
                </a>
            <?php } ?>
        </div>

        <div class="right_button">
            <div class="button-next"></div>
        </div>
        <div class="left_button">
            <div class="button-prev"></div>
        </div>
        <div class="scrollbar">
            <div class="swiper-scrollbar"></div>
        </div>
    </nav>
</section>