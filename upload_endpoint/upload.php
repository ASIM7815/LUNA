<?php
header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

$target_dir = "../allimages/banners/"; // Updated path to the banners folder
$target_file = $target_dir . basename($_FILES["image"]["name"]);
$response = array();

if (move_uploaded_file($_FILES["image"]["tmp_name"], $target_file)) {
    $response["fileName"] = basename($_FILES["image"]["name"]);
    echo json_encode($response);
} else {
    http_response_code(500);
    echo json_encode(["error" => "There was an error uploading the file."]);
}
?>
