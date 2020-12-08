<?php
require_once './googleKeys.php';
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Google reCAPTCHA v3</title>

    <!-- reCAPTCHA v3 scripts -->

    <!-- JS API -->
    <!-- <script src="https://www.google.com/recaptcha/api.js"></script> -->

    <script src="https://www.google.com/recaptcha/api.js?render=<?= SITE_KEY ?>"></script>
</head>

<body>

    <form method="post" id="demo-form">
        <input type="text" placeholder="Seu nome..." name="name">
        <!-- Input for token -->
        <input type="hidden" name="google-response-token" id="google-response-token">

        <!-- <input type="submit" value="Enviar" class="g-recaptcha" data-sitekey="reCAPTCHA_site_key" data-callback='onSubmit' data-action='submit'> -->
        <input type="submit" value="Enviar" class="g-recaptcha" data-sitekey="<?= SITE_KEY ?>" data-callback='onClick' data-action='submit'>

        <!-- Messages -->
        <div id="messages"></div>

        <!-- Callback function to handle token -->
        <script>
            let form = document.getElementById('demo-form');
            let divMessages = document.getElementById('messages');

            function onClick(e) {
                grecaptcha.ready(function() {
                    grecaptcha.execute('<?= SITE_KEY ?>', {
                        action: 'submit'
                    }).then(function(token) {
                        document.getElementById('google-response-token').value = token;
                        // Add your logic to submit to your backend server here.
                        // console.log(token);

                    }).then(() => sendFormData());
                });
            }

            function sendFormData() {
                let formData = new FormData(form);
                let dataInput = [...formData];

                let name = [],
                    googleToken = [];

                dataInput.map(data => {
                    if (data[0] === 'name') {
                        name.push(data[1]);
                    }
                    if (data[0] === 'google-response-token') {
                        googleToken.push(data[1]);
                    }
                })

                let obj = {
                    "name": name,
                    "google-response-token": googleToken
                };

                let jsonObj = JSON.stringify(obj);

                fetch("post.php", {
                        method: "post",
                        headers: {
                            'Content-Type': 'application/json; charset=utf-8'
                        },
                        body: jsonObj
                    })
                    .then(res => res.text())
                    .then(res => {
                        res = JSON.parse(res);
                        console.log(res);

                        divMessages.innerHTML = '';
                        divMessages.setAttribute('class', res.class);
                        divMessages.innerText = res.message;
                    })
                    .catch(err => console.log(err));
            }
        </script>
    </form>

</body>

</html>