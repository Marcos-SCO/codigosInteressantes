(() => {
    'use strict';
    let form = document.querySelector('#form1');
    form.addEventListener('submit', sendForm, false);
    // submit form
    function sendForm(e) {
        e.preventDefault();
        let xmlhttp = new XMLHttpRequest();
        let formData = new FormData(form);

        let btn = document.querySelector('#btn');
        let file = document.querySelector('#file');
        let result = document.querySelector('#result');
        let progress = document.querySelector('.progress');

        if (file.value != '') {

            xmlhttp.open('POST', 'controller.php');
            xmlhttp.onloadstart = () => {
                result.innerHTML = 'Enviando...';
                btn.value = 'Carregando';
            };
            xmlhttp.upload.onprogress = (e) => {
                if (e.lengthComputable) {
                    progress.style.display = 'block';
                    progress.style.width = ((e.loaded * 100) / e.total) + '%';
                }
            };
            xmlhttp.onloadend = () => {
                btn.value = 'Salvar';
                progress.style.display = 'none';
                result.innerHTML = 'Carregado com sucesso';
            };

            xmlhttp.send(formData);
        } else {
            result.innerHTML = 'Envie um arquivo';
        }
    }
})();