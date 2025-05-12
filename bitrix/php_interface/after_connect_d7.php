<?php
//$this->queryExecute("SET sql_mode=''");
//$this->queryExecute("SET NAMES 'utf8mb4'");
//$this->queryExecute("SET collation_connection = 'utf8mb4_0900_ai_ci'");


use Bitrix\Main\Application;

// Получаем соединение с БД
$connection = Application::getConnection();

// Отключаем строгий режим InnoDB
$connection->queryExecute("SET sql_mode=''");
$connection->queryExecute("SET innodb_strict_mode=0");

// Устанавливаем кодировку
$connection->queryExecute("SET NAMES 'utf8mb4'");
$connection->queryExecute("SET collation_connection = 'utf8mb4_0900_ai_ci'");