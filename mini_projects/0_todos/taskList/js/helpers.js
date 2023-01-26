// query selector
function qSelect(item) {
    return document.querySelector(item);
}
// query selector all
function qSelectAll(item) {
    return document.querySelectorAll(item);
}
// console log
function log(item, item2 = '') {
    if (item2 != '') {
       return console.log(item, item2, '\n');
    }
    return console.log(item);
}

export {qSelect, qSelectAll, log};