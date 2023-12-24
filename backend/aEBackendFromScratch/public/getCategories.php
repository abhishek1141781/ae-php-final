<?php

include('../config/db_config_connection.php');
include('../config/cors.php');
include('../utils/categoryService.php');

// Check if the request method is OPTIONS and respond with 200 OK
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS' || $_SERVER['REQUEST_METHOD'] === 'GET') {
    http_response_code(200);
} else {
    http_response_code(405);
    exit;
}

// Fetch distinct categories
$distinctCategories = fetchDistinctCategories($con);

echo json_encode($distinctCategories);
// echo json_encode($distinctCategories, JSON_NUMERIC_CHECK);

// Close the database connection
$con->close();


?>