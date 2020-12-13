<?php

class Session
{
    public function __construct()
    {
        if (!session_id()) {
            session_start();
        }
    }

    public function __get($name)
    {
        if (!empty($_SESSION[$name])) {
            return $_SESSION[$name];
        }

        return null;
    }

    public function __isset($name)
    {
        return $this->has($name);
    }
    
    public function has(string $key)
    {
        return isset($_SESSION[$key]);
    }

    public function set(string $key, $values)
    {
        $_SESSION[$key] = (is_array($values) ? (object)$values : $values);

        return $this;
    }

    public function unset(string $key)
    {
        unset($_SESSION[$key]);
        return $this;
    }

    public function all()
    {
        return (object)$_SESSION;
    }

    public function destroy()
    {
        session_destroy();
    }

    public function regenerate()
    {
        session_regenerate_id(true);

        return $this;
    }

    public function csrf() 
    {
        $_SESSION['csrf_token'] = md5(uniqid(rand(), true));
    }
}
