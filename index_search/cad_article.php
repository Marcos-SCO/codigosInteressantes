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
  for ($i = 1; $i < 502; $i++) {

    $titulo = "Titulo do artigo $i";
    $conteudo = "Conteudo do artigo $i";

    $query_artigo = "INSERT INTO articles (title, content) VALUES (:title,:content)";
    $cad_artigo = $conn->prepare($query_artigo);

    $cad_artigo->bindParam(':title', $titulo, PDO::PARAM_STR);
    $cad_artigo->bindParam(':content', $conteudo, PDO::PARAM_STR);

    $cad_artigo->execute();

    if ($cad_artigo->rowCount()) {
      echo "Artigo cadastrado com sucesso!<br>";
    } else {
      echo "Erro: Artigo não cadastrado com sucesso!<br>";
    }
  }

  ?>

</body>

</html>