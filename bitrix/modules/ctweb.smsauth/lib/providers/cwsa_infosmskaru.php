<?
//���� ����������
use Bitrix\Main\Config\Option;

//���� � ����������
require_once($_SERVER["DOCUMENT_ROOT"].'/bitrix/modules/ctweb.smsauth/include.php');

//���������� ���� � ������������ ����������
require_once('vendor/iqsmsru/iqsmsru.php');

class cwsa_infosmskaru{
	
	public function __construct($module_id){
	}

	/************************************************
		�����������
	************************************************/
	public function Auth($module_id){
		$login = Option::get($module_id, 'CSR_INFOSMSKARU_LOGIN');
		$passw = Option::get($module_id, 'CSR_INFOSMSKARU_PASSWORD');
		
		return new iqSMSrest($login, $passw);
	}

	/************************************************
		�������� ������
	************************************************/	
	public function getBalance($module_id){
		$login = Option::get($module_id, 'CSR_INFOSMSKARU_LOGIN');
		$passw = Option::get($module_id, 'CSR_INFOSMSKARU_PASSWORD');
		
		return file_get_contents('http://api.infosmska.ru/interfaces/getbalance.ashx?login='.$login.'&pwd='.$passw);
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
		$login = Option::get($module_id, 'CSR_INFOSMSKARU_LOGIN');
		$passw = Option::get($module_id, 'CSR_INFOSMSKARU_PASSWORD');
		
		$arSend = array();
		//�������� ����� ���������
		$arSend['message'] = Option::get($module_id, 'CSR_TEXT_MESSAGE');
		
		//� ������������ ����������
		foreach($arFields as $key=>$field){
			$arSend['message'] = str_replace('#'.$key.'#', $field, $arSend['message']);
		}
		
		$arSend['phones'] = $arFields["PHONE"];

		//��������
		if(Option::get($module_id, 'CSR_TRANSLIT') == 1){
			$arSend['translit'] = 1;
		}

		//�����������
        $arSend['sender'] = Option::get($module_id, 'CSR_INFOSMSKARU_SENDERS', NULL);

		
		//�������� ������ ��� ��������
		$query = '?login='.$login.'&pwd='.$passw;
		foreach($arSend as $k=>$val){
			$query.='&'.$k.'='.$val;
		}
		
		//���������� SMS
		$res = file_get_contents('http://api.infosmska.ru/interfaces/SendMessages.ashx'.$query);
		
/*
		switch ($status_code) {
		    case 100:
		    case 101:
		    case 102:
		    case 103:
		    	//��������� ���������� �������
		    	$arFields["RESULT"] = 'success';
		        break;
		    default:
		    	//������ ��� �������� ���������
		    	$arFields["RESULT"] = 'fail';
		    	self::toLog($status_code.': '.self::getCodes($status_code));
		}
*/
		
		self::toLog($arFields);
	}
	
	/************************************************
		�������� ������������
	************************************************/
	public function getSenders($tabControl, $module_id){
		$api = self::Auth($module_id);
		$res = $api->getSenders();
		
		$arSenders = array();
		if($res){
			$reply = explode(PHP_EOL, $res);
			
			foreach($reply as $s){
				$arSenders[$s] = $s;
			}
		}
		
		if (sizeof($arSenders) > 0) {
			$tabControl->AddDropDownField("CSR_INFOSMSKARU_SENDERS", GetMessage("CSR_SENDERS"), false, $arSenders, Option::get($module_id, 'CSR_INFOSMSKARU_SENDERS'));
		}
		else{
			$tabControl->AddViewField("CSR_INFOSMSKARU_SENDERS", "", GetMessage("CSR_SENDERS_NOT_FOUND"));
		}
	}
	
	/************************************************
		�������� ����� ��� �������
	************************************************/
	public function getForm($tabControl, $module_id){
		$login = Option::get($module_id, 'CSR_INFOSMSKARU_LOGIN');
		$password = Option::get($module_id, 'CSR_INFOSMSKARU_PASSWORD');
		
		$tabControl->AddEditField("CSR_INFOSMSKARU_LOGIN", GetMessage('CSR_LOGIN'), false, array("size"=>30, "maxlength"=>255), $login);
		$tabControl->AddEditField("CSR_INFOSMSKARU_PASSWORD", GetMessage('CSR_PASS'), false, array("size"=>30, "maxlength"=>255, "id"=>"password-type"), $password);
		
		
		if(!empty($login) && !empty($password)){
			$balance = self::getBalance($module_id);
			
			if(is_array($balance)){
				$tabControl->AddViewField("CSR_INFOSMSKARU_BALANCE", GetMessage("CSR_BALANCE"), $balance[1].' '.$balance[0]);	
				$tabControl->AddViewField("CSR_CONNECT_OK", "", GetMessage("CSR_CONNECT_OK"));	
			}
			else{
				$tabControl->AddViewField("CSR_NOTE_SMS_PROVIDER", "", GetMessage("CSR_CHECK_API", Array("#ERROR_TEXT#" => $balance)));
			}
		}
		else{
			$tabControl->AddViewField("CSR_NOTE_SMS_PROVIDER", "", GetMessage("CSR_NEED_REGISTER", array("#SMSLINK#"=>"https://iqsms.ru/")));	
		}
	}
	
	/************************************************
		�������� ����������� �����
	************************************************/
	public function getToken($module_id){
		return Option::get($module_id, 'CSR_INFOSMSKARU_TOKEN');
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