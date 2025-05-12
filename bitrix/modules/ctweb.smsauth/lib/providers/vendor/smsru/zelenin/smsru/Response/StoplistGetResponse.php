<?php

namespace Zelenin\SmsRu\Response;

use Zelenin\SmsRu\Entity\StoplistPhone;

class StoplistGetResponse extends AbstractResponse
{

    /**
     * @var StoplistPhone[]
     */
    public $phones = [];

    /**
     * @var array
     */
    protected $availableDescriptions = [
        '100' => '������ ���������. �� ����������� �������� ����� ���� ������ ���������, ��������� � ��������� � ������� �����;����������.',
    ];
}
