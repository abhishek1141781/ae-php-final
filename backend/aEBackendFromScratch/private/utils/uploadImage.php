<?php
// Include your database connection or any other necessary configurations
include('../../config/db_config_connection.php');
include('../../config/cors.php');

// Check if the request method is OPTIONS and respond with 200 OK
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    return;
}

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the event_id from the query parameters
    $event_id = $_GET['event_id'];

    // Check if the event_id is provided
    if (!isset($event_id)) {
        header("HTTP/1.1 400 Bad Request");
        echo json_encode(array("message" => "Missing event_id in the request"));
        exit;
    }

    // Specify the folder where you want to save the uploaded images
    $uploadFolder = "../uploads/";

    // Check if the folder exists, if not, create it
    if (!file_exists($uploadFolder)) {
        mkdir($uploadFolder, 0777, true);
    }

    // Get the uploaded file
    $uploadedFile = $_FILES['image'];

    // Check if the file is uploaded successfully
    if ($uploadedFile['error'] !== UPLOAD_ERR_OK) {
        header("HTTP/1.1 500 Internal Server Error");
        echo json_encode(array("message" => "Error uploading image"));
        exit;
    }

    // Generate a unique filename for the uploaded image
    $filename = uniqid() . '_' . basename($uploadedFile['name']);
    $destination = $uploadFolder . $filename;

    // Move the uploaded file to the destination folder
    if (!move_uploaded_file($uploadedFile['tmp_name'], $destination)) {
        header("HTTP/1.1 500 Internal Server Error");
        echo json_encode(array("message" => "Error moving uploaded image"));
        exit;
    }

    // Update the banner_image_url in the events table with the filename
    $query = "UPDATE events SET banner_image_url = ? WHERE event_id = ?";
    $stmt = $con->prepare($query);
    $stmt->bind_param('si', $filename, $event_id);
    
    if ($stmt->execute()) {
        // Success
        http_response_code(200);
        echo json_encode(array("message" => "Image uploaded successfully"));
    } else {
        // Error
        header("HTTP/1.1 500 Internal Server Error");
        echo json_encode(array("message" => "Error updating banner_image_url"));
    }

    // Close the MySQLi statement and connection
    $stmt->close();
    $con->close();
} else {
    // Invalid request method
    http_response_code(405);
    echo json_encode(array("message" => "Method Not Allowed"));
    exit;
}
?>