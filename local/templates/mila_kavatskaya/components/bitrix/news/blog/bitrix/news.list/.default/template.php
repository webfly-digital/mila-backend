<?php
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

/** @var array $arParams */
/** @var array $arResult */

$this->setFrameMode(true);
?>
<section class="default" data-type="badges_holder">
    <div class="head">
        <div class="heading_1 upper">Блог</div>
        <div class="badges_scroller">
            <div class="badges" data-type="badges">
                <div class="badge" data-filter="all">
                    Все статьи
                </div>

                <?php foreach ($arResult["SECTIONS"] as $arSection): ?>
                    <div class="badge" data-filter="<?= htmlspecialchars($arSection["CODE"]) ?>">
                        <?= htmlspecialchars($arSection["NAME"]) ?>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </div>

    <div class="blog_wrapper" data-type="badges_content">
        <div class="articles_list">
            <?php foreach ($arResult["ITEMS"] as $arItem): ?>
                <a href="<?= $arItem["DETAIL_PAGE_URL"] ?>" class="article_item">
                    <?php if (!empty($arItem["PREVIEW_PICTURE"]["SRC"])): ?>
                        <figure>
                            <img src="<?= $arItem["PREVIEW_PICTURE"]["SRC"] ?>" alt="">
                        </figure>
                    <?php endif; ?>
                    <p class="text grey"><?= $arItem["DISPLAY_ACTIVE_FROM"] ?></p>
                    <p class="heading_4"><?= htmlspecialchars($arItem["NAME"]) ?></p>
                    <p class="text"><?= htmlspecialchars($arItem["PREVIEW_TEXT"]) ?></p>
                    <p class="text grey"><?= htmlspecialchars($arResult["PROPERTIES"]["AUTHOR"]["VALUE"]) ?></p>
                </a>
            <?php endforeach; ?>
        </div>

        <?php foreach ($arResult["SECTIONS"] as $arSection): ?>
            <div class="articles_list">
                <?php foreach ($arResult["ITEMS"] as $arItem): ?>
                    <?php
                    if ($arItem["IBLOCK_SECTION_ID"] == $arSection["ID"]):
                        ?>
                        <a href="<?= $arItem["DETAIL_PAGE_URL"] ?>" class="article_item">
                            <?php if (!empty($arItem["PREVIEW_PICTURE"]["SRC"])): ?>
                                <figure>
                                    <img src="<?= $arItem["PREVIEW_PICTURE"]["SRC"] ?>" alt="">
                                </figure>
                            <?php endif; ?>
                            <p class="text grey"><?= $arItem["DISPLAY_ACTIVE_FROM"] ?></p>
                            <p class="heading_4"><?= htmlspecialchars($arItem["NAME"]) ?></p>
                            <p class="text"><?= htmlspecialchars($arItem["PREVIEW_TEXT"]) ?></p>
                            <p class="text grey"><?= htmlspecialchars($arResult["PROPERTIES"]["AUTHOR"]["VALUE"]) ?></p>
                        </a>
                    <?php endif; ?>
                <?php endforeach; ?>
            </div>
        <?php endforeach; ?>
    </div>

    <?php if ($arParams["DISPLAY_BOTTOM_PAGER"]): ?>
        <br><?= $arResult["NAV_STRING"] ?>
    <?php endif; ?>
</section>