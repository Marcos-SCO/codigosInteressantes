// Helpers
function qSelect(selector) {
    return document.querySelector(selector);
}
function qSelectAll(selectors) {
    return document.querySelectorAll(selectors);
}
function log(elements) {
    return console.log(...elements);
}

// File upload observers variables
let filesDone = 0;
let filesToDo = 0;
let progressBar = qSelect('#progress-bar');

let filesArray = [];

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

let dropArea = qSelect('#drop-area');

['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, highlight, false);
});

['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, unhighlight, false)
});

function highlight(e) {
    preventDefaults(e);
    dropArea.classList.add('highlight');
}

function unhighlight(e) {
    preventDefaults(e);
    dropArea.classList.remove('highlight');
}

// Handle drop
dropArea.addEventListener('drop', handleDrop, false);
function handleDrop(e) {
    let dt = e.dataTransfer;
    let files = dt.files;
    handleFiles(files);
}

// Convert FileList to array
function handleFiles(files) {
    // console.log(files);
    let isArray = Array.isArray(files);
    let newFiles = isArray ? files : Array.from(files);
    filesArray = newFiles;
    console.log(filesArray)
    qSelect('#gallery').innerHTML = '';
    initializeProgress(filesArray.length);
    filesArray.forEach(previewFile);
    filesArray.forEach(uploadFile);
}

function previewFile(file) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
        let img = document.createElement('img');
        let imgName = file.name;
        img.setAttribute('data-img-name', imgName);
        img.src = reader.result;
        qSelect('#gallery').appendChild(img);
    }
}

qSelect('#gallery').addEventListener('click', e => {
    e.preventDefault();
    let targetElement = e.target;
    let isClickedImg = targetElement.hasAttribute('data-img-name');
    if (!isClickedImg) return;
    let clickedImgName = targetElement.getAttribute('data-img-name');

    let newFilesArray = filesArray.filter(file => file.name != clickedImgName);
    // console.log(newFilesArray);
    filesArray = newFilesArray;
    targetElement.remove();
    console.log(filesArray);
    // handleFiles(newFilesArray)
});
// File upload observers

function initializeProgress(numFiles) {
    progressBar.value = 0;
    filesDone = 0;
    filesToDo = numFiles;
}

function progressDone() {
    filesDone++;
    let progressPercentage = filesDone / filesToDo * 100;
    progressBar.value = progressPercentage;
}

function uploadFile(file) {
    let url = 'YOUR URL HERE';
    formData = new FormData();
    formData.append('file', file);
    // console.log(formData.file);

    progressDone();
    /*fetch(url, {
        method: 'POST',
        body: formData
    })
        .then(progressDone)
        // .then(() => { //Done. Inform the user  })
        .catch(() => { //Error. Inform the user });*/
}

// setInterval(() => console.log(formData), 10000);