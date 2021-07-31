<?php
include_once './conn.php';
?>
<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Listar com Indice - Celke</title>
</head>

<body>

    <h1>Listar os registros com índice</h1>
    <a href="index.php"><button type="button">Home</button></a><br><br>


    <?php
    $inicio = microtime(true);

    $query_acessos = "SELECT SQL_NO_CACHE * FROM access_with_index WHERE article_id = 360";
    $result_accessos = $conn->prepare($query_acessos);
    $result_accessos->execute();

    while ($row_acesso = $result_accessos->fetch(PDO::FETCH_ASSOC)) {
        extract($row_acesso);
        echo "ID: $id <br>";
        echo "<hr>";
    }

    $total = microtime(true) - $inicio;
    echo "Tempo de execução do script com índice: $total <br>";

    ?>

</body>

</html>