<?php

namespace Zelenin\SmsRu\Response;

class StoplistAddResponse extends AbstractResponse
{

    /**
     * @var array
     */
    protected $availableDescriptions = [
        '100' => '����� �������� � ��������.',
        '202' => '����� �������� � ������������ �������.',
    ];
}
