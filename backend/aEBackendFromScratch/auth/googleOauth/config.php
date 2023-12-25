<?php

require_once '../../vendor/autoload.php';

session_start();

// init configuration
$clientID = 'use_your_own';
$clientSecret = 'use_your_own';
// $redirectUri = 'http://localhost:8000/auth/googleOauth/welcome.php';
$redirectUri = 'http://localhost:3000/login';

// create Client Request to access Google API
$client = new Google_Client();
$client->setClientId($clientID);
$client->setClientSecret($clientSecret);
$client->setRedirectUri($redirectUri);
$client->addScope("email");
$client->addScope("profile");

// Connect to database
$hostname = "localhost";
$username = "root";
$password = "root";
$database = "aedb2";

$conn = mysqli_connect($hostname, $username, $password, $database);