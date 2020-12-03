<?php

interface IRequest
{
    // getBody() retrieves data from the request body. The Request class must have the implementation for this method.
    public function getBody();
}
