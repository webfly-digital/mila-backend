<?

class SmsaeroApiV2
{
    const URL_SMSAERO_API = 'https://gate.smsaero.ru/v2';
    private $email = ''; //��� �����|email
    private $api_key = ''; //��� api_key ����� �������� �� ������ https://smsaero.ru/cabinet/settings/apikey/
    private $sign = 'SMS Aero'; //������� �� ���������

    public function __construct($email, $api_key, $sign = false)
    {
        $this->email = $email;
        $this->api_key = $api_key;
        if ($sign) {
            $this->sign = $sign;
        }
    }

    /**
     * ������������ curl �������
     * @param $url
     * @param $post
     * @param $options
     * @return mixed
     */
    private function curl_post($url, array $post = NULL, array $options = array())
    {
        $defaults = array(
            CURLOPT_POST => 1,
            CURLOPT_HEADER => 0,
            CURLOPT_URL => $url,
            CURLOPT_FRESH_CONNECT => 1,
            CURLOPT_RETURNTRANSFER => 1,
            CURLOPT_FORBID_REUSE => 1,
            CURLOPT_TIMEOUT => 10,
            CURLOPT_POSTFIELDS => http_build_query($post),
            CURLOPT_SSL_VERIFYPEER => 0,
            CURLOPT_SSL_VERIFYHOST => 0,
            CURLOPT_USERPWD => $this->email . ":" . $this->api_key,
            CURLOPT_HTTPAUTH => CURLAUTH_BASIC,
        );

        $ch = curl_init();
        curl_setopt_array($ch, ($options + $defaults));
        if (!$result = curl_exec($ch)) {
            return curl_error($ch);
        }
        curl_close($ch);
        return $result;
    }

    /**
     * �������� �����, ��� �������� ����������� ������������
     * @return array
     */
    public function auth()
    {
        return json_decode(self::curl_post(self::URL_SMSAERO_API . '/auth'));
    }

    /**
     * ����� ������������
     * @return array
     */
    public function cards()
    {
        return json_decode(self::curl_post(self::URL_SMSAERO_API . '/cards'));
    }

    /**
     * ���������� �������
     * @param $sum - ����� ����������
     * @param $cardId - ����������������� ����� �����
     * @return array
     */
    public function addbalance($sum, $cardId)
    {
        return json_decode(self::curl_post(self::URL_SMSAERO_API . '/balance/add', [
            'sum' => $sum,
            'cardId' => $cardId
        ]), true);
    }

    /**
     * �������� ���������
     * @param $number string|array  - ����� ��������(��)
     * @param $text string          - ����� ���������
     * @param $channel string       - ����� ��������
     * @param $dateSend integer     - ���� ��� ���������� �������� ��������� (� ������� unixtime)
     * @param $callbackUrl string   - url ��� �������� ������� ��������� � ������� http://your.site ���
     * https://your.site (� ����� ������� ���� ������ 200)
     * @return array
     */
    public function send($number, $text, $channel, $dateSend = null, $callbackUrl = null)
    {
        return json_decode(self::curl_post(self::URL_SMSAERO_API . '/sms/send/', [
            is_array($number) ? 'numbers' : 'number' => $number,
            'sign' => $this->sign,
            'text' => $text,
            'channel' => $channel,
            'dateSend' => $dateSend,
            'callbackUrl' => $callbackUrl
        ]), true);
    }

    /**
     * �������� ������� SMS ���������
     * @param id - ������������� ���������
     * @return array
     */
    public function check_send($id)
    {
        return json_decode($this->curl_post(self::URL_SMSAERO_API . '/sms/status/', [
            'id' => $id
        ]), true);
    }

    /**
     * ��������� ������ ������������ sms ���������
     * @param $number string - ����������� ��������� �� ������ ��������
     * @param $text string   - ����������� ��������� �� ������
     * @param $page integer  - ����� ��������
     * @return array
     */
    public function sms_list($number = null, $text = null, $page = null)
    {
        isset($page) ? $page = '?page=' . $page : $page = '';
        return json_decode(self::curl_post(self::URL_SMSAERO_API . '/sms/list' . $page, [
            'number' => $number,
            'text' => $text
        ]), true);
    }

    /**
     * ������ �������
     * @return array
     */
    public function balance()
    {
        return json_decode(self::curl_post(self::URL_SMSAERO_API . '/balance', []), true);
    }

    /**
     * ������ ������
     * @return array
     */
    public function tariffs()
    {
        return json_decode(self::curl_post(self::URL_SMSAERO_API . '/tariffs', []), true);
    }

    /**
     * ���������� �������
     * @param $name - ��� �������
     * @return array
     */
    public function sign_add($name)
    {
        return json_decode(self::curl_post(self::URL_SMSAERO_API . '/sign/add', [
            'name' => $name
        ]), true);
    }

    /**
     * �������� ������ ��������
     * @return array
     */
    public function sign_list()
    {
        isset($page) ? $page = '?page=' . $page : $page = '';
        return json_decode(self::curl_post(self::URL_SMSAERO_API . '/sign/list' . $page, []), true);
    }

    /**
     * ���������� ������
     * @param $name string - ���  ������
     * @return array
     */
    public function group_add($name)
    {
        return json_decode(self::curl_post(self::URL_SMSAERO_API . '/group/add', [
            'name' => $name
        ]), true);
    }

    /**
     * �������� ������
     * @param $id integer - ������������� ������
     * @return array
     */
    public function group_delete($id)
    {
        return json_decode(self::curl_post(self::URL_SMSAERO_API . '/group/delete', [
            'id' => $id
        ]), true);
    }

    /**
     * ��������� ������ �����
     * @param $page integer - ���������
     * @return array
     */
    public function group_list($page = null)
    {
        isset($page) ? $page = '?page=' . $page : $page = '';
        return json_decode(self::curl_post(self::URL_SMSAERO_API . '/group/list' . $page, []), true);
    }

    /**
     * ���������� ��������
     * @param $number string - ����� ��������
     * @param null $groupId integer - ������������� ������
     * @param null $birthday integer - ���� �������� �������� (� ������� unixtime)
     * @param null $sex string - ���
     * @param null $lname string - ������� ��������
     * @param null $fname string - ��� ��������
     * @param null $sname string - �������� ��������
     * @param null $param1 string - ��������� ��������
     * @param null $param2 string - ��������� ��������
     * @param null $param3 string - ��������� ��������
     * @return array
     */
    public function contact_add($number, $groupId = null, $birthday = null, $sex = null, $lname = null,
                                $fname = null, $sname = null, $param1 = null, $param2 = null, $param3 = null)
    {
        return json_decode(self::curl_post(self::URL_SMSAERO_API . '/contact/add', [
            'number' => $number,
            'groupId' => $groupId,
            'birthday' => $birthday,
            'sex' => $sex,
            'lname' => $lname,
            'fname' => $fname,
            'sname' => $sname,
            'param1' => $param1,
            'param2' => $param2,
            'param3' => $param3
        ]), true);
    }

    /**
     * �������� ��������
     * @param $id integer - ������������� ��������
     * @return array
     */
    public function contact_delete($id)
    {
        return json_decode(self::curl_post(self::URL_SMSAERO_API . '/contact/delete', [
            'id' => $id
        ]), true);
    }

    /**
     * ������ ���������
     * @param null $number string - ����� ��������
     * @param null $groupId integer - ������������� ������
     * @param null $birthday integer - ���� �������� �������� (� ������� unixtime)
     * @param null $sex string - ���
     * @param null $operator string - ��������
     * @param null $lname string - ������� ��������
     * @param null $fname string - ��� ��������
     * @param null $sname string - �������� ��������
     * @param null $param1 string - ��������� ��������
     * @param null $param2 string - ��������� ��������
     * @param null $param3 string - ��������� ��������
     * @param null $page integer - ���������
     * @return array
     */
    public function contact_list($number = null, $groupId = null, $birthday = null, $sex = null, $operator = null,
                                 $lname = null, $fname = null, $sname = null, $param1 = null, $param2 = null, $param3 = null, $page = null)
    {
        isset($page) ? $page = '?page=' . $page : $page = '';
        return json_decode(self::curl_post(self::URL_SMSAERO_API . '/contact/list' . $page, [
            'number' => $number,
            'groupId' => $groupId,
            'birthday' => $birthday,
            'sex' => $sex,
            'operator' => $operator,
            'lname' => $lname,
            'fname' => $fname,
            'sname' => $sname,
            'param1' => $param1,
            'param2' => $param2,
            'param3' => $param3
        ]), true);
    }

    /**
     * ���������� � ������ ������
     * @param $number array|string - ������ ���������|����� ��������
     * @return array
     */
    public function blacklist_add($number)
    {
        return json_decode(self::curl_post(self::URL_SMSAERO_API . '/blacklist/add', [
            is_array($number) ? 'numbers' : 'number' => $number
        ]), true);
    }

    /**
     * �������� �� ������� ������
     * @param $id integer - ������������� ��������
     * @return array
     */
    public function blacklist_delete($id)
    {
        return json_decode(self::curl_post(self::URL_SMSAERO_API . '/blacklist/delete', [
            'id' => $id
        ]), true);
    }

    /**
     * ������ ��������� � ������ ������
     * @param null $number string - ����� ��������
     * @param null $page integer - ���������
     * @return array
     */
    public function blacklist_list($number = null, $page = null)
    {
        isset($page) ? $page = '?page=' . $page : $page = '';
        return json_decode(self::curl_post(self::URL_SMSAERO_API . '/blacklist/list' . $page, [
            'number' => $number
        ]), true);
    }

    /**
     * �������� ������� �� �������� HLR
     * @param $number array|string - ������ ���������|����� ��������
     * @return array
     */
    public function hlr_check($number)
    {
        return json_decode(self::curl_post(self::URL_SMSAERO_API . '/hlr/check', [
            is_array($number) ? 'numbers' : 'number' => $number
        ]), true);
    }

    /**
     * ��������� ������� HLR
     * @param $id integer - ������������� �������
     * @return array
     */
    public function hlr_status($id)
    {
        return json_decode(self::curl_post(self::URL_SMSAERO_API . '/hlr/status', [
            'id' => $id
        ]), true);
    }

    /**
     * ����������� ���������
     * @param $number array|string - ������ ���������|����� ��������
     * @return array
     */
    public function number_operator($number)
    {
        return json_decode(self::curl_post(self::URL_SMSAERO_API . '/number/operator', [
            is_array($number) ? 'numbers' : 'number' => $number
        ]), true);
    }

    /**
     * �������� Viber-��������
     * @param null $number string|array - ����� ��������|������ ���������. ������������ ���������� 50
     * @param null $groupId integer|string - ID ������ �� ������� ����� ����������� ��������.
     * ��� ������ ���� ��������� ���������� �������� �������� "all"
     * @param $sign string - ������� �����������
     * @param $channel string - ����� �������� Viber
     * @param $text string - ����� ���������
     * @param null $imageSource string - �������� ������������ � base64 ������, �� ������ ��������� ������ 300 kb.
     * �������� �������������� ������ � 3 ��������: png, jpg, gif. ����� ������������ ���������
     * ���������� ��������� � ������.
     * ������: jpg#TWFuIGlzIGRpc3Rpbmd1aXNoZ. �������� �������� ������ ������� POST.
     * �������� ���������� ��������� � textButton � linkButton
     * @param null $textButton string - ����� ������. ������������ ����� 30 ��������.
     * �������� ���������� ��������� � imageSource � linkButton
     * @param null $linkButton string - ������ ��� �������� ��� ������� ������.
     * ������ ������ ���� � ��������� http:// ��� https://.
     * �������� ���������� ��������� � imageSource � textButton
     * @param null $dateSend integer - ���� ��� ���������� �������� �������� (� ������� unixtime)
     * @param null $signSms string - ������� ��� SMS-��������. ������������ ��� ������ ������ "Viber-������"
     * (channel=CASCADE). �������� ����������
     * @param null $channelSms string - ����� �������� SMS-��������. ������������ ��� ������ ������ "Viber-������"
     * (channel=CASCADE). �������� ����������
     * @param null $textSms string - ����� ��������� ��� SMS-��������. ������������ ��� ������ ������ "Viber-������"
     * (channel=CASCADE). �������� ����������
     * @param null $priceSms integer - ������������ ��������� SMS-��������. ������������ ��� ������ ������ "Viber-������"
     * (channel=CASCADE). ���� �������� �� �������, ������������ ��������� ����� ���������� �������������
     * @return array
     */
    public function viber_send($number = null, $groupId = null, $sign, $channel, $text, $imageSource = null, $textButton = null,
                               $linkButton = null, $dateSend = null, $signSms = null, $channelSms = null, $textSms = null, $priceSms = null)
    {
        return json_decode(self::curl_post(self::URL_SMSAERO_API . '/viber/send', [
            is_array($number) && !empty($number) ? 'numbers' : 'number' => $number,
            'groupId' => $groupId,
            'sign' => $sign,
            'channel' => $channel,
            'text' => $text,
            '$imageSource' => $imageSource,
            'textButton' => $textButton,
            'linkButton' => $linkButton,
            'dateSend' => $dateSend,
            'signSms' => $signSms,
            'channelSms' => $channelSms,
            'textSms' => $textSms,
            'priceSms' => $priceSms
        ]), true);
    }

    /**
     * ���������� �� Viber-��������
     * @param $sendingId integer - ������������� Viber-�������� � �������
     * @param $page integer - ���������
     * @return array
     */
    public function viber_statistic($sendingId, $page = null)
    {
        isset($page) ? $page = '?page=' . $page : $page = '';
        return json_decode(self::curl_post(self::URL_SMSAERO_API . '/viber/statistic' . $page, [
            'sendingId' => $sendingId
        ]), true);
    }

    /**
     * ������ Viber-��������
     * @return array
     */
    public function viber_list()
    {
        return json_decode(self::curl_post(self::URL_SMSAERO_API . '/viber/list', []), true);
    }

    /**
     * ������ ��������� �������� ��� Viber-��������
     * @return array
     */
    public function viber_sign_list()
    {
        return json_decode(self::curl_post(self::URL_SMSAERO_API . '/viber/sign/list', []), true);
    }
}