<?php 

// Consuming api's with curl

$url = 'requestedUrl';

// Init cURL with url
$curl = curl_init($url);

// cURL options
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);

// Get results
$results = json_decode(curl_exec($curl));