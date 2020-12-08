<?php

// start session
session_start();

// create a key for hash function
if (!isset($_SESSION['token'])) {
    $_SESSION['token'] = bin2hex(random_bytes(32));
    // echo $_SESSION['token'];
}
// Create CSRF token ----
$csrf = hash_hmac('sha256', '/my_form.php', $_SESSION['token']);
/* You can further restrict tokens to only be available for a particular form by using hash_hmac(). HMAC is a particular keyed hash function that is safe to use, even with weaker hash functions (e.g. MD5). However, I recommend using the SHA-2 family of hash functions instead. */

// validate token

if (isset($_POST['submit'])) {
    // filter data
    $postFilterInputs = filter_input_array(INPUT_POST, FILTER_DEFAULT);
    
    $postArray = filter_var_array($postFilterInputs, FILTER_SANITIZE_SPECIAL_CHARS);
    
    if (hash_equals($csrf, $postArray['csrf'])) {
        echo "Your name " . $postArray['username'];
    }
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSRF</title>
</head>

<body>
    <form action="index.php" method="post">
        <!-- input with csrf -->
        <input type="hidden" name="csrf" value="<?= $csrf ?>">

        <input type="text" name="username" placeholder="Username">

        <input type="submit" name="submit" value="SUBMIT">
    </form>
</body>

</html>