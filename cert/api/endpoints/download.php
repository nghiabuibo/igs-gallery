<?php
header('Content-Type: application/pdf; charset=utf-8');

include_once(__DIR__ . '/../config.php');
include_once(__DIR__ . '/../vendor/autoload.php');
require_once(__DIR__ . '/../utils.php');

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$jwt = $_GET['jwt'] ?? '';

try {
	$payload = JWT::decode($jwt, new Key(GG_API_KEY, 'HS256'));
	if (property_exists($payload, 'error')) {
		return 'Error: ' . $payload->error;
	};

	$entries = $payload->entries;
	require_once __DIR__ . '/../templates/certificate.php';
} catch (Exception $e) {
	echo 'Error: ' . $e->getMessage();
}
