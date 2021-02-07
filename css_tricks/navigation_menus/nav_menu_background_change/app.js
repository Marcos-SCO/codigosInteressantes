let navLinks = document.querySelectorAll('.nav-area ul li a');

navLinks.forEach(link => {
    link.addEventListener('click', e => {
        changeImg('img/' + e.target.getAttribute('data-img'));
    });
});

function changeImg(img) {
    document.getElementById('source-set').srcset = img;
    document.getElementById('img-slider').src = img;
}