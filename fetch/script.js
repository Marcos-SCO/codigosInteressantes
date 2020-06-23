(() => {
    'use strict';
    let btn = document.querySelector('#btn');
    let result = document.querySelector('#result');

    btn.addEventListener('click', fetchSend);
    function fetchSend() {
        let params = {
            method: 'GET',
            mode: 'cors',
            cache: 'default'
        }
        fetch('data.json', params)
            .then((response) => {
                if(response.ok) {
                    return response.json();
                }
            })
            .then((data) => {
                const games = data.games;
                const itens = games.map((game) => {
                    return `<li>Nome:${game.name} - Ano: ${game.year} - ${game.producer}</li>`;
                }).join(' ');
                itens
                result.innerHTML = itens;
            })
            .catch((err) => console.log(err))
    }

})();