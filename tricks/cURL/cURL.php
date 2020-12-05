<?php 

// Consuming api's with curl

/*
curl_init(); initializes a cURL session
curl_setopt(); changes the cURL session behavior with options
curl_exec(); executes the started cURL session
curl_close(); closes the cURL session and deletes the variable made by curl_init();
*/

$url = 'requestedUrl';

// Init cURL with url
$curl = curl_init($url);

// cURL options
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);

// Get results
$results = json_decode(curl_exec($curl));