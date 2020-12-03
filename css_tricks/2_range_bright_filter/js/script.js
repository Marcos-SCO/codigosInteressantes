// Helper 

function qSelect(item) {
    return document.querySelector(item);
}
function qSelectAll(item) {
    return document.querySelectorAll(item);
}
let body = qSelect('body');
let range = qSelect('#range');

function brightness() {
    body.style.filter = 'brightness('+ range.value + "%)";
    // document.body.style.filter = "brightness("+ range.value + "%)";
};
range.addEventListener('change', brightness, false);