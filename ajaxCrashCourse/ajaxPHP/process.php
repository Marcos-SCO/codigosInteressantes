<?php
echo 'Processing ';

echo $name = (isset($_GET['name'])) ? "Your name: {$_GET['name']}" : ''; 

echo $namePost = (isset($_POST['name'])) ? "Your name: {$_POST['name']}" : ''; 