<?php

// acquire database connection and select database
include('../config/db_config_connection.php');

// Function to fetch distinct locations
function fetchDistinctLocations($con)
{
    // $sql = "SELECT DISTINCT location, event_id FROM events";
    $sql = "SELECT location, COUNT(event_id) AS event_count FROM events GROUP BY location";
    $stmt = mysqli_prepare($con, $sql);

    $locations = [];

    if ($stmt) {
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);

        // while ($row = $result->fetch_assoc()) {
        //     $event_id = $row['event_id'];
        //     $location = $row['location'];
        //     $locations[$event_id] = $location;
        // }

        while ($row = $result->fetch_assoc()) {
            $location = $row['location'];
            $eventCount = $row['event_count'];
            $locations[] = [
                'location' => $location,
                'event_count' => $eventCount
            ];
        }


        $stmt->close();
        return $locations;
    } else {
        echo "No locations found";
    }
}

?>