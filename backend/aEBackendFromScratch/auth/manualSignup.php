<?php

// cors configurations
include('../config/cors.php');

// aquire database connection and select database => we get variable named $con from this include stmt
include('../config/db_config_connection.php');

// fetchUserData
include('../utils/fetchUserData.php');

// Check if the request method is OPTIONS and respond with 200 OK
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}


if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // parse/read/decode json data sent from the frontend 
    $data = json_decode(file_get_contents("php://input"));

    // store decoded json data in respective variables after trimming them
    $name = isset($data->name) ? trim($data->name) : null;
    $email = isset($data->email) ? trim($data->email) : null;
    $password = isset($data->password) ? trim($data->password) : null;

    // proceed to persist the data in the database
    if ($name && $email && $password) {
        // Check if the user already exists with Google OAuth using prepared statement to avoid sql injection
        $checkSql = "SELECT * FROM users WHERE email = ?";
        $checkStmt = mysqli_prepare($con, $checkSql);
        mysqli_stmt_bind_param($checkStmt, "s", $email);
        mysqli_stmt_execute($checkStmt);
        mysqli_stmt_store_result($checkStmt);

        // If User already exists, send conflict status
        if (mysqli_stmt_num_rows($checkStmt) > 0) {
            $response['signupData'] = array(
                'isError' => true,
                'status' => 'invalid',
                'message' => 'You have already signed up with this email. Login with the appropriate method, with which you initially signed up (Password/Oauth)'
            );
            http_response_code(409);
        } else {
            // User does not exist, insert a new row
            $sql = "INSERT INTO users (name, email, password, google_id)
                VALUES (?, ?, ?, NULL)";
            $stmt = mysqli_prepare($con, $sql);
            mysqli_stmt_bind_param($stmt, "sss", $name, $email, $password);
            $result = mysqli_stmt_execute($stmt);

            if ($result) {
                // Fetch the user data after insertion
                $insertedUserData = fetchUserDataViaEmail($con, $email);

                $response['signupData'] = array(
                    'isError' => false,
                    'status' => 'valid',
                    'user_data' => $insertedUserData
                );
            } else {
                $response['signupData'] = array(
                    'isError' => true,
                    'status' => 'invalid',
                    'message' => 'Error in saving user to the database'
                );
                http_response_code(500);
            }

            echo json_encode($response);
        }

        mysqli_stmt_close($checkStmt);
    } else {
        $response['signupData'] = array(
            'isError' => true,
            'status' => 'invalid',
            'message' => 'Enter all 3: name, email, and password'
        );
        http_response_code(400);
        echo json_encode($response);
    }
}
?>