<?
//���� ����������
use Bitrix\Main\Config\Option;

//���� � ����������
require_once($_SERVER["DOCUMENT_ROOT"].'/bitrix/modules/ctweb.smsauth/include.php');

class cwsa_redsmsru{
	
	public function __construct($module_id){
	}

	/************************************************
		�����������
	************************************************/
	public function Auth(){
		
	}

	/************************************************
		�������� ������
	************************************************/	
	public function getBalance($module_id){
		return self::sendQuery($module_id, 'balance', false);
	}
	
	/************************************************
		��������  �������
	************************************************/
	public function getSignature( $arParams, $module_id ){
		$api_key = Option::get($module_id, 'CSR_REDSMSRU_TOKEN');
		$login   = Option::get($module_id, 'CSR_REDSMSRU_LOGIN');
		
		$arParams["login"] = $login;
		$arParams["timestamp"] = self::getTimestamp();
		
	    ksort( $arParams );
	    reset( $arParams );
	 
	    return md5( implode( $arParams ) . $api_key );
	}
	
	/************************************************
		���������� ���������
	************************************************/
	public function sendSMS($module_id, $arFields){

		$arSend = array();
		
		//�������� ����� ���������
        $arSend['text'] = Option::get($module_id, 'CSR_TEXT_MESSAGE');
		
		//� ������������ ����������
		foreach($arFields as $key=>$field){
            $arSend['text'] = str_replace('#'.$key.'#', $field, $text);
		}
				
		//��������
		if(Option::get($module_id, 'CSR_TRANSLIT') == 1){
            $arSend['text'] = self::transliterate($arSend['text']);
		}
		
		//������� ���������
		$arSend['phone'] = $arFields["PHONE"];
		
		//�����������
        $arSend['sender'] = Option::get($module_id, 'CSR_REDSMSRU_SENDERS', NULL);
		
		//���������� SMS
		$res = self::sendQuery($module_id, 'send', $arSend);
		
		if($res->id){
			$arFields["RESULT"] = 'success';
		}
		else{
		    $arFields["RESULT"] = 'fail';
		    self::toLog($res);
		}
		
		self::toLog($arFields);
	}
	
	/************************************************
		�������� ������������
	************************************************/
	public function getSenders($tabControl, $module_id){
		$reply = self::sendQuery($module_id, 'senders', false);	

		$arSenders = array();	
		
		if(isset($reply) && is_array($reply) && sizeof($reply) > 0){
			foreach($reply as $k=>$s){
				if($s=='order'){
					$mod = ' ('.GetMessage('CSR_ON_MODERATE').')';
				}
				else{
					$mod = '';
				}
				$arSenders[$k] = $k.$mod;
			}	
		}

		if (sizeof($arSenders)>0) {
			$tabControl->AddDropDownField("CSR_REDSMSRU_SENDERS", GetMessage("CSR_SENDERS"), false, $arSenders, Option::get($module_id, 'CSR_REDSMSRU_SENDERS'));
		}
		else{
			$tabControl->AddViewField("CSR_REDSMSRU_SENDERS", "", GetMessage("CSR_SENDERS_NOT_FOUND"));
		}
	}
	
	/************************************************
		�������� ����� ��� �������
	************************************************/
	public function getForm($tabControl, $module_id){
		$login = Option::get($module_id, 'CSR_REDSMSRU_LOGIN');
		$token = Option::get($module_id, 'CSR_REDSMSRU_TOKEN');
		$tabControl->AddEditField("CSR_REDSMSRU_LOGIN", GetMessage('CSR_LOGIN'), false, array("size"=>30, "maxlength"=>255), $login);
		$tabControl->AddEditField("CSR_REDSMSRU_TOKEN", GetMessage('CSR_API_KEY'), false, array("size"=>30, "maxlength"=>255), $token);
		if(!empty($token) && !empty($login)){
			$balance = self::getBalance($module_id);
			if($balance->money > 0){
				$tabControl->AddViewField("CSR_REDSMSRU_BALANCE", GetMessage("CSR_BALANCE"), $balance->money);	
				$tabControl->AddViewField("CSR_CONNECT_OK", "", GetMessage("CSR_CONNECT_OK"));	
			}
			else{
				$tabControl->AddViewField("CSR_NOTE_SMS_PROVIDER", "", GetMessage("CSR_CHECK_API", Array("#ERROR_TEXT#" => $balance)));
			}
		}
		else{
			$tabControl->AddViewField("CSR_NOTE_SMS_PROVIDER", "", GetMessage("CSR_NEED_REGISTER", array("#SMSLINK#"=>"https://ctweb.sms.ru")));	
		}
	}
	
	/************************************************
		�������� ����
	************************************************/
	public function getCodes($id = '0'){
		$msgs = array(
			'-1'=>'��������� �� �������.',
			'000' => '������ ��������',
			'1' => '�� ������� �������',
			'2' => '�� ������ �����',
			'3' => '�� ������ �����',
			'4' => '�� ������ �������',
			'5' => '�� ������ �����������',
			'6' => '�� ���������� �������',
			'7' => '�� ���������� �����',
			'8' => '�� ���������� ��� �����������',
			'9' => '�� ������������������ ��� �����������',
			'10' => '�� ���������� ��� �����������',
			'11' => '� ������ ���������� ����������� �����',
			'12' => '������ �������� ���',
			'13' => '����� ��������� � ����-�����. �������� �� ���� ����� ���������',
			'14' => '� ������� ����� 50 �������',
			'15' => '�� ������� ����',
			'16' => '�� ���������� �����',
			'17' => '�� ������� ID ���',
			'18' => '�� ������� ������',
			'19' => '������ �����',
			'20' => '����� ��� ����������',
			'21' => '����������� ��������',
			'22' => '������ ��� ����������',
			'23' => '�� ������ ����� (������: YYYY-MM)',
			'24' => '�� ������� ��������� �����',
			'25' => '������ ������� � ����',
			'26' => '���� �� �������� �������',
			'27' => '��� �������� �������',
			'28' => '�� ������� ��������� ����',
			'29' => '�� ������� �������� ����',
			'30' => '�� ������� ���� (������: YYYY-MM-DD)',
		);
		
		if(!isset($msgs[$id]))
			return '�� ��������� ����� �����: '.$id;
		
		return $msgs[$id];
	}
	
	/************************************************
		���������� � ���
	************************************************/
	public function toLog($arFields){
		$handler = new CityWebSmsAuth_Handler();
		$handler->addToLog($arFields);
	}
	
	/************************************************
		���������� ������
	************************************************/
	public function sendQuery($module_id, $method, $arParams = false) {
		//�������� �����
		$login = Option::get($module_id, 'CSR_REDSMSRU_LOGIN');
		
		//��������� �������
		$sign = self::getSignature( $arParams, $module_id);
		
		//��������� ������ �� ��������
		$url = 'https://lk.redsms.ru/get/'.$method.'.php';
		
		//��������� ���������
		$str = '?login='.$login.'&signature='.$sign;
		if($arParams){
		    foreach($arParams as $k=>$val){
			    $str.='&'.$k.'='.$val;
		    }	
		}
	    $str.='&timestamp='.self::getTimestamp();
	    
	    //���������� ������
	    $content = file_get_contents($url.$str);
	    $content = json_decode($content);

	    //�������� ���� ���� ������
	    if($content->error){
		    return ($content->error.': '.self::getCodes($content->error));
	    }
	    else{
		    return $content;
	    }
	}
	
	/************************************************
		�������� ����� �������
	************************************************/
	public function getTimestamp() {
		return file_get_contents('https://lk.redsms.ru/get/timestamp.php');
	}
	
	/************************************************
		��������� � ��������
	************************************************/
	public function transliterate($st) {
        $cyr = [
            '�','�','�','�','�','�','�','�','�','�','�','�','�','�','�','�','�',
            '�','�','�','�','�','�','�','�','�','�','�','�','�','�','�','�',
            '�','�','�','�','�','�','�','�','�','�','�','�','�','�','�','�','�',
            '�','�','�','�','�','�','�','�','�','�','�','�','�','�','�','�',' ', '�'
        ];
        $lat = [
            'a','b','v','g','d','e','io','zh','z','i','y','k','l','m','n','o','p',
            'r','s','t','u','f','h','ts','ch','sh','sht','a','i','y','e','yu','ya',
            'A','B','V','G','D','E','Io','Zh','Z','I','Y','K','L','M','N','O','P',
            'R','S','T','U','F','H','Ts','Ch','Sh','Sht','A','I','Y','e','Yu','Ya',' ',''
        ];
		
		return str_replace($cyr, $lat, $st);
	}
}