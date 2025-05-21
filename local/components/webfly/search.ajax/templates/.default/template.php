<?php if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

/** @var array $arParams */
/** @var array $arResult */

$this->setFrameMode(true);
?>
<div class="desktop_search inited" data-popup="header_search">
    <form class="search_field" action="/search/index.php">
        <input id="title-search-input" type="text" name="q" placeholder="Поиск по каталогу" autocomplete="off" />
        <i data-closer="header_search" hidden></i>
        <i class="clear"></i>
        <button type="submit" class="submit"></button>
    </form>

    <div class="search_results" style="display: none">
        <div class="search_results-list">
        </div>
        <a class="button_link" href="/search/index.php">Смотреть все результаты</a>
    </div>
</div>