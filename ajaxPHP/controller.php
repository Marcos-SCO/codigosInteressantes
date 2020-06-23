<?php
// db connection
function conn()
{
    $options = [
        PDO::ATTR_PERSISTENT => TRUE,
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ,
        PDO::ATTR_EMULATE_PREPARES => FALSE
    ];
    try {
        $pdo = new PDO('mysql:host=localhost;port=3306;dbname=db_corte_110porcento;charset=utf8', 'root', '', $options);
        return $pdo;
    } catch (PDOException $e) {
        echo $e->getMessage();
    }
}
$conn = conn();

// Get table variable
$table = ($_GET['table'] != null) ? $_GET['table'] : false;
$limit = ($_GET['limit'] != null) ? 'LIMIT '. $_GET['limit'] : '';

if ($table != false) {
    $stmt = $conn->prepare("SELECT * FROM $table $limit");
    $stmt->execute();
    $products = $stmt->fetchAll();
    echo $products = json_encode($products);
} else {
    echo 'Erro';
}
