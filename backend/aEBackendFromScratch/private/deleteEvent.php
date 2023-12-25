<?php
include('../config/db_config_connection.php');
include('../config/cors.php');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    return;
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $eventId = isset($_GET['eventId']) ? intval($_GET['eventId']) : null;

    if (!$eventId) {
        http_response_code(400);
        echo json_encode(array("success" => false, "message" => "Missing event ID"));
        exit;
    }

    $query = "DELETE FROM events WHERE event_id = ?";
    $stmt = $con->prepare($query);
    $stmt->bind_param('i', $eventId);

    if ($stmt->execute()) {
        http_response_code(200);
        echo json_encode(array("success" => true, "message" => "Event deleted successfully"));
    } else {
        http_response_code(500);
        echo json_encode(array("success" => false, "message" => "Error deleting event"));
    }

    $stmt->close();
    $con->close();
} else {
    http_response_code(405);
    echo json_encode(array("success" => false, "message" => "Method Not Allowed"));
    exit;
}
?>