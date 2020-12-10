<?php
// process

if (isset($_POST['submit'])) {
    $postArray = filter_input_array(INPUT_POST, FILTER_SANITIZE_SPECIAL_CHARS);
    $gRecaptchaResponse = $postArray['g-recaptcha-response'];
    
    if (!empty($gRecaptchaResponse)) {
        echo $username = $postArray['username'];
    } else {
        echo "Captcha não selecionado...";
    }
}
