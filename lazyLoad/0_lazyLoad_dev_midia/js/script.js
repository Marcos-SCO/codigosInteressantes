let loadImages;
const imgs = document.querySelectorAll('.lazy-img img');
const lazyImgs = document.querySelectorAll('.lazy-img');

// DOMContentLoaded is "Ready" in jQuery
document.addEventListener('DOMContentLoaded', () => {
    imgs.forEach(img => {
        img.addEventListener('load', () => {
            img.classList.add('loaded');
        });
    })

    document.addEventListener('scroll', () => {
        loadImages();
    });

    (loadImages = function loadImages() {
        lazyImgs.forEach(lazyImg => {
            // Get image children element
            const image = lazyImg.children[0];

            if (isOnScreen(lazyImg)) {
                const url = image.getAttribute('data-url');

                if (image.src != url) {
                    image.src = url;
                }
            }
        });
    })();
});

function isOnScreen(e) {
    const screenTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const screenBottom = screenTop + window.innerHeight;

    const elementTop = e.offsetTop;
    const elementBottom = elementTop + e.offsetHeight;

    return elementBottom > screenTop && elementTop < screenBottom;
}