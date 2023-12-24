<?php
// Include your database connection or any other necessary configurations
include('../../config/db_config_connection.php');
include('../../config/cors.php');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Check if the request method is OPTIONS and respond with 200 OK
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    http_response_code(200);

    // Get userId from the query parameters
    $userId = isset($_GET['userId']) ? intval($_GET['userId']) : 0;

    // Validate userId (you may need additional validation)
    if (!is_int($userId) || $userId <= 0) {
        header("HTTP/1.1 400 Bad Request");
        echo json_encode(array("message" => "Invalid userId"));
        exit;
    }

    // Fetch events for the specified user from the database
    $query = "SELECT * FROM events WHERE user_id = ? ORDER BY start_time DESC";
    $stmt = $con->prepare($query);
    $stmt->bind_param('i', $userId);
    $stmt->execute();
    $result = $stmt->get_result();
    $events = $result->fetch_all(MYSQLI_ASSOC);

    // // Count of rows received from the SQL query
    // $rowCount = count($events);

    // Prepare the response data
    $response = [
        'content' => $events,
        'totalElements' => count($events), // Assuming you want to include total elements
        // 'length' => $rowCount
    ];

    // Output the response as JSON
    echo json_encode($response);

    // Close the MySQLi connection
    $stmt->close();
    $con->close();
} else {
    http_response_code(405);
    exit;
}
?>