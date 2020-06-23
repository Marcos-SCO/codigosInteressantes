(() => {
    'use strict';
    // get element
    let btn = document.getElementById('showResults');
    // event listener
    btn.addEventListener('click', showData);
    function showData(e) {
        e.preventDefault();

        let ajax = new XMLHttpRequest();
        let table = 'products';
        let limit = 30;
        ajax.open('GET', 'controller.php?table='+table+'&limit='+limit);
        ajax.onreadystatechange = () => {
            if (ajax.status === 200 && ajax.readyState === 4 ) {
                const response = JSON.parse(ajax.responseText);
                const elements = response.map(item => {
                    return `<p>id: ${item.id} - Name: ${item.product_name} - Price: ${item.price}</p>`;
                });
                document.body.innerHTML = elements;
            }
        };
        ajax.send();
    }

})();