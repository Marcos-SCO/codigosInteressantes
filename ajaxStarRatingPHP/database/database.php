<?php 

$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ
];

try {
    $conn = new PDO("mysql:host=localhost;dbname=db_ajaxGalleryRating;charset=utf8","root","",$options);
} catch (PDOException $e) {
    echo $e->getMessage();
}
