<?php
	define("HTTPS_ADDRESS", "http://xn--80aa3adxha4f.xn----ptbkgfnb1a.xn--p1ai/"); //HTTPS-�����, � �������� ����� ���������� �������. �� ������ �� �����.
	define("HTTP_ADDRESS", "http://xn--80aa3adxha4f.xn----ptbkgfnb1a.xn--p1ai/"); //HTTP-�����, � �������� ����� ���������� �������. �� ������ �� �����.
	define("HTTPS_METHOD", "curl"); //�����, ������� ������������ ������ (curl ��� file_get_contents)
	define("USE_HTTPS", 0); //1 - ������������ HTTPS-�����, 0 - HTTP
	
	//����� ���������� ������������� ���������� ��������� ����� ��������. 
	//���� �� ������ ������ �� ���� � ��������� HTTPS_CHARSET, �� ������� HTTPS_CHARSET_AUTO_DETECT �������� FALSE
	define("HTTPS_CHARSET_AUTO_DETECT", false);
	  
	define("HTTPS_CHARSET", "utf-8"); //��������� ����� ��������. cp1251 - ��� Windows-1251, ���� �� utf-8 ���, ����������� - utf-8 :)