<?
class iqSMSrest {
	
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
		$fp = fsockopen($this->host, $this->port, $errno, $errstr);
		if (!$fp) {
			return "errno: $errno \nerrstr: $errstr\n";
		}
		fwrite($fp, "GET /send/" .
			"?phone=" . rawurlencode($phone) .
			"&text=" . rawurlencode($text) .
			($sender ? "&sender=" . rawurlencode($sender) : "") .
			($wapurl ? "&wapurl=" . rawurlencode($wapurl) : "") .
			"  HTTP/1.0\n");
		fwrite($fp, "Host: " . $this->host . "\r\n");
		if ($this->login != "") {
			fwrite($fp, "Authorization: Basic " . 
				base64_encode($this->login. ":" . $this->password) . "\n");
		}
		fwrite($fp, "\n");
		$response = "";
		while(!feof($fp)) {
			$response .= fread($fp, 1);
		}
		fclose($fp);
		list($other, $responseBody) = explode("\r\n\r\n", $response, 2);
		return $responseBody;
	}
	
	/* 
	* ������� �������� ��������� �����
	*/
	function getBalance(){
		$url = 'http://api.iqsms.ru/messages/v2/balance/?login='.$this->login.'&password='.$this->password;
		return self::executecURL($url);
	}
	
	/* 
	* ������� ��������� ��������� �������� �����������
	*/
	function getSenders(){
		$url = 'http://gate.iqsms.ru/senders/?login='.$this->login.'&password='.$this->password;
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