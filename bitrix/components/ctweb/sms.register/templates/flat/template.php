<? if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true) die();
use  Bitrix\Main\Page\Asset;
use \Ctweb\SMSAuth\Manager;
use \Bitrix\Main\Localization\Loc;

Asset::getInstance()->addJs($templateFolder  . "/assets/js/jquery.maskedinput.js");
Asset::getInstance()->addJs($templateFolder  . "/assets/js/custom.js");

$mainID = $this->GetEditAreaId('');

$mainID = $this->GetEditAreaId('');
$jsParams = array(
    'TEMPLATE' => array(
        'PHONE' => $mainID . 'phone',
        'SAVE_SESSION' => $mainID . 'save_session',
        'CODE' => $mainID . 'code',
        'TIMER' => $mainID . 'timer',
        'SUBMIT' => $mainID . 'submit',
        'RESET' => $mainID . 'reset',
	    'STATE' => $mainID . 'state',
    ),
    'DATA' => array(
	    'TIME_LEFT' => $arResult['EXPIRE_TIME'] - time(),
    )
);

//Формируем маску для кода
$arResult['CODE_MASK'] = '';
for($i = 0; $i < COption::GetOptionString("ctweb.smsauth", "CODE_LENGTH"); $i++){
	if(!empty($arResult['CODE_MASK'])) $arResult['CODE_MASK'].= ' ';
	$arResult['CODE_MASK'].= '*';
}

//Маска для телефона
$arResult['PHONE_MASK'] = COption::GetOptionString("ctweb.smsauth", "CWSA_PHONE_MASK");

//Обрезаем номер телефона
$arResult['HIDDEN_PHONE'] = '*******'.mb_substr($arResult['USER_VALUES'][$arParams['REQUIRE_FIELDS']], -4);

if ($arResult['AUTH_RESULT'] === 'SUCCESS') : ?>
    <? if ($arResult['STEP'] === Manager::STEP_SUCCESS) : ?>
        <div class="row">
            <div class="col-md-8">
                <div class="error alert alert-success">
                    <?= GetMessage("SMS_AUTH_SUCCESS"); ?>
                </div>
            </div>
        </div>
    <? else: ?>
        <div class="row">
            <div class="col-md-8">
                <div class="error alert alert-success">
                    <?= GetMessage("SMS_AUTH_ALREADY_AUTH"); ?>
                </div>
            </div>
        </div>
    <? endif; ?>
<? else: ?>
<div class="ctweb-smsauth-form">
    <? foreach ($arResult["ERRORS"] as $error): ?>
        <div class="row">
            <div class="col-md-8">
                <div class="error alert alert-danger">
                    <?
                    ($msg = GetMessage("SMS_AUTH_ERROR_{$error}")) || ($msg = $error);
                    echo $msg;
                    ?>
                </div>
            </div>
        </div>
    <? endforeach; ?>
    
    <div class="row">
        <form action="<?= POST_FORM_ACTION_URI ?>" method="POST">
            <? echo bitrix_sessid_post(); ?>
            <input type="hidden" name="FORM_ID" value="<?= $arResult['FORM_ID'] ?>">
            <? if ($arResult['STEP'] === Manager::STEP_PHONE_WAITING) : ?>
                <input id="<?= $jsParams['TEMPLATE']['STATE']  ?>" type="hidden" name="" value="PHONE_WAITING">

                <? foreach ($arParams['REQUIRE_FIELDS'] as $code => $arField) : ?>
						<div class="bx-authform-formgroup-container">
							<div class="bx-authform-label-container"><?= GetMessage('SMS_AUTH_PHONE') ?><? if ($arField['required'] === 'Y') : ?><span>*</span><? endif; ?></div>
							<div class="bx-authform-input-container">
								<input type="text" name="<?= $code ?>" placeholder=""
                                   value="<?= $arResult['USER_VALUES'][$code] ?>" class="form-control"
                                <?= $arField['required'] === 'Y' ? 'required' : '' ?>
                                   id="field_<?=$code?>"
                                   data-inputmask="<?=$arResult['PHONE_MASK']?>"/>
							</div>
						</div>
                <? endforeach; ?>

                <?if ($arResult["USE_CAPTCHA"] == "Y"):?>
                    <input type="hidden" name="captcha_sid" value="<?=$arResult["CAPTCHA_CODE"]?>" />

                    <div class="bx-authform-formgroup-container">
                        <div class="bx-authform-label-container"><?=GetMessage("CAPTCHA_REGF_PROMT")?></div>
                        <div class="bx-authform-input-container">
                            <div class="bx-captcha"><img src="/bitrix/tools/captcha.php?captcha_sid=<?=$arResult["CAPTCHA_CODE"]?>" width="180" height="40" alt="CAPTCHA" /></div>
                        </div>
                        <div class="bx-authform-input-container">
                            <input type="text" class="form-control" name="captcha_word" maxlength="50" value="" autocomplete="off"/>
                        </div>
                    </div>

                <?endif?>


                <input id="<?= $jsParams['TEMPLATE']['SUBMIT'] ?>" type="submit" value="<?= GetMessage('SMS_AUTH_CODE_SEND_BTN') ?>" class="btn btn-primary">

            <? elseif ($arResult['STEP'] === Manager::STEP_CODE_WAITING) : ?>
                <input id="<?= $jsParams['TEMPLATE']['STATE']  ?>" type="hidden" name="" value="CODE_WAITING">

                <div class="bx-authform-formgroup-container">
                    <div class="bx-authform-label-container"><?= GetMessage("SMS_AUTH_ENTER_CODE", ["PHONE"=>$arResult['HIDDEN_PHONE']]) ?></div>
                    
                    <div class="code-placement">
	                    <input type="text" name="CODE" id="<?= $jsParams['TEMPLATE']['CODE']?>" class="form-control code-placement-input" data-inputmask="<?=$arResult['CODE_MASK']?>">
	                    <div class="clearfix"></div>
                    </div>
                </div>

                <div class="bx-authform-formgroup-container">
                    <div class="bx-authform-label-container"><div id="<?= $jsParams['TEMPLATE']['TIMER'] ?>"></div></div>
                </div>

                <input id="<?= $jsParams['TEMPLATE']['SUBMIT'] ?>" type="submit" value="<?= GetMessage('SMS_AUTH_SUBMIT') ?>" class="btn btn-primary">
                <input id="<?= $jsParams['TEMPLATE']['RESET'] ?>" name="RESET" type="submit" value="<?= GetMessage("SMS_AUTH_RESET") ?>" class="btn btn-primary" style="display: none;">

            <? endif; ?>
        </form>
    </div>
</div>
<? endif; ?>
<script>
    BX.message(<?= json_encode(array(
        'SMS_AUTH_TIME_LEFT' => GetMessage('SMS_AUTH_TIME_LEFT'),
        'SMS_AUTH_TIME_EXPIRED' => GetMessage('SMS_AUTH_TIME_OUT'),
    ))?>);

    BX(function () {
        new BX.Ctweb.SMSAuth.Controller(<?= json_encode($jsParams) ?>);
    });
</script>
