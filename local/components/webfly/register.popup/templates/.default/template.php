<?php if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die(); ?>

<div class="popup side" data-popup="register" data-noscroll>
    <i class="close" data-closer="register"></i>
    <div class="user_register" data-type="badges_holder">
        <p class="heading_2">Регистрация</p>

        <div class="badges" data-type="badges">
            <p class="badge">Физ. лицо</p>
            <p class="badge">Юр. лицо</p>
        </div>

        <div class="content" data-type="badges_content">
            <!-- Форма физ. лица -->
            <form class="register_form" data-type="form-individual">
                <label class="label">
                    <p class="notify">Имя</p>
                    <input type="text" name="NAME" placeholder="Имя">
                </label>
                <label class="label">
                    <p class="notify">Фамилия</p>
                    <input type="text" name="LAST_NAME" placeholder="Фамилия">
                </label>
                <label class="label">
                    <p class="notify">Номер телефона</p>
                    <input type="text" name="PERSONAL_PHONE" placeholder="Номер телефона" minlength="18" data-tel-input>
                    <p class="error">Некорректный номер телефона</p>
                </label>
                <label class="label">
                    <p class="notify">E-mail</p>
                    <input type="email" name="EMAIL" placeholder="E-mail">
                    <p class="error">Некорректный E-mail</p>
                </label>

                <div class="buttons">
                    <button class="button" type="submit">Зарегистрироваться</button>
                    <div class="button_link" data-closer="register" data-opener="auth">Войти</div>
                    <p class="notify grey">Нажимая кнопку, я соглашаюсь с <a href="">условиями продажи</a>, <a href="">условиями обработки платежей</a>, <a href="">политикой конфиденциальности</a></p>
                </div>
            </form>

            <!-- Форма юр. лица -->
            <form class="register_form" data-type="form-legal">
                <label class="label">
                    <p class="notify">Название компании</p>
                    <input type="text" name="UF_COMPANY_NAME" placeholder="Название компании">
                </label>
                <label class="label">
                    <p class="notify">ИНН</p>
                    <input type="text" name="UF_INN" placeholder="ИНН">
                </label>
                <label class="label">
                    <p class="notify">КПП</p>
                    <input type="text" name="UF_KPP" placeholder="КПП">
                </label>
                <label class="label">
                    <p class="notify">Юридический адрес</p>
                    <input type="text" name="UF_LEGAL_ADDRESS" placeholder="Юридический адрес">
                </label>
                <label class="label">
                    <p class="notify">Генеральный директор</p>
                    <input type="text" name="UF_DIRECTOR" placeholder="Генеральный директор">
                </label>
                <label class="label">
                    <p class="notify">Имя</p>
                    <input type="text" name="NAME" placeholder="Имя">
                </label>
                <label class="label">
                    <p class="notify">Фамилия</p>
                    <input type="text" name="LAST_NAME" placeholder="Фамилия">
                </label>
                <label class="label">
                    <p class="notify">Номер телефона</p>
                    <input type="text" name="PERSONAL_PHONE" placeholder="Номер телефона" minlength="18" data-tel-input>
                    <p class="error">Некорректный номер телефона</p>
                </label>
                <label class="label">
                    <p class="notify">E-mail</p>
                    <input type="email" name="EMAIL" placeholder="E-mail">
                    <p class="error">Некорректный E-mail</p>
                </label>

                <div class="buttons">
                    <button class="button" type="submit">Зарегистрироваться</button>
                    <div class="button_link" data-closer="register" data-opener="auth">Войти</div>
                    <p class="notify grey">Нажимая кнопку, я соглашаюсь с <a href="">условиями продажи</a>, <a href="">условиями обработки платежей</a>, <a href="">политикой конфиденциальности</a></p>
                </div>
            </form>
        </div>
    </div>
</div>