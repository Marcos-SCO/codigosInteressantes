function scrollToElement(e) {
    document.querySelector(e).scrollIntoView({ behavior: "smooth" });
}

function scrollFunc() {
    let sections = document.querySelectorAll('.section');

    sections.forEach(item => {
        if (item.offsetTop <= window.pageYOffset + 100) {
            document.querySelector('.active').classList.remove('active');

            document.querySelector(`.${item.getAttribute('data-section')}`).classList.add('active');
        }
    });
}

window.addEventListener('scroll', scrollFunc);
window.addEventListener('resize', scrollFunc);