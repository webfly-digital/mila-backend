<?
//���� ����������
use Bitrix\Main\Config\Option;

//���� � ����������
require_once($_SERVER["DOCUMENT_ROOT"].'/bitrix/modules/ctweb.smsauth/include.php');

//���������� ���� � ������������ ����������
require_once('vendor/itsmsru/itsmsruapi.php');

class cwsa_itsmsru{
	
	public function __construct($module_id){
	}

	/************************************************
		�����������
	************************************************/
	public function Auth($module_id){
		$login = Option::get($module_id, 'CSR_ITSMSRU_LOGIN');
		$passw = Option::get($module_id, 'CSR_ITSMSRU_PASSWORD');
		
		return new itsmsAPI($login, $passw);
	}

	/************************************************
		�������� ������
	************************************************/	
	public function getBalance($module_id){
		$api = self::Auth($module_id);
		return $api->getBalance();
	}
	
	/************************************************
		�������� ����
	************************************************/
	public function getCodes($id = '0'){
	}
	
	/************************************************
		���������� ���������
	************************************************/
	public function sendSMS($module_id, $arFields){
		$api = self::Auth($module_id);
		
		$arSend = array();
		//�������� ����� ���������
        $arSend['message'] = Option::get($module_id, 'CSR_TEXT_MESSAGE');
		
		//� ������������ ����������
		foreach($arFields as $key=>$field){
            $arSend['message'] = str_replace('#'.$key.'#', $field, $arSend['message']);
		}		
		$arSend['phone'] = $arFields["PHONE"];

		//��������
		if(Option::get($module_id, 'CSR_TRANSLIT') == 1){
			$CSR_HANDLER = new CityWebSmsAuth_Handler();
            $arSend['message'] = $CSR_HANDLER->csr_transliterate($arSend['message']);
		}
		
		//�����������
        $arSend['sender'] = Option::get($module_id, 'CSR_ITSMSRU_SENDERS', NULL);
		
		$res = $api->sendSMS($arSend['phone'], $arSend['message'], $arSend['sender']);
		$result = (string)$res->information;

		if($result == 'send'){
			$arFields["RESULT"] = 'success';
			$arFields["RESULT_MSG"] = $result;
		}
		else{
		    $arFields["RESULT"] = 'fail';
		    self::toLog($result);
		}
		
		self::toLog($arFields);
	}
	
	/************************************************
		�������� ������������
	************************************************/
	public function getSenders($tabControl, $module_id){
		$api = self::Auth($module_id);
		$reply = $api->getSenders();

		if($reply->list_originator->originator){
			$arSenders = array();
			foreach($reply->list_originator->originator as $s){
				switch ((string)$s->attributes()['state']) {
				    case 'order':
				        $mod = ' ('.GetMessage('CSR_ON_MODERATE').')';
				        break;
				    case 'rejected':
				        $mod = ' ('.GetMessage('CSR_ON_REJECTED').')';
				        break;
				    default:
					    $mod = '';
				}
				
				$arSenders[(string)$s] = ((string)$s).$mod;
			}
			
			if (sizeof($arSenders) > 0) {
				$tabControl->AddDropDownField("CSR_ITSMSRU_SENDERS", GetMessage("CSR_SENDERS"), false, $arSenders, Option::get($module_id, 'CSR_ITSMSRU_SENDERS'));
			}
		}
		else{
			$tabControl->AddViewField("CSR_ITSMSRU_SENDERS", "", GetMessage("CSR_SENDERS_NOT_FOUND"));
		}
	}
	
	/************************************************
		�������� ����� ��� �������
	************************************************/
	public function getForm($tabControl, $module_id){
		$login = Option::get($module_id, 'CSR_ITSMSRU_LOGIN');
		$password = Option::get($module_id, 'CSR_ITSMSRU_PASSWORD');
		
		$tabControl->AddEditField("CSR_ITSMSRU_LOGIN", GetMessage('CSR_LOGIN'), false, array("size"=>30, "maxlength"=>255), $login);
		$tabControl->AddEditField("CSR_ITSMSRU_PASSWORD", GetMessage('CSR_PASS'), false, array("size"=>30, "maxlength"=>255, "id"=>"password-type"), $password);
		
		
		if(!empty($login) && !empty($password)){
			$balance = self::getBalance($module_id);
			
			$money = (string)$balance->money;
			
			if(!isset($balance->error) && !empty($money)){
				$tabControl->AddViewField("CSR_ITSMSRU_BALANCE", GetMessage("CSR_BALANCE"), $balance->money);	
				$tabControl->AddViewField("CSR_CONNECT_OK", "", GetMessage("CSR_CONNECT_OK"));	
			}
			else{
				$tabControl->AddViewField("CSR_NOTE_SMS_PROVIDER", "", GetMessage("CSR_CHECK_API", Array("#ERROR_TEXT#" => $balance->error)));
			}
		}
		else{
			$tabControl->AddViewField("CSR_NOTE_SMS_PROVIDER", "", GetMessage("CSR_NEED_REGISTER", array("#SMSLINK#"=>"http://it-sms.ru/")));	
		}
	}
	
	/************************************************
		�������� ����������� �����
	************************************************/
	public function getToken($module_id){
		return Option::get($module_id, 'CSR_ITSMSRU_TOKEN');
	}
	
	/************************************************
		���������� � ���
	************************************************/
	public function toLog($arFields){
		$handler = new CityWebSmsAuth_Handler();
		$handler->addToLog($arFields);
	}
	
	/************************************************
		�������� protected
	************************************************/
	public function GetAttr( $obj , $attrName ) {
	    $a = (array)$obj;
	    if ( isset($a[ $attrName ] ) ) {
	        return $a[ $attrName ];
	    }
	    foreach($a as $k => $v) {
	        if ( preg_match("#".preg_quote("\x00" . $attrName)."$#" , $k) ) {
	            return $v;
	        }
	    }
	    return null;
	}
}