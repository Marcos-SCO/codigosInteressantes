<?php

class Router
{
    private $request;
    private $supportedHttpMethods = ['GET', 'POST'];

    function __construct(IRequest $request)
    {
        // keep a reference to it’s dependency — the Request object.
        $this->request = $request;
    }

    // This method is triggered when invoking inaccessible methods in an object context.
    function __call($name, $args)
    {
        list($route, $method) = $args;

        if (!in_array(strtoupper($name), $this->supportedHttpMethods)) {
            $this->invalidMethodHandler();
        }

        $this->{strtolower($name)}[$this->formatRoute($route)] = $method;
    }

    /**
     * Removes trailing forward slashes from the right of the route.
     * @param route (string)
     */
    private function formatRoute($route)
    {
        $result = rtrim($route, '/');
        return ($result === '') ? '/' : $result;
    }

    public function invalidMethodHandler()
    {
        header("{$this->request->serverProtocol} 405 Method Not Allowed");
    }

    public function defaultRequestHandler()
    {
        header("{$this->request->serverProtocol} 404 Not Found");
    }

    // Resolve a route
    function resolve()
    {
        $methodDictionary = $this->{strtolower($this->request->requestMethod)};
        $formatedRoute = $this->formatRoute($this->request->requestUri);
        $method = $methodDictionary[$formatedRoute];

        if (is_null($method)) {
            $this->defaultRequestHandler();
            return;
        }

        echo call_user_func_array($method, [$this->request]);
    }

    function destruct()
    {
        $this->resolve();
    }
}
