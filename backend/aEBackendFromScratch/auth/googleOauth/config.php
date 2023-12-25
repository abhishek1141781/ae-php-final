<?php

require_once '../../vendor/autoload.php';

session_start();

// init configuration
$clientID = '727755570536-rp85pdutn7k05uh71jeg3mejo4v08h3g.apps.googleusercontent.com';
$clientSecret = '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';
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