<?php

// aquire database connection and select database
include('../config/db_config_connection.php');


// Function to fetch distinct categories
function fetchDistinctCategories($con)
{
    // $sql = "SELECT DISTINCT category, event_id FROM events";
    $sql = "SELECT category, COUNT(event_id) AS event_count FROM events GROUP BY category";
    // $stmt = $con->prepare($sql);
    $stmt = mysqli_prepare($con, $sql);
    // $stmt = $con->prepare($sql);
    

    $categories = [];
    
    if ($stmt) {
        // $stmt->execute();
        mysqli_stmt_execute($stmt);
        // $result = $stmt->get_result();
        $result = mysqli_stmt_get_result($stmt);
        

        // while ($row = $result->fetch_assoc()) {
        //     $category = $row['category'];
        //     $event_id = $row['event_id'];
        //     $categories[$event_id] = $category;
        // }

        // while ($row = $result->fetch_assoc()) {
        //     $category = $row['category'];
        //     $eventCount = $row['event_count'];
        //     $categories[$category] = ['event_id' => $category, 'event_count' => $eventCount];
        // }

        // $idCounter = 1; // Initialize unique id counter

        while ($row = $result->fetch_assoc()) {
            $category = $row['category'];
            $eventCount = $row['event_count'];
            $categories[] = [
                // 'id' => $idCounter,
                'category' => $category,
                // 'event_id' => $category,
                'event_count' => $eventCount
            ];

            // $idCounter++; // Increment unique id counter
        }


        $stmt->close();
        return $categories;
    }else{
        echo "No categories found";
    }

}

?>