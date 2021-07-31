<?php
include_once './conn.php';
?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <title>Cadastrar Artigo - Celke</title>
</head>

<body>
  <?php
  for ($artigo = 1; $artigo < 502; $artigo++) {
    $query_artigo = "INSERT INTO access_with_index (article_id) VALUES ($artigo)";
    $cad_artigo = $conn->prepare($query_artigo);

    //$cad_artigo->bindParam(':artigo_id', $artigo, PDO::PARAM_INT);

    $cad_artigo->execute();

    /*if ($cad_artigo->rowCount()) {
                echo "Acesso ao artigo cadastrado com sucesso!<br>";
            } else {
                echo "Erro: Acesso ao artigo não cadastrado com sucesso!<br>";
            }*/
  }
  ?>

</body>

</html>