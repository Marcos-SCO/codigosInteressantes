let navigation = document.querySelector('.navigation');
let navLinks = document.querySelectorAll('.nav-area ul li a');
let menuToggle = document.querySelector('.menu-toggle');

navLinks.forEach(link => {
    link.addEventListener('click', e => {
        changeImg('img/' + e.target.getAttribute('data-img'));
    });
});

function changeImg(img) {
    document.getElementById('source-set').srcset = img;
    document.getElementById('img-slider').src = img;
}

menuToggle.onclick = toggleMenu;
function toggleMenu() {
    menuToggle.classList.toggle('active');
    navigation.classList.toggle('active');
}