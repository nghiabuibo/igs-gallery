<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

require_once('classes.php');

$action = $_GET['action'] ?? null;
if (!$action) {
	$response = new ApiResponse('No action!', 400);
	echo json_encode($response);
	die();
}

if ($action === 'search') {
	require_once('endpoints/search.php');
	die();
}

if ($action === 'download') {
	require_once('endpoints/download.php');
	die();
}

$response = new ApiResponse('Action not found!', 404);
echo json_encode($response);