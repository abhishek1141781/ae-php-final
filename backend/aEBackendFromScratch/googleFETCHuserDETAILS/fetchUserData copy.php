<?php

// aquire database connection and select database
include('../config/db_config_connection.php');


// Function to fetch user data based on email
function fetchUserDataViaEmail($con, $email) {
    $fetchSql = "SELECT user_id, name, email FROM users WHERE email = ?";
    $fetchStmt = mysqli_prepare($con, $fetchSql);
    mysqli_stmt_bind_param($fetchStmt, "s", $email);
    mysqli_stmt_execute($fetchStmt);
    $result = mysqli_stmt_get_result($fetchStmt);
    $userData = mysqli_fetch_assoc($result);
    mysqli_stmt_close($fetchStmt);

    return $userData;
}

// Function to fetch user data based on user_id
function fetchUserDataViaUserId($con, $user_id) {
    $fetchSql = "SELECT user_id, name, email FROM users WHERE user_id = ?";
    $fetchStmt = mysqli_prepare($con, $fetchSql);
    mysqli_stmt_bind_param($fetchStmt, "i", $user_id); // Assuming user_id is an integer
    mysqli_stmt_execute($fetchStmt);
    $result = mysqli_stmt_get_result($fetchStmt);
    $userData = mysqli_fetch_assoc($result);
    mysqli_stmt_close($fetchStmt);

    return $userData;
}


?>