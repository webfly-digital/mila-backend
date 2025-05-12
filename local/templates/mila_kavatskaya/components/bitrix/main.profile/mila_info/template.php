<?php if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

/** @var array $arResult */

global $USER;
?>
<form action="<?= POST_FORM_ACTION_URI ?>" method="post" class="info_form">
    <?= bitrix_sessid_post() ?>
    <input type="hidden" name="ID" value="<?= $USER->GetID() ?>">

    <p class="heading_3">Личная информация</p>

    <label class="label">
        <p class="notify">Имя</p>
        <input type="text" name="NAME" value="<?= htmlspecialcharsbx($arResult["arUser"]["NAME"]) ?>" placeholder="Имя">
    </label>

    <label class="label">
        <p class="notify">Фамилия</p>
        <input type="text" name="LAST_NAME" value="<?= htmlspecialcharsbx($arResult["arUser"]["LAST_NAME"]) ?>" placeholder="Фамилия">
    </label>

    <label class="label">
        <p class="notify">Дата рождения</p>
        <input type="text" name="PERSONAL_BIRTHDAY" value="<?= htmlspecialcharsbx($arResult["arUser"]["PERSONAL_BIRTHDAY"]) ?>" placeholder="Дата рождения" data-date>
        <p class="small_text grey">Дату рождения можно указать только 1 раз. Изменить нельзя.</p>
    </label>

    <div class="radio_buttons">
        <label class="input_radio">
            <input type="radio" name="PERSONAL_GENDER" value="M" <?= $arResult["arUser"]["PERSONAL_GENDER"] === "M" ? "checked" : "" ?>>
            <p class="text">Мужчина</p>
        </label>
        <label class="input_radio">
            <input type="radio" name="PERSONAL_GENDER" value="F" <?= $arResult["arUser"]["PERSONAL_GENDER"] === "F" ? "checked" : "" ?>>
            <p class="text">Женщина</p>
        </label>
    </div>

    <p class="heading_3">Контактные данные</p>

    <label class="label">
        <p class="notify">Номер телефона</p>
        <input type="text" name="PERSONAL_PHONE" value="<?= htmlspecialcharsbx($arResult["arUser"]["PERSONAL_PHONE"]) ?>" placeholder="Номер телефона" minlength="18" data-tel-input>
        <p class="error">Некорректный номер телефона</p>
        <p class="small_text grey">Для изменения номера телефона обратитесь к администрации интернет-магазина</p>
    </label>

    <label class="label">
        <p class="notify">E-mail</p>
        <input type="email" name="EMAIL" value="<?= htmlspecialcharsbx($arResult["arUser"]["EMAIL"]) ?>" placeholder="E-mail">
        <p class="error">Некорректный E-mail</p>
    </label>

    <p class="heading_3">Сменить пароль</p>

    <label class="label">
        <p class="notify">Новый пароль</p>
        <input class="input" type="password" name="NEW_PASSWORD" autocomplete="off" placeholder="Новый пароль">
    </label>

    <label class="label">
        <p class="notify">Повторите пароль</p>
        <input class="input" type="password" name="NEW_PASSWORD_CONFIRM" autocomplete="off" placeholder="Повторите пароль">
        <p class="error">Пароли не совпадают</p>
    </label>

    <div class="buttons">
        <button class="button main" type="submit" name="save" value="Y">Сохранить</button>
        <button class="button bordered" type="reset">Отменить</button>
    </div>
</form>