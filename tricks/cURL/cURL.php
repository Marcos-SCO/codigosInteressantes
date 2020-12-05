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
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true); // TRUE to return the transfer as a string of the return value of curl_exec() instead of outputting it directly.

curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false); //FALSE to stop cURL from verifying the peer's certificate. 

// Get results
$results = json_decode(curl_exec($curl));


// ---------- cURL with post -----------
// Array of post data
$postRequest = [
    "first_name" => 'John',
    "last_name" => 'Doe',
];

$curlConnPOST = curl_init('http://hostname/api');
curl_setopt($curlConnPOST, CURLOPT_POSTFIELDS, $postRequest);
curl_setopt($curlConnPOST, CURLOPT_RETURNTRANSFER, true);
// Execute connection and get response
$apiResponsePOST = curl_exec($curlConnPOST);
// End connection
curl_close($curlConnPOST);
$jsonArray = json_decode($apiResponsePOST);

// ---------- cURL with get -----------

$curlConnGET = curl_init();
// Option url
curl_setopt($curlConnGET, CURLOPT_URL, 'https://hostname/endpoint');
curl_setopt($curlConnGET, CURLOPT_RETURNTRANSFER, true);

$resultsGET = curl_exec($curlConnGET);
curl_close($curlConnGET);

$apiResponseGET = json_decode($resultsGET);