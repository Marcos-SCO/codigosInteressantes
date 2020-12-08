<?php
// Google keys
require_once './googleKeys.php';

$formData = json_decode(file_get_contents('php://input'), true);

if (!empty($formData)) {
    // var_dump($formData);
    $postArray = filter_var_array($formData, FILTER_SANITIZE_SPECIAL_CHARS);

    // echo $postArray['name'];

    // Verify if name is empty
    verifyEmptyField("name", $postArray['name'][0]);

    // VerifyIf response token is empty
    verifyEmptyField("google token", $postArray['google-response-token'][0]);

    $googleToken = $postArray['google-response-token'][0];

    $requestUrl = 'https://www.google.com/recaptcha/api/siteverify?secret=' . SECRET_KEY . "&response={$googleToken}";

    // Send request
    getCaptchaRequest($requestUrl);
}


function verifyEmptyField($field, $value)
{
    if ($value === '') {
        echo jsonFormatDisplay([
            "class" => "alert alert-error",
            "message" => "O campo \"{$field}\" está vázio..."
        ]);
        exit;
    }
}

function getCaptchaRequest($requestUrl)
{
    // Request with file get contents
    // $response = file_get_contents($requestUrl);

    // Request with cURL
    $cURConnection = curl_init();
    curl_setopt($cURConnection, CURLOPT_URL, $requestUrl);
    curl_setopt($cURConnection, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($cURConnection);
    curl_close($cURConnection);

    $response = json_decode($response, true);

    if ($response['success'] && ($response['score'] && $response['score'] > 0.5)) {
        echo jsonFormatDisplay([
            "response" => $response,
            "class" => "alert alert-success",
            "message" => "Validação correta"
        ]);
    } else {
        echo jsonFormatDisplay([
            "response" => $response,
            "class" => "alert alert-error",
            "message" => "Validação incorreta..."
        ]);
    }
}

function jsonFormatDisplay(array $data)
{
    return json_encode($data, JSON_UNESCAPED_SLASHES);
}
