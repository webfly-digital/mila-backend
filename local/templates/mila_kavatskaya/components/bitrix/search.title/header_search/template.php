<?php if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

/** @var array $arParams */
/** @var array $arResult */

$this->setFrameMode(true);
?>
<div class="desktop_search inited" data-popup="header_search" id="<?= htmlspecialcharsbx($arParams["CONTAINER_ID"]) ?>">
    <form class="search_field" action="<?= $arResult["FORM_ACTION"] ?>">
        <input id="<?= htmlspecialcharsbx($arParams["INPUT_ID"]) ?>" type="text" name="q" placeholder="Поиск по каталогу" value="" autocomplete="off"/>
        <i data-closer="header_search" hidden></i>
        <i class="clear"></i>
        <button type="submit" class="submit"></button>
    </form>

    <?php if ($arResult["CATEGORIES"]) { ?>
        <div class="search_results">
            <div class="search_results-list">
                <?php foreach ($arResult["CATEGORIES"] as $category) { ?>
                    <?php foreach ($category["ITEMS"] as $item) { ?>
                        <a href="<?= $item["URL"] ?>">
                            <?php if (!empty($item["PICTURE"]["SRC"])) { ?>
                                <img src="<?= $item["PICTURE"]["SRC"] ?>" alt="<?= htmlspecialcharsbx($item["NAME"]) ?>">
                            <?php } ?>
                            <p class="text title"><?= htmlspecialcharsbx($item["NAME"]) ?></p>
                            <?php if (!empty($item["PRICE_FORMATED"])) { ?>
                                <p class="text price"><?= $item["PRICE_FORMATED"] ?></p>
                            <?php } ?>
                        </a>
                    <?php } ?>
                <?php } ?>
            </div>
            <a class="button_link" href="<?= $arResult["FORM_ACTION"] ?>">Смотреть все результаты</a>
        </div>
    <?php } ?>
</div>