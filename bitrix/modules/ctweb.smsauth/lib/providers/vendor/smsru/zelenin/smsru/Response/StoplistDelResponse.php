<?php

namespace Zelenin\SmsRu\Response;

class StoplistDelResponse extends AbstractResponse
{

    /**
     * @var array
     */
    protected $availableDescriptions = [
        '100' => '����� ������ �� ���������.',
        '202' => '����� �������� � ������������ �������.',
    ];
}
