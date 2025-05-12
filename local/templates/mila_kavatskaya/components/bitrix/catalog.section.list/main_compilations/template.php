<?php if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

/** @var array $arResult */

$this->setFrameMode(true);

// Выводим вкладки:
?>
<div class="head">
    <p class="heading_1 upper">
        <span class="heading_1_italic red" data-type="title-holder"><!-- JS меняет текст --></span>
        по вкусу и настроению
    </p>

    <nav class="badges" data-type="badges">
        <?php foreach ($arResult["SECTIONS"] as $section): ?>
            <p class="badge" data-change-title="Подборки <?= htmlspecialchars($section['NAME']) ?>">
                <?= htmlspecialchars($section['NAME']) ?>
            </p>
        <?php endforeach; ?>
    </nav>

    <a href="/catalog/" class="else_link upper red">Смотреть все</a>
</div>

<div class="main_compilations" data-type="badges_content">
    <?php
    // Для каждой вкладки печатаем отдельный .compilations_list
    foreach ($arResult["SECTIONS"] as $index => $section) {
        $subSections = $section["SUBSECTIONS"] ?? []; //SUBSECTIONS – мы заранее добавили в result_modifier.php
        ?>
        <div class="compilations_list swiper-container">
            <div class="swiper-wrapper">
                <?php foreach ($subSections as $sub) { ?>
                    <a href="<?= $sub["SECTION_PAGE_URL"] ?>" class="compilation_item swiper-slide">
                        <?php if (!empty($sub["PICTURE"]["SRC"])) { ?>
                            <img src="<?= $sub["PICTURE"]["SRC"] ?>" alt="<?= htmlspecialchars($sub["NAME"]) ?>">
                        <?php } else { ?>
                            <img src="<?= SITE_TEMPLATE_PATH ?>/assets/img/png/default_compilation.png" alt="Изображение отсутствует">
                        <?php } ?>

                        <p class="heading_3"><?= htmlspecialchars($sub["NAME"]) ?></p>
                        <p class="text">
                            <?= !empty($sub["DESCRIPTION"])
                                ? htmlspecialchars($sub["DESCRIPTION"])
                                : "Описание отсутствует"
                            ?>
                        </p>
                        <p class="heading_4_italic upper grey">
                            <?= $sub["ELEMENT_CNT"] ?> <?= ($sub["ELEMENT_CNT"] == 1) ? "товар" : "товаров" ?>
                        </p>
                    </a>
                <?php } ?>
            </div>
            <div class="scrollbar">
                <div class="swiper-scrollbar"></div>
            </div>
        </div>
    <?php } ?>
</div>