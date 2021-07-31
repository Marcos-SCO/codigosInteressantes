<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Indices Mysql</title>
</head>

<body>
  <button type="button" id="btnRegisterArticle" onclick="registerArticle()"><span id="registerArticle">Cadastrar Artigo</span></button>

  <button type="button" id="btnRegisterWithIndex" onclick="registerWithIndex(1)"><span id="registerWithIndex">Cadastrar com índice</span></button>

  <button type="button" id="btnRegisterWithoutIndex" onclick="registerWithoutIndex(1)"><span id="registerWithoutIndex">Cadastrar sem índice</span></button><br><br>

  <a href="list_with_index.php" target="_blank"><button type="button">Listar com índice</button></a>
  <a href="list_without_index.php" target="_blank"><button type="button">Listar sem índice</button></a>

  <script src="custom.js"></script>
</body>

</html>