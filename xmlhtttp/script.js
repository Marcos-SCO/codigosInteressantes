(() => {
    'use strict';

    let btn = document.querySelector('#btn');
    btn.addEventListener('click', showInfo);

    // on load inject localstorage
    document.addEventListener('readystatechange', () => {
        let localStorageGameItens = checkLocalStorage('games');

        injectItem(localStorageGameItens);
    });

    function showInfo() {
        const ajax = new XMLHttpRequest();
        ajax.open('GET', 'data.json');
        ajax.onreadystatechange = () => {
            if (ajax.status == 200 && ajax.readyState === 4) {
                // status
                //  //console.log(`Ok status ${ajax.status}`);
                // Stringfy
                //  //console.log(JSON.stringify(ajax.responseText));

                // parse
                const res = JSON.parse(ajax.responseText);
                const games = res.games;
                // Inject item
                injectItem(games);
                storeLocalStorage('games', games);
            }
        }
        ajax.send();
    }

    function hasProp(itens) {
        return (Object.keys(itens).length > 0) ? true : false;
    }
    // Display elements
    function injectItem(itens) {
        let infoArea, ul, li, name, year, info;

        if (hasProp(itens) != false) {
            // handle prop as required
            infoArea = document.querySelector('#infoArea');
            removeItemElement('#itemList');
            ul = document.createElement('ul');
            ul.id = 'itemList';
            for (let item of itens) {
                li = document.createElement('li');
                name = item.name;
                year = item.year;
                info = `Nome: ${name} - Ano de lançamento: ${year}`;
                li.innerHTML = info;
                ul.appendChild(li);
            }
            infoArea.appendChild(ul);
            // remove
            removeChildItem('games');
        }
    }
    function checkLocalStorage(colectionName) {
        let itens;
        if (localStorage.getItem(colectionName) === null) {
            itens = [];
        } else {
            itens = JSON.parse(localStorage.getItem(colectionName));
        }
        return itens;
    }

    function storeLocalStorage(colectionName, item) {
        let itens = checkLocalStorage(colectionName);
        itens.push(itens);

        localStorage.setItem(colectionName, JSON.stringify(item));
    }

    function removeItemElement(removeItem) {
        let item = document.querySelector(removeItem);
        if (item != null) {
            item.remove();
        }
    }
    function removeFromLocalStorage(name, removeItem) {
        let itens = checkLocalStorage(name);
        let newItens = itens.filter(i => i != itens[removeItem]);
    
        return localStorage.setItem(name, JSON.stringify(newItens));
    }
    function removeChildItem(name) {
        let itemList = document.querySelectorAll('#itemList li');

        for (let [key, item] of itemList.entries()) {
            item.addEventListener('click', () => {
                item.remove();
                // item.parentNode.removeChild(itemList[key]);
                removeFromLocalStorage(name, key);
            });
        }
    }

    // Clear tasks from LS
    function clearFromLocalStorage(item) {
        // localStorage.clear();
        localStorage.removeItem(item);
    }
})();