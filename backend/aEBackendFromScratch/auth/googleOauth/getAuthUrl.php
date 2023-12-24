<?php
include('../../config/cors.php');
require_once 'config.php';

// Check if the user is already logged in
if (isset($_SESSION['user_token'])) {
    // Redirect to the welcome page if the user is logged in
    header("Location: auth/googleOauth/welcome.php");
    error_log("I was here getAuthURL : if : 9");
    
} else {
    // Return the authentication URL as a JSON response
    header('Content-Type: application/json');
    echo json_encode(['authUrl' => $client->createAuthUrl()]);
    error_log("I was here getAuthURL : else : 15");

}
?>