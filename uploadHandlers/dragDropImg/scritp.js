// Helpers
function qSelect(selector) {
    return document.querySelector(selector);
}
function qSelectAll(selectors) {
    return document.querySelectorAll(selectors);
}
function log(...elements) {
    return console.log(elements);
}

// File upload observers variables
let filesDone = 0;
let filesToDo = 0;
let progressBar = qSelect('#progress-bar');

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
    let filesArray = Array.from(files);
    initializeProgress(filesArray.length);
    // filesArray.forEach(uploadFile);
    filesArray.forEach(previewFile);
}

function uploadFile(file) {
    let url = 'YOUR URL HERE';
    let formData = new FormData();

    formData.append('file', file);

    fetch(url, {
        method: 'POST',
        body: formData
    })
        .then(progressDone)
        // .then(() => { /* Done. Inform the user */ })
        .catch(() => { /* Error. Inform the user */ });
}

function previewFile(file) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
        let img = document.createElement('img');
        img.src = reader.result;
        qSelect('#gallery').appendChild(img);
    }
}

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