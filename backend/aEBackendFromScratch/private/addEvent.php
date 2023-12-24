<?php
// Include your database connection or any other necessary configurations
include('../config/db_config_connection.php');
include('../config/cors.php');

// Check if the request method is OPTIONS and respond with 200 OK
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    return;
    // exit;
}

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the JSON data from the request body
    $json_data = file_get_contents("php://input");

    // Decode the JSON data into an associative array
    $post_data = json_decode($json_data, true);

    // Validate the required fields
    if (
        !isset($post_data['user_id']) ||
        !isset($post_data['event_name']) ||
        !isset($post_data['start_time']) ||
        !isset($post_data['end_time']) ||
        !isset($post_data['location']) ||
        !isset($post_data['description']) ||
        !isset($post_data['category']) ||
        !isset($post_data['banner_image_url'])
    ) {
        header("HTTP/1.1 400 Bad Request");
        echo json_encode(array("message" => "Missing required fields"));
        exit;
    }

    // Prepare and bind the SQL statement using a prepared statement
    $query = "INSERT INTO events (user_id, event_name, start_time, end_time, location, description, category, banner_image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $con->prepare($query);

    // Bind parameters
    $stmt->bind_param('isssssss', $post_data['user_id'], $post_data['event_name'], $post_data['start_time'], $post_data['end_time'], $post_data['location'], $post_data['description'], $post_data['category'], $post_data['banner_image_url']);

    // Execute the statement
    if ($stmt->execute()) {
        // Get the newly created event_id
        $event_id = $con->insert_id;

        // Success
        http_response_code(201);
        echo json_encode(array("success" => true, "message" => "Event created successfully", "event_id" => $event_id));
    } else {
        // Error
        http_response_code(500);
        echo json_encode(array("success" => false, "message" => "Error creating event"));
    }

    // Close the MySQLi statement and connection
    $stmt->close();
    $con->close();
} else {
    // Invalid request method
    http_response_code(405);
    echo json_encode(array("success" => false, "message" => "Method Not Allowed"));
    exit;
}
?>