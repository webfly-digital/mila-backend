<?php if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

/** @var array $arResult */
/** @global CMain $APPLICATION */
/** @var CBitrixComponentTemplate $this */

$this->setFrameMode(true);
?>
    <section class="info_section">
        <div class="head">
            <div class="heading_1 upper"><?= htmlspecialchars($arResult["NAME"]) ?></div>
            <article class="text">
                <?php if ($arResult["DISPLAY_ACTIVE_FROM"]) { ?>
                    <p><?= $arResult["DISPLAY_ACTIVE_FROM"] ?></p>
                <?php } ?>
                <?php if (!empty($arResult["PROPERTIES"]["AUTHOR"]["VALUE"])) { ?>
                    <p><?= htmlspecialchars($arResult["PROPERTIES"]["AUTHOR"]["VALUE"]) ?></p>
                <?php } ?>
            </article>
        </div>

        <?php if (is_array($arResult["DETAIL_PICTURE"])) { ?>
            <img src="<?= $arResult["DETAIL_PICTURE"]["SRC"] ?>" alt="<?= $arResult["DETAIL_PICTURE"]["ALT"] ?>">
        <?php } ?>

        <div class="right_content">
            <?php if (!empty($arResult["PROPERTIES"]["SUBTITLE"]["~VALUE"]["TEXT"])) { ?>
                <div class="suptitle">
                    <?= $arResult["PROPERTIES"]["SUBTITLE"]["~VALUE"]["TEXT"] ?>
                </div>
            <?php } ?>

            <?php if (!empty($arResult["PROPERTIES"]["AUTHOR_QUOTE"]["~VALUE"]["TEXT"])) { ?>
                <div class="author_quote">
                    <?php if (!empty($arResult["PROPERTIES"]["AUTHOR_PHOTO"]["VALUE"])) { ?>
                        <img src="<?= CFile::GetPath($arResult["PROPERTIES"]["AUTHOR_PHOTO"]["VALUE"]) ?>" alt="">
                    <?php } ?>
                    <p class="heading_5"><?= htmlspecialchars($arResult["PROPERTIES"]["AUTHOR"]["VALUE"]) ?></p>
                    <p class="text"><?= $arResult["PROPERTIES"]["AUTHOR_QUOTE"]["~VALUE"]["TEXT"] ?></p>
                </div>
            <?php } ?>

            <div class="article-content">
                <?= $arResult["DETAIL_TEXT"] ?: $arResult["PREVIEW_TEXT"] ?>
            </div>

            <?php
            if (!empty($arResult["PROPERTIES"]["PRODUCTS"]["VALUE"]) && is_array($arResult["PROPERTIES"]["PRODUCTS"]["VALUE"])) {
                $arSelect = ["ID", "NAME", "DETAIL_PAGE_URL", "PREVIEW_PICTURE", "CATALOG_PRICE_1"];
                $arFilter = [
                    "IBLOCK_ID" => $arResult["PROPERTIES"]["PRODUCTS"]["LINK_IBLOCK_ID"],
                    "ID" => $arResult["PROPERTIES"]["PRODUCTS"]["VALUE"],
                    "ACTIVE" => "Y"
                ];
                $rsProducts = CIBlockElement::GetList([], $arFilter, false, false, $arSelect);
                ?>
                <div class="products_list">
                    <p class="heading_4">Товары из статьи</p>
                    <ul>
                        <?php while ($arProduct = $rsProducts->GetNext()) { ?>
                            <li>
                                <?php if ($arProduct["PREVIEW_PICTURE"]) { ?>
                                    <img src="<?= CFile::GetPath($arProduct["PREVIEW_PICTURE"]) ?>" alt="<?= htmlspecialchars($arProduct["NAME"]) ?>">
                                <?php } ?>
                                <p class="heading_4 top"><?= htmlspecialchars($arProduct["NAME"]) ?></p>
                                <p class="heading_4 bottom"><?= number_format($arProduct["CATALOG_PRICE_1"], 0, '', ' ') ?> ₽</p>
                                <div class="button icon"><i class="icon-cart"></i></div>
                            </li>
                        <?php } ?>
                    </ul>
                </div>
            <?php } ?>
        </div>
    </section>
<?php
$relatedIds = $arResult["PROPERTIES"]["RELATED_ARTICLES"]["VALUE"] ?? [];
if (!empty($relatedIds)) {
    global $arRelatedFilter;
    $arRelatedFilter = ["ID" => $relatedIds];
    ?>
    <section class="default">
        <?php
        $APPLICATION->IncludeComponent(
            "bitrix:news.list",
            "related-articles",
            [
                "IBLOCK_ID" => $arResult["IBLOCK_ID"],
                "NEWS_COUNT" => count($relatedIds),
                "SORT_BY1" => "ACTIVE_FROM",
                "SORT_ORDER1" => "DESC",
                "FILTER_NAME" => "arRelatedFilter",
                "FIELD_CODE" => ["NAME", "PREVIEW_TEXT", "PREVIEW_PICTURE", "DETAIL_PAGE_URL", "DATE_ACTIVE_FROM"],
                "PROPERTY_CODE" => [],
                "CHECK_DATES" => "Y",
                "INCLUDE_SUBSECTIONS" => "Y",
                "CACHE_TYPE" => "A",
                "CACHE_TIME" => "36000000",
                "CACHE_FILTER" => "Y",
                "CACHE_GROUPS" => "Y",
                "ACTIVE_DATE_FORMAT" => "d F Y",
                "SET_TITLE" => "N",
                "SET_BROWSER_TITLE" => "N",
                "SET_META_KEYWORDS" => "N",
                "SET_META_DESCRIPTION" => "N",
                "SET_LAST_MODIFIED" => "N",
                "INCLUDE_IBLOCK_INTO_CHAIN" => "N",
                "ADD_SECTIONS_CHAIN" => "N"
            ]
        );
        ?>
    </section>
<?php } ?>