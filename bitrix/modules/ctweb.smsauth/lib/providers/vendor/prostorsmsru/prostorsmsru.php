<?
class prostorSMSrest {
	
	function __construct($login, $password){
		$this->host = 'gate.iqsms.ru';
		$this->port = 80;
		$this->login = $login;
		$this->password = $password;
	}

	/* 
	* ������� �������� ��������� 
	*/
	function send($phone, $text, $sender = false, $wapurl = false )
	{
		
		$arSend = array(
			'phone' => $phone,
			'text' => $text,
			'sender' => $sender,
		);
		
		$query = '?login='.$this->login.'&password='.$this->password;
		foreach($arSend as $k=>$val){
			$query.= '&'.$k.'='.urlencode($val);
		}
		
		$url = 'http://api.prostor-sms.ru/messages/v2/send/'.$query;
		return self::executecURL($url);
	}
	
	/* 
	* ������� �������� ��������� �����
	*/
	function getBalance(){
		$url = 'http://api.prostor-sms.ru/messages/v2/balance/?login='.$this->login.'&password='.$this->password;
		return self::executecURL($url);
	}
	
	/* 
	* ������� ��������� ��������� �������� �����������
	*/
	function getSenders(){
		$url = 'http://api.prostor-sms.ru/messages/v2/senders/?login='.$this->login.'&password='.$this->password;
		return self::executecURL($url);
	}
	
	//��������� cURL
	function executecURL($url){
		$curl = curl_init();
		
		// ��������� URL � ������ ����������� ����������
		curl_setopt($curl, CURLOPT_URL,$url);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER,true);
		curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
		
		// �������� �������� � ������ � ��������
		$result = curl_exec($curl);				
		
		// ���������� ������ � ������������ ��������
		curl_close($curl);

		if($result == 'error authorization'){
			return false;
		}
		else{
			return $result;
		}
		
	}

}