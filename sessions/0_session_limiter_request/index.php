<?php

session_start();
$_SESSION['session_time'] = time();

if (empty($_SESSION['request_count'])) {
    $_SESSION['request_count'] = 0;
    $_SESSION['limit'] = $_SESSION['session_time'] + 15;
}

if ($_SESSION['session_time'] < $_SESSION['limit']) {

    if ($_SESSION['request_count'] < 5) {
        // echo "Olá!";
        var_dump($_SESSION['request_count']);

        $_SESSION['request_count']++;

        var_dump($_SESSION['request_count']);
    } elseif ($_SESSION['request_count'] >= 5) {
        // echo "Bloqueado!";
        $waitTime = $_SESSION['limit'] - $_SESSION['session_time'];

        echo "Espere " . $waitTime . " Segundos";
        echo "<br><br>";
        exit;
    }
} else {
    session_destroy();
}
