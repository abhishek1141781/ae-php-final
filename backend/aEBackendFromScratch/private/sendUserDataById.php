<?php

// cors configurations
include('../config/cors.php');

// aquire database connection and select database => we get varible named $con from this include stmt
include('../config/db_config_connection.php');

// fetchUserData
include('../utils/fetchUserData.php');


// Check if the request method is OPTIONS and respond with 200 OK
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS' || $_SERVER['REQUEST_METHOD'] === 'GET') {
    http_response_code(200);
} else {
    http_response_code(405);
    exit;
}


// // parse/read/decode json data sent from the frontend 
// $data = json_decode(file_get_contents("php://input"));

// store decoded json data in respective variables after trimming them
// $userId = isset($data->userId) ? trim($data->userId) : null;
// $userId = $data;
$userId = isset($_GET['userId']) ? trim($_GET['userId']) : null;


// proceed to persist the data in the database
if ($userId) {
    // select user details using userId if it's present
    $checkSql = "SELECT * FROM users WHERE user_id = ?";
    $checkStmt = mysqli_prepare($con, $checkSql);
    mysqli_stmt_bind_param($checkStmt, "s", $userId);
    $result = mysqli_stmt_execute($checkStmt);
    // close the resultSet named checkStmt before calling "fetchUserDataViaById" which will declare it's own result set leading to a "Uncaught mysqli_sql_exception: Commands out of sync"
    mysqli_stmt_close($checkStmt);
    // mysqli_stmt_store_result($checkStmt);

    if ($result) {

        // Fetch the user data after insertion
        $insertedUserData = fetchUserDataViaUserId($con, $userId);

        $response = array(
            'status' => 'valid',
            'user_data' => $insertedUserData
        );

        // $response['dataByUserId'] = array(
        //     'status' => 'valid',
        //     'user_data' => $insertedUserData
        // );
        echo json_encode($response);
    } else {
        $response = array(
            'status' => 'invalid: userId is valid but some issues with fetching if from database and sending it to frontend'
        );            
        // $response['signupData'] = array(
        //     'status' => 'invalid'
        // );
        echo json_encode($response);
    }

    // mysqli_stmt_close($checkStmt);
} else {

    $response = array(
        'status' => 'invalid: userId is invalid'
    );

    // $response['signupData'] = array(
    //     'status' => 'invalid: userId is invalid'
    // );
    echo json_encode($response);
}