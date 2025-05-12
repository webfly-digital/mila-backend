<?php if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

/** @var array $arResult */

if (empty($arResult["ORDERS"])) { ?>
    <div class="orders_list_holder">
        <p class="text">Вы еще ничего не покупали, воспользуйтесь каталогом или ознакомьтесь с популярными товарами</p>
        <a class="button main" href="/catalog/">Перейти в каталог</a>
    </div>
<?php } else { ?>
    <div class="orders_list" data-type="collapsin">
        <?php foreach ($arResult["ORDERS"] as $order) { ?>
            <?php
            $orderId = $order["ORDER"]["ID"];
            $orderDate = $order["ORDER"]["DATE_INSERT_FORMAT"];
            $orderStatus = $order["ORDER"]["STATUS_ID"];
            $orderPrice = SaleFormatCurrency($order["ORDER"]["PRICE"], $order["ORDER"]["CURRENCY"]);

            // Определяем класс статуса — ты можешь доработать маппинг
            $statusClass = match ($orderStatus) {
                'F' => 'status-green',
                'N' => 'status-orange',
                'C' => 'status-red',
                default => 'status-yellow',
            };

            // Коллапс по умолчанию или нет
            $collapsedClass = $order["ORDER"]["STATUS_ID"] === 'F' ? 'collapsed' : '';
            ?>

            <div class="order_item <?= $statusClass ?> <?= $collapsedClass ?>">
                <div class="order_head">
                    <div class="order_id">№ <?= $orderId ?></div>
                    <div class="order_date"><?= $orderDate ?></div>
                    <div class="order_price"><?= $orderPrice ?></div>
                </div>
                <div class="order_body">
                    <ul class="order_products">
                        <?php foreach ($order["BASKET_ITEMS"] as $item) { ?>
                            <li>
                                <?= htmlspecialcharsbx($item["NAME"]) ?>
                                × <?= (int)$item["QUANTITY"] ?>
                            </li>
                        <?php } ?>
                    </ul>
                    <a class="button bordered" href="<?= $order["ORDER"]["URL_TO_DETAIL"] ?>">Подробнее</a>
                </div>
            </div>
        <?php } ?>
    </div>

    <?php if ($arResult["NAV_STRING"]) { ?>
        <div class="pages">
            <?= $arResult["NAV_STRING"] ?>
        </div>
    <?php } ?>
<?php } ?>