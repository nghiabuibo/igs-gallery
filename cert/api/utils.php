<?php

function vn_to_en($str, $convert_space = false)
{
	$unicode = array(
		'a' => 'á|à|ả|ã|ạ|ă|ắ|ặ|ằ|ẳ|ẵ|â|ấ|ầ|ẩ|ẫ|ậ',
		'd' => 'đ',
		'e' => 'é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ',
		'i' => 'í|ì|ỉ|ĩ|ị',
		'o' => 'ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ',
		'u' => 'ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự',
		'y' => 'ý|ỳ|ỷ|ỹ|ỵ',
		'A' => 'Á|À|Ả|Ã|Ạ|Ă|Ắ|Ặ|Ằ|Ẳ|Ẵ|Â|Ấ|Ầ|Ẩ|Ẫ|Ậ',
		'D' => 'Đ',
		'E' => 'É|È|Ẻ|Ẽ|Ẹ|Ê|Ế|Ề|Ể|Ễ|Ệ',
		'I' => 'Í|Ì|Ỉ|Ĩ|Ị',
		'O' => 'Ó|Ò|Ỏ|Õ|Ọ|Ô|Ố|Ồ|Ổ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ở|Ỡ|Ợ',
		'U' => 'Ú|Ù|Ủ|Ũ|Ụ|Ư|Ứ|Ừ|Ử|Ữ|Ự',
		'Y' => 'Ý|Ỳ|Ỷ|Ỹ|Ỵ',
	);

	foreach ($unicode as $nonUnicode => $uni) {
		$str = preg_replace("/($uni)/i", $nonUnicode, $str);
	}

	if ($convert_space) {
		$str = str_replace(' ', '_', $str);
	}

	return $str;
}

function trim_phone($phone = '')
{
	if (strpos($phone, '84') === 0) {
		$phone_trimmed = substr($phone, 2);
	} else if (strpos($phone, '+') === 0 && strpos($phone, '84') === 1) {
		$phone_trimmed = substr($phone, 3);
	} else if (strpos($phone, '0') === 0) {
		$phone_trimmed = substr($phone, 1);
	} else {
		$phone_trimmed = $phone;
	}
	return $phone_trimmed;
}