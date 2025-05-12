<?php if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

/** @var array $arResult */

$this->setFrameMode(true);

if (empty($arResult["ITEMS"])) return;
?>

<section class="default">
    <div class="head center">
        <p class="heading_1 upper">Вопрос-ответ</p>
    </div>
    <div class="qna">
        <?php foreach ($arResult["ITEMS"] as $arItem) { ?>
            <div class="question_item" id="<?= $this->GetEditAreaId($arItem['ID']); ?>">
                <p class="heading_5" data-spoiler><?= $arItem["NAME"] ?></p>
                <div class="answer small_text">
                    <?= $arItem["DETAIL_TEXT"] ?>
                </div>
            </div>
        <?php } ?>
    </div>
</section>