<?php if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die(); ?>

<!-- Попап авторизации (ввод номера) -->
<div class="popup side" data-popup="auth" data-noscroll>
    <i class="close" data-closer="auth"></i>
    <div class="user_login">
        <p class="heading_2">Войти</p>
        <form method="post" id="ctweb_smsauth_form_phone">
            <label class="label">
                <p class="notify">Номер телефона</p>
                <input type="text" name="PHONE" placeholder="Номер телефона" minlength="18" data-tel-input required>
                <p class="error">Некорректный номер телефона</p>
            </label>
            <div class="buttons">
                <button class="button" type="submit" data-opener="auth_next" data-closer="auth">Получить код</button>
                <div class="button_link" data-opener="register" data-closer="auth">Регистрация</div>
            </div>
        </form>
    </div>
</div>

<!-- Попап подтверждения кода -->
<div class="popup side" data-popup="auth_next" data-noscroll>
    <i class="close" data-closer="auth_next"></i>
    <div class="user_login">
        <p class="heading_2">Подтверждение</p>
        <form method="post" id="ctweb_smsauth_form_code">
            <label class="label">
                <p class="notify">Номер телефона</p>
                <input type="text" name="PHONE" placeholder="Номер телефона" minlength="18" data-tel-input readonly>
                <p class="error">Некорректный номер телефона</p>
            </label>
            <div class="number_access">
                <p class="heading_4">Подтвердите номер</p>
                <p class="text">Введите последние четыре цифры входящего номера</p>
                <div class="pin_code">
                    <input class="input" type="number" name="CODE[]" maxlength="1">
                    <input class="input" type="number" name="CODE[]" maxlength="1">
                    <input class="input" type="number" name="CODE[]" maxlength="1">
                    <input class="input" type="number" name="CODE[]" maxlength="1">
                </div>
                <p class="text grey timer">Запросить звонок повторно можно через <span>1:00</span></p>
                <div class="button_link">Запросить код повторно</div>
            </div>
        </form>
    </div>
</div>

<?php
// Скрипты модуля авторизации через SMS
$APPLICATION->AddHeadScript("/bitrix/js/ctweb.smsauth/script.js");
?>