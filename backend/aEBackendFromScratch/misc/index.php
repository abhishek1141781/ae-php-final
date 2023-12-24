<?php
require_once 'config.php';

if (isset($_SESSION['user_token'])) {
  header("Location: welcome.php");
} else {
  echo "<a href='" . $client->createAuthUrl() . "'>Google Login</a>";
}
?>





// This site can’t be reachedlocalhost refused to connect.
// Try:

// Checking the connection
// Checking the proxy and the firewall
// ERR_CONNECTION_REFUSED

// URL BAR:
http://localhost/YouTube/php-google-login/welcome.php?code=4%2F0AfJohXn0YjTo1rBj9s_KOm2MckBnBZe0VNcaHnIKZ7WLcukpJqFhzl13FiNYLdLy-MDrpQ&scope=email+profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+openid&authuser=0&prompt=consent