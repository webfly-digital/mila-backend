<?php if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die(); ?>

<!-- Попап авторизации (ввод номера) -->
<div class="popup side" data-popup="auth" data-noscroll>
    <i class="close" data-closer="auth"></i>
    <div class="user_login">
        <p class="heading_2">Войти</p>
        <label class="label">
            <p class="notify">Номер телефона</p>
            <input type="text" name="PHONE" placeholder="Номер телефона" minlength="18" data-tel-input>
            <p class="error">Некорректный номер телефона</p>
        </label>
        <div class="buttons">
            <div class="button" data-opener="auth_next" data-closer="auth">Получить код</div>
            <div class="button_link" data-opener="register" data-closer="auth">Регистрация</div>
        </div>
    </div>
</div>

<!-- Попап подтверждения кода -->
<div class="popup side" data-popup="auth_next" data-noscroll>
    <i class="close" data-closer="auth_next"></i>
    <div class="user_login">
        <p class="heading_2">Войти</p>
        <label class="label">
            <p class="notify">Номер телефона</p>
            <input type="text" name="PHONE" placeholder="Номер телефона" minlength="18" data-tel-input value="9999999999">
            <p class="error">Некорректный номер телефона</p>
        </label>
        <div class="number_access">
            <p class="heading_4">Подтвердите номер</p>
            <p class="text">Введите последние четыре цифры входящего номера</p>
            <div class="pin_code">
                <input class="input" type="number" maxlength="1">
                <input class="input" type="number" maxlength="1">
                <input class="input" type="number" maxlength="1">
                <input class="input" type="number" maxlength="1">
            </div>
            <p class="text grey timer">Запросить звонок повторно можно через <span>1:00</span></p>
            <div class="button_link">Запросить код повторно</div>
        </div>
    </div>
</div>