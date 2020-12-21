// get elements with data type 'anima'
const dataAnimaElements = document.querySelectorAll('[data-anima]');

// Function for animation class on scroll
function animationScroll() {
    const topPageWindow = window.pageYOffset + ((window.innerHeight * 3) / 4); // 3/4 of window
    dataAnimaElements.forEach(element => {
        if (topPageWindow > element.offsetTop) {
            element.classList.add('animation');
        } else {
            element.classList.remove('animation');
        }
    });
}

// Verifies if a data-anima element exists and call function
if (element.length) {
    window.addEventListener('scroll', animaScroll);
}