<?php

require_once "./Session.php";

$session = new Session();

function request_limit(string $key, int $limit = 5, int $seconds = 10)
{
    global $session;

    if ($session->has($key) && ($session->$key->time >= time()) && $session->$key->requests <= $limit) {
        $session->set(
            $key,
            [
                "time" => time() + $seconds,
                "requests" => $session->$key->requests + 1
            ]
        );
        return false;
    }

    if ($session->has($key) && $session->$key->time >= time() && $session->$key->requests > $limit) {
        return true;
    }

    $session->set($key, [
        "time" => time() + $seconds,
        "requests" => 0
    ]);

    return false;
}

if (!request_limit("user")) {
    var_dump(request_limit('user'));
    // var_dump($session->user);
    echo "Acesso..";

    // Regenerate session id
    $session->regenerate();
} else {
    echo "Bloqueado..";
}
