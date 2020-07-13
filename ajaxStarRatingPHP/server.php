<?php 

require __DIR__ . '/database/database.php';

session_start();
$message = [];

$sql = "SELECT * FROM ratings ORDER BY RAND() LIMIT 1";

$result = $conn->prepare($sql);
$result->execute();
$row = $result->fetch();

$message["id"] = $row->id;
$message["image"] = $row->image;

if ($row->votes > 0) {
    $message["average"] = round($row->rated / $row->votes,2);
    $message["votes"] = $row->votes;
} else {
    $message["average"] = 0;
    $message["votes"] = 0;
}

if(empty($_SESSION['votes'])) {
    $_SESSION['votes'] = 10;
    $message['votesLeft'] = $_SESSION['votes']; 
} else {
    $message['votesLeft'] = $_SESSION['votes'];
}

header('Content-type: application/json');
echo json_encode($message);