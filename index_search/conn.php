<?php

$host = 'localhost';
$user = 'root';
$pass =  '';
$dbname = 'db_mysql_indices_celke';
$port = 3306;

try {
  $conn = new PDO('mysql:host=' . $host . ';port=' . $port . ';dbname=' . $dbname . ';', $user, $pass);
} catch (PDOException $err) {
  echo "Erro: Conexão com db não foi realizada com sucesso" . $err->getMessage();
}
