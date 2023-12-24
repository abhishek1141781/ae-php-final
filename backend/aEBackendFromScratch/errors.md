
# 0. Why are there always two requests recieved on the backend when only one is sent from the frontend, and thus two responses are also found on the frontend




# 1.

```php

// Check if the request method is POST, only proceed if so
if ($_SERVER['REQUEST_METHOD'] !== 'POST' || $_SERVER['REQUEST_METHOD'] !== 'OPTIONS') {
    http_response_code(405); // Method Not Allowed
    exit;
}else{
    http_response_code(200); // Method Allowed
       exit;
}

// Check if the request method is OPTIONS and respond with 200 OK
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS' || $_SERVER['REQUEST_METHOD'] === 'POST' ) {
    http_response_code(200);
    exit;
}else{
    http_response_code(405);
    exit;
}
```

why is 1st snippet not working but the 2nd one is working, while there is no difference i think, logically both are the same


GPT:

The issue in the first snippet is due to the usage of the logical OR (`||`) operator in the condition. Let's analyze both snippets:

1. **First Snippet:**
    ```php
    // Check if the request method is POST, only proceed if so
    if ($_SERVER['REQUEST_METHOD'] !== 'POST' || $_SERVER['REQUEST_METHOD'] !== 'OPTIONS') {
        http_response_code(405); // Method Not Allowed
        exit;
    } else {
        http_response_code(200); // Method Allowed
        exit;
    }
    ```
   In this snippet, the condition is using the logical OR (`||`) operator. The issue is that the condition will always evaluate to `true`. If the request method is not 'POST', it will be 'OPTIONS', and vice versa. Therefore, the code inside the `if` block will always be executed, resulting in a 405 response.

2. **Second Snippet:**
    ```php
    // Check if the request method is OPTIONS and respond with 200 OK
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS' || $_SERVER['REQUEST_METHOD'] === 'POST' ) {
        http_response_code(200);
        exit;
    } else {
        http_response_code(405);
        exit;
    }
    ```
   In this snippet, the condition is using the logical OR (`||`) operator correctly. If the request method is 'OPTIONS' or 'POST', the code inside the `if` block will be executed, resulting in a 200 response. If the request method is neither 'OPTIONS' nor 'POST', the code inside the `else` block will be executed, resulting in a 405 response.

In summary, the second snippet is correctly checking whether the request method is 'OPTIONS' or 'POST', whereas the first snippet has a logical issue that causes it to always evaluate to `true`. Therefore, the second snippet is the correct way to handle OPTIONS requests.


# 2.

    Error: 
    Access to XMLHttpRequest at 'http://localhost:8000/auth/manualLogin.php' from origin 'http://localhost:3000' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: It does not have HTTP ok status.
    
    

# 3.

    [Tue Dec 19 17:43:12 2023] [::1]:55786 [200]: GET /private/sendUserDataViaId.php?userId=3 - Uncaught mysqli_sql_exception: Commands out of sync; you can't run this command now in C:\Users\abhis\Desktop\Project\VVIMP Projects Guthub\Private Github Uploads\aePHPproject\backend\aEBackendFromScratch\utils\fetchUserData.php:23
    Stack trace:
    #0 C:\Users\abhis\Desktop\Project\VVIMP Projects Guthub\Private Github Uploads\aePHPproject\backend\aEBackendFromScratch\utils\fetchUserData.php(23): mysqli_prepare(Object(mysqli), 'SELECT user_id,...')
    #1 C:\Users\abhis\Desktop\Project\VVIMP Projects Guthub\Private Github Uploads\aePHPproject\backend\aEBackendFromScratch\private\sendUserDataViaId.php(43): fetchUserDataViaUserId(Object(mysqli), '3')
    #2 {main}
      thrown in C:\Users\abhis\Desktop\Project\VVIMP Projects Guthub\Private Github Uploads\aePHPproject\backend\aEBackendFromScratch\utils\fetchUserData.php on line 23
    [Tue Dec 19 17:43:12 2023] [::1]:55786 Closing


            1st Snippet: here before closing $checkStmt, we've given a call to "fetchUserDataViaUserId"
                        which itself creates it's own fetch stmt, before closing the earlier one created 

    ```php
            // proceed to persist the data in the database
        if ($userId) {
            // select user details using userId if it's present
            $checkSql = "SELECT * FROM users WHERE user_id = ?";
            $checkStmt = mysqli_prepare($con, $checkSql);
            mysqli_stmt_bind_param($checkStmt, "s", $userId);
            $result = mysqli_stmt_execute($checkStmt);
            mysqli_stmt_close($checkStmt);
            // mysqli_stmt_store_result($checkStmt);

            if ($result) {
            
                // Fetch the user data after insertion
                $insertedUserData = fetchUserDataViaUserId($con, $userId);

    ```


    ```php
                // Function to fetch user data based on user_id
        function fetchUserDataViaUserId($con, $user_id) {
            $fetchSql = "SELECT user_id, name, email FROM users WHERE user_id = ?";
            $fetchStmt = mysqli_prepare($con, $fetchSql);
            mysqli_stmt_bind_param($fetchStmt, "i", $user_id); // Assuming user_id is an integer
            mysqli_stmt_execute($fetchStmt);
            $result = mysqli_stmt_get_result($fetchStmt);
            $userData = mysqli_fetch_assoc($result);
            mysqli_stmt_close($fetchStmt);

            return $userData;
        }
    
    ```

# 4. 
```log
    [Thu Dec 21 16:59:27 2023] PHP Fatal error:  Uncaught mysqli_sql_exception: Unknown column 'event_date' in 'order clause' in C:\Users\abhis\Desktop\Project\VVIMP Projects Guthub\Private Github Uploads\aePHPproject\backend\aEBackendFromScratch\public\getAllEvents.php:22
    Stack trace:
    #0 C:\Users\abhis\Desktop\Project\VVIMP Projects Guthub\Private Github Uploads\aePHPproject\backend\aEBackendFromScratch\public\getAllEvents.php(22): mysqli->prepare('SELECT * FROM e...')
    #1 {main}
      thrown in C:\Users\abhis\Desktop\Project\VVIMP Projects Guthub\Private Github Uploads\aePHPproject\backend\aEBackendFromScratch\public\getAllEvents.php on line 22
    [Thu Dec 21 16:59:27 2023] [::1]:58424 [200]: GET /public/getAllEvents.php?pageNumber=0&pageSize=5&sortBy=addedDate&sortDir=desc - Uncaught mysqli_sql_exception: Unknown column 'event_date' in 'order clause' in C:\Users\abhis\Desktop\Project\VVIMP Projects Guthub\Private Github Uploads\aePHPproject\backend\aEBackendFromScratch\public\getAllEvents.php:22
    Stack trace:
    #0 C:\Users\abhis\Desktop\Project\VVIMP Projects Guthub\Private Github Uploads\aePHPproject\backend\aEBackendFromScratch\public\getAllEvents.php(22): mysqli->prepare('SELECT * FROM e...')
    #1 {main}
      thrown in C:\Users\abhis\Desktop\Project\VVIMP Projects Guthub\Private Github Uploads\aePHPproject\backend\aEBackendFromScratch\public\getAllEvents.php on line 22
    [Thu Dec 21 16:59:27 2023] [::1]:58424 Closing
    [Thu Dec 21 16:59:27 2023] [::1]:58427 Accepted
    [Thu Dec 21 16:59:27 2023] PHP Fatal error:  Uncaught mysqli_sql_exception: Unknown column 'event_date' in 'order clause' in C:\Users\abhis\Desktop\Project\VVIMP Projects Guthub\Private Github Uploads\aePHPproject\backend\aEBackendFromScratch\public\getAllEvents.php:22
    Stack trace:
    #0 C:\Users\abhis\Desktop\Project\VVIMP Projects Guthub\Private Github Uploads\aePHPproject\backend\aEBackendFromScratch\public\getAllEvents.php(22): mysqli->prepare('SELECT * FROM e...')
    #1 {main}
      thrown in C:\Users\abhis\Desktop\Project\VVIMP Projects Guthub\Private Github Uploads\aePHPproject\backend\aEBackendFromScratch\public\getAllEvents.php on line 22
    [Thu Dec 21 16:59:27 2023] [::1]:58427 [200]: GET /public/getAllEvents.php?pageNumber=0&pageSize=5&sortBy=addedDate&sortDir=desc - Uncaught mysqli_sql_exception: Unknown column 'event_date' in 'order clause' in C:\Users\abhis\Desktop\Project\VVIMP Projects Guthub\Private Github Uploads\aePHPproject\backend\aEBackendFromScratch\public\getAllEvents.php:22
    Stack trace:
    #0 C:\Users\abhis\Desktop\Project\VVIMP Projects Guthub\Private Github Uploads\aePHPproject\backend\aEBackendFromScratch\public\getAllEvents.php(22): mysqli->prepare('SELECT * FROM e...')
    #1 {main}
      thrown in C:\Users\abhis\Desktop\Project\VVIMP Projects Guthub\Private Github Uploads\aePHPproject\backend\aEBackendFromScratch\public\getAllEvents.php on line 22
```

Frontend error log
```log
    response.data: loadAllPosts complete data from backend:  <br />
    <b>Fatal error</b>:  Uncaught mysqli_sql_exception: Unknown column 'event_date' in 'order clause' in C:\Users\abhis\Desktop\Project\VVIMP Projects Guthub\Private Github Uploads\aePHPproject\backend\aEBackendFromScratch\public\getAllEvents.php:22
    Stack trace:
    #0 C:\Users\abhis\Desktop\Project\VVIMP Projects Guthub\Private Github Uploads\aePHPproject\backend\aEBackendFromScratch\public\getAllEvents.php(22): mysqli-&gt;prepare('SELECT * FROM e...')
    #1 {main}
      thrown in <b>C:\Users\abhis\Desktop\Project\VVIMP Projects Guthub\Private Github Uploads\aePHPproject\backend\aEBackendFromScratch\public\getAllEvents.php</b> on line <b>22</b><br />


```


