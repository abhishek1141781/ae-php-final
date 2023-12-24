<?php
// session_start(); // Start the session

// cors configurations
include('../config/cors.php');

// aquire database connection and select database => we get varible named $con from this include stmt
include('../config/db_config_connection.php');

// fetchUserData
include('../utils/fetchUserData.php');

// Set the content type header to JSON
header('Content-Type: application/json');


// Check if the request method is OPTIONS and respond with 200 OK
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS' || $_SERVER['REQUEST_METHOD'] === 'POST' ) {
    http_response_code(200);
}else{
    http_response_code(405);
    exit;
}

// parse/read/decode json data sent from the frontend 
$data = json_decode(file_get_contents("php://input"));

// store decoded json data in respective variables after trimming them
// $email = isset($data->email) ? trim($data->email) : null;
$email = isset($data->username) ? trim($data->username) : null;
$password = isset($data->password) ? trim($data->password) : null;


// create prepared statement to send email and password to run query, to fetch user data from database
$stmt = mysqli_prepare($con, "SELECT user_id, email, name FROM users WHERE email=? AND password=?");
mysqli_stmt_bind_param($stmt, "ss", $email, $password);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);

$nums = mysqli_num_rows($result);
$rs = mysqli_fetch_array($result);

if ($nums === 1) {
    
    // Prepare the response in JSON format: but what is the name of array my fellow DEARRRRRR 
    $response = array(
        'user_id' => $rs['user_id'],
        'email' => $rs['email'],
        'name' => $rs['name'],
        'Status' => 200,
        'dataFromBackend' => true
        // 'dataFromBackend' => 'Yes'
    );
    
    // Output the JSON response
    // echo json_encode($response);
    
} else {
    $response = array(
        'error' => 'Invalid credentials',
        'dataFromBackend' => false
    );
}
    // Output the JSON response
    echo json_encode($response);
    
    // Set the HTTP response code to 202
    // http_response_code(202);

    mysqli_stmt_close($stmt);
?>