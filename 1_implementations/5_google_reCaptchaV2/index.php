<?php
// reCAPTCHA v2

// Const CAPTCHA Keys
require_once "./keys.php";

require_once "./processForm.php";
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>reCAPTCHA v2</title>

    <!-- reCAPTCHA v2 scripts -->
    <!-- Automatic render captcha -->
    <!-- <script src="https://www.google.com/recaptcha/api.js" async defer></script> -->
</head>

<body>
    <form action="" method="post">
        <div class="g-recaptcha" data-sitekey="<?= SITE_KEY ?>"></div>

        <input type="text" name="username" id="username" placeholder="Qual é seu nome?">
        <input type="submit" value="Enviar" name="submit">
    </form>

    <!-- Manually render captcha -->
    <script type="text/javascript">
        var onloadCallback = function() {
            let SITE_KEY = document.querySelector('[data-sitekey]').getAttribute('data-sitekey');
            let reCaptchaElementRender = document.querySelector('.g-recaptcha');

            verifyCallback = function(response) {
                alert(response);
            }

            // alert("grecaptcha is ready!");
            grecaptcha.render(reCaptchaElementRender, {
                'sitekey': SITE_KEY,
                'callback': verifyCallback,
                'theme': 'dark'
            });
        };
    </script>

    <script src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit" async defer>
    </script>
    <!-- <script src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit&hl=en" async defer>
        /* Url Params:
            onload: Optional. The name of your callback function to be executed once all the dependencies have loaded.

            render: Optional. Whether to render the widget explicitly. Defaults to onload, which will render the widget in the first g-recaptcha tag it finds.

            hl: Optional. Forces the widget to render in a specific language. Auto-detects the user's language if unspecified.
        */
    </script> -->
</body>

</html>