<?php

abstract class Conn
{
    /**
     * Get the PDO database connection
     * 
     * @return mixed
     */
    protected static function connection()
    {
        // Set dsn
        $dsn = 'mysql:host=localhost;port=3306;dbname=db_login_mvc;charset=utf8';
        $options = [
            PDO::ATTR_PERSISTENT => TRUE,
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ,
            PDO::ATTR_EMULATE_PREPARES => FALSE
        ];

        try {
            $pdo = new PDO($dsn, 'root', '', $options);

            return $pdo = $pdo;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
}
