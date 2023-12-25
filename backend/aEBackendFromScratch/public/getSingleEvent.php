<?php

// Include your database connection or any other necessary configurations
include('../config/db_config_connection.php');
include('../config/cors.php');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Check if the request method is OPTIONS and respond with 200 OK
// if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS' || $_SERVER['REQUEST_METHOD'] === 'GET') {
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    http_response_code(200);

    // Check if event_id is provided
    if (isset($_GET['eventId'])) {
        $eventId = intval($_GET['eventId']);

        // Fetch a single event with its author's details using a join
        $query = "SELECT e.*, u.name AS author_name, u.email AS author_email FROM events e
                  JOIN users u ON e.user_id = u.user_id
                  WHERE e.event_id = ?";
        $stmt = $con->prepare($query);
        $stmt->bind_param('i', $eventId);
        $stmt->execute();
        $result = $stmt->get_result();
        $event = $result->fetch_assoc();

        // Check if the event exists
        if ($event) {
            // Prepare the response data
            $response = [
                'event' => $event,
            ];

            // Output the response as JSON
            header('Content-Type: application/json');
            echo json_encode($response);
        } else {
            // Event not found
            http_response_code(404);
            echo json_encode(['error' => 'Event not found']);
        }

        // Close the MySQLi connection
        $stmt->close();
        $con->close();
    } else {
        // event_id not provided
        http_response_code(400);
        echo json_encode(['error' => 'event_id parameter is required']);
    }
} else {
    // Invalid request method
    http_response_code(405);
    exit;
}

?>