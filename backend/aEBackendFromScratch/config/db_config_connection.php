<?php

$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "aedb2";

$con = new mysqli($servername, $username, $password, $dbname);

if ($con->connect_error) {
    die("Connection failed: " . $con->connect_error);
}

?>