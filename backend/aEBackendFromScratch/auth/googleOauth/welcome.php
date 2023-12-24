<?php
require_once 'config.php';
include('../../config/cors.php');


// Authenticate code from Google OAuth Flow
if (isset($_GET['code'])) {
    // $counter = 1;

    // i have a feeling that this script is being executed twice in the whole oAuth flow , so therse debug lines, correct if incorrect anywhere, i'm a beginner at php syntax
    // error_log("counter: ". $counter++ ." code: " . $_GET['code']);
    $token = $client->fetchAccessTokenWithAuthCode($_GET['code']);
    $client->setAccessToken($token['access_token']);

    // error_log("I was here : 9 $token('access_token')". $token['access_token']);
    // error_log("I was here : 9". $token); // error: array to string conversion


    // Get profile info
    $google_oauth = new Google\Service\Oauth2($client);
    $google_account_info = $google_oauth->userinfo->get();
    $userinfo = [
        'name' => $google_account_info['givenName'] . ' ' . $google_account_info['familyName'],
        'email' => $google_account_info['email'],
        'password' => null, // Password is not used for Google OAuth
        'google_id' => $google_account_info['id'],
    ];
    // $userinfoFrontend = [
    //     // 'email' => $google_account_info['email'],
    //     // 'full_name' => $google_account_info['name'],
    //     // 'token' => $google_account_info['id'],
    //     // 'token' => $token,
    //     // 'access_token' => $token['access_token']
    //     // 'verifiedEmail' => $google_account_info['verifiedEmail'],
    //     'name' => $google_account_info['givenName'] . ' ' . $google_account_info['familyName'],
    //     'password' => null, // Password is not used for Google OAuth
    //     'google_id' => $google_account_info['id'],
    //     'picture' => $google_account_info['picture'],
    // ];

    // Checking if the user already exists in the database
    $sql = "SELECT * FROM users WHERE email = ? AND google_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ss', $userinfo['email'], $userinfo['google_id']);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();

    if ($result->num_rows > 0) {
        // User already exists
        $existingUser = $result->fetch_assoc();
        // error_log("I was here : User already exists 34");

        // Update the user's token
        $sql = "SELECT * FROM users WHERE google_id = ? AND email = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('ss', $userinfo['google_id'], $userinfo['email']);
        $stmt->execute();

        $result = mysqli_stmt_get_result($stmt);

        // $nums = mysqli_num_rows($result);
        $rs = mysqli_fetch_array($result);
        
        $token = $existingUser['google_id'];

        $userinfoFrontend = [
            'name' => $google_account_info['givenName'] . ' ' . $google_account_info['familyName'],
            'password' => null, // Password is not used for Google OAuth
            'google_id' => $google_account_info['id'],
            'picture' => $google_account_info['picture'],
            'email' => $google_account_info['email'],
            // append the below data to the userinfoFrontend and then send it as a json
            // 'user_id' => mysqli_insert_id($conn) ? '' : $rs['user_id'],  // Get the ID of the last inserted user
            'user_id' => $rs['user_id']
        ];
    
        // // Send user data as JSON response to frontend
        // header('Content-Type: application/json');
        echo json_encode($userinfoFrontend);

        $stmt->close();
        exit;

    } else {
        // New user
        // error_log("I was here : NEW USER 46");
        $sql = "INSERT INTO users (name, email, password, google_id) VALUES (?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('ssss', $userinfo['name'], $userinfo['email'], $userinfo['password'], $userinfo['google_id']);
        $stmt->execute();
        $stmt->close();

        $token = $userinfo['google_id'];    
    }

    // Save user data into session
    $_SESSION['user_token'] = $token;

    $userinfoFrontend = [
        'name' => $google_account_info['givenName'] . ' ' . $google_account_info['familyName'],
        'password' => null, // Password is not used for Google OAuth
        'google_id' => $google_account_info['id'],
        'picture' => $google_account_info['picture'],
        'email' => $google_account_info['email'],
        // append the below data to the userinfoFrontend and then send it as a json
        'user_id' => mysqli_insert_id($conn)  // Get the ID of the last inserted user
    ];

    // // Send user data as JSON response to frontend
    // header('Content-Type: application/json');
    echo json_encode($userinfoFrontend);

    // so what is happending up to this point is, user data is saved to database, but user isn't logged in at frontend as user data isn't yet sent to frontend, so find a way to send the current userdata to a particular frontend page, where the backend will wait uptill, the frontend saves the data in the localstorage.setItem and then once it's done so, then the backend will again redirect to a private route i.e /user/dashboard. so the whole point is to bascically send data as well as redirect and data must be sent before redirecting

    // Log user data to the console
    // error_log("User data: " . json_encode($userinfoFrontend));


    // // Redirect the user to the frontend URL
    // header("Location: http://localhost:3000/user/dashboard");
    // die();
} else {
    if (!isset($_SESSION['user_token'])) {
        // // Log user data to the console
        // error_log("I was here : 74");

        header("Location: index.php");
        die();
    }

    // Checking if the user already exists in the database
    $sql = "SELECT * FROM users WHERE google_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $_SESSION['user_token']);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();

    // error_log("I was here : 88");

    if ($result->num_rows > 0) {
        // User exists
        $userinfo = $result->fetch_assoc();
        // error_log("I was here : 93");
    }
}
?>