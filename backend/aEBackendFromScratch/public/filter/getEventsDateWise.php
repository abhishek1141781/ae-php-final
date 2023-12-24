<?php
// Include your database connection or any other necessary configurations
include('../../config/db_config_connection.php');
include('../../config/cors.php');

// Check if the request method is OPTIONS and respond with 200 OK
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    return;
}

// Check if the request method is GET
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Get the date parameter from the query string
    $date = $_GET['date'];

    // Prepare and execute the SQL statement to retrieve events for the specified date
    // $query = "SELECT * FROM events WHERE ? BETWEEN DATE(start_time) AND DATE(end_time)";
    $query = "SELECT * FROM events WHERE DATE(start_time) = ? OR DATE(end_time) = ?";
    $stmt = $con->prepare($query);
    // $stmt->bind_param('s', $date);
    $stmt->bind_param('ss', $date, $date);
    $stmt->execute();

    // Get the result
    $result = $stmt->get_result();

    // Fetch the events into an array
    $events = [];
    while ($row = $result->fetch_assoc()) {
        $events[] = $row;
    }

    // Include the totalElements field in the response
    $response = [
        'content' => $events,
        'totalElements' => count($events)
    ];

    // Close the MySQLi statement and connection
    $stmt->close();
    $con->close();

    // Return the response as JSON
    header('Content-Type: application/json');
    echo json_encode($response);
} else {
    // Invalid request method
    http_response_code(405);
    echo json_encode(array("message" => "Method Not Allowed"));
    exit;
}
?>