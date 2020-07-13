<?php

require __DIR__ . '/database/database.php';

session_start();

$message = [];

if (isset($_GET['image'])) {
    $postId = $_GET['image'];
    $postVote = $_GET['vote'];
    $sql = "SELECT * FROM ratings WHERE id = $postId LIMIT 1";
    $result = $conn->prepare($sql);
    $result->execute();
    $row = $result->fetch();
    
    $rating = $row->rated;
    $votes = $row->votes;
    $rating = $rating + $postVote;
    $votes++;
    
    $sql2 = "UPDATE ratings SET rated = $rating, votes = $votes WHERE id = $postId";
    $result2 = $conn->prepare($sql2);
    $result2->execute();
    $message['type'] = "SUCCESS";
} else {
    $message['type'] = "FAIL";
}
header('Content-type: application/json');
echo json_encode($message);
