let xhr = new XMLHttpRequest;

function xhrGET(url, callback, parameters = '') {
    xhr.onreadystatechange = callback;

    xhr.open('GET', url + '.php' + parameters, true);

    xhr.send();
}

function xhrPOST(url, callback, parameters = '') {
    xhr.onreadystatechange = callback;

    xhr.open('POST', url + '.php' + parameters, true);

    xhr.send(parameters);
}

function beforeSend(callback) {
    if (xhr.readyState < 4) {
        callback();
    }
}

function success(callback) {
    if (xhr.readyState === 4 && xhr.status === 200) {
        callback();
    }
}

function error(callback) {
    xhr.onerror = callback;
}