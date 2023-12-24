<?php

// Include your database connection or any other necessary configurations
include('../config/db_config_connection.php');
include('../config/cors.php');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS'){
    http_response_code(200);
    exit;
}


// Check if the request method is OPTIONS and respond with 200 OK
// if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS' || $_SERVER['REQUEST_METHOD'] === 'GET') {
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    http_response_code(200);


    // Set default values for page number and page size
    $pageNumber = isset($_GET['pageNumber']) ? intval($_GET['pageNumber']) : 0;
    $pageSize = isset($_GET['pageSize']) ? intval($_GET['pageSize']) : 5;

    // Calculate the offset based on page number and page size
    $offset = $pageNumber * $pageSize;


    // Fetch events from the database using pagination
    $query = "SELECT * FROM events ORDER BY start_time DESC LIMIT ? OFFSET ?";
    $stmt = $con->prepare($query);
    $stmt->bind_param('ii', $pageSize, $offset);
    $stmt->execute();
    $result = $stmt->get_result();
    $events = $result->fetch_all(MYSQLI_ASSOC);

    // Get the total number of events for pagination
    $totalEvents = $con->query("SELECT COUNT(*) FROM events")->fetch_row()[0];

    // Prepare the response data
    $response = [
        'content' => $events,
        'totalPages' => ceil($totalEvents / $pageSize),
        'totalElements' => $totalEvents,
        'pageSize' => $pageSize,
        'lastPage' => $pageNumber >= ceil($totalEvents / $pageSize) - 1,
        'pageNumber' => $pageNumber,
    ];

    // // Output the response as JSON
    // header('Content-Type: application/json');
    echo json_encode($response);

    // Close the MySQLi connection
    $stmt->close();
    $con->close();
} else {
    http_response_code(405);
    exit;
}

?>