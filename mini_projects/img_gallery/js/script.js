const current = document.querySelector('#current');
const imgs = document.querySelectorAll('.imgs img');
const opacity = 0.6;

imgs[0].style.opacity = opacity;

for (let img of imgs) {
   img.addEventListener('click', imgClick);
}

function imgClick(e) {
    // reaset the opacity
    imgs.forEach(img => img.style.opacity = 1);
    // change src in img
    current.src = e.target.src;

    // add fade in class
    current.classList.add('fade-in');

    // remove fade-in class after .5 seconds
    setTimeout(() => current.classList.remove('fade-in'), 500);

    // change the opacity with const
    e.target.style.opacity = opacity;
}

