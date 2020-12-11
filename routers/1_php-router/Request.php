<?php

include_once './IRequest.php';

class Request implements IRequest
{
    function __construct()
    {
        $this->bootstrapSelf();
    }

    private function bootstrapSelf()
    {
        // sets all keys in the global $_SERVER array as properties of the Request class and assigns their values as well.
        foreach ($_SERVER as $key => $value) {
            $this->{$this->toCamelCase($key)} = $value;
        }
    }

    // converts a string from snake case to camel case.
    private function toCamelCase($string)
    {
        $result = strtolower($string);

        preg_match_all('/_[a-z]/', $result, $matches);

        foreach ($matches[0] as $match) {
            $c = str_replace('_', '', mb_strtoupper($match));
            $result = str_replace($match, $c, $result);
        }

        return $result;
    }

    // implementation of the method defined in the IRequest interface.
    public function getBody()
    {
        if ($this->requestMethod === 'GET') {
            return;
        }

        if ($this->requestMethod === 'POST') {
            $body = array();
            foreach ($_POST as $key => $value) {
                $body[$key] = filter_input(INPUT_POST, $key, FILTER_SANITIZE_SPECIAL_CHARS);
            }

            return $body;
        }
    }
}
