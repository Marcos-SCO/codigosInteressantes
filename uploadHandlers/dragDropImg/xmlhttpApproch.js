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
let uploadProgress = [];

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
    filesArray.forEach(uploadFile);
    filesArray.forEach(previewFile);
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
    uploadProgress = [];

    for (let i = numFiles; i > 0; i--) {
        uploadProgress.push(0);
    }
}

function updateProgress(fileNumber, percent) {
    uploadProgress[fileNumber] = percent;
    let addToTotal = uploadProgress.reduce((tot, curr) => tot + curr, 0);
    let total = addToTotal / uploadProgress.length;
    progressBar.value = total;
}


// XMLHttpRequest approach
function uploadFile(file, i) { // <- Add `i` parameter
    var url = 'YOUR URL HERE';
    var xhr = new XMLHttpRequest();
    var formData = new FormData();
    xhr.open('POST', url, true);

    // Add following event listener
    xhr.upload.addEventListener("progress", function (e) {
        updateProgress(i, (e.loaded * 100.0 / e.total) || 100);
    });

    xhr.addEventListener('readystatechange', function (e) {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // Done. Inform the user
        }
        else if (xhr.readyState == 4 && xhr.status != 200) {
            // Error. Inform the user
        }
    });

    formData.append('file', file);
    // xhr.send(formData);
}