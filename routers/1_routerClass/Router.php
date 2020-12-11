<?php

// Router class

class Router
{
    public array $getRoutes = [];
    public array $postRoutes = [];

    public function get($url, $fn)
    {
        $this->getRoutes[$url] = $fn;
    }

    public function post($url, $fn)
    {
        $this->postRoutes[$url] = $fn;
    }

    public function resolve()
    {
        $method = strtolower($_SERVER['REQUEST_METHOD']);
        $url = $_SERVER['PATH_INFO'] ?? '/';

        if ($method === 'get') {
            $fn = $this->getRoutes[$url] ?? null;
        } else {
            $fn = $this->postRoutes[$url] ?? null;
        }

        if (!$fn) {
            throw new Exception("Não encontrado...");
            exit;
        }

        echo call_user_func($fn, $this);
    }
}


$router = new Router($database);

$router->get('/', [ProductController::class, 'index']);
$router->post('/products', [ProductController::class, 'create']);