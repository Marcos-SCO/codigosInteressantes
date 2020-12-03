function qSelect(item) { return document.querySelector(item); }
function qSelectAll(item) { return document.querySelectorAll(item); }
function log(item, item2 = '') { return console.log(item, item2); }

document.addEventListener('DOMContentLoaded', () => {
    // START HERE
    const SLIDETIME = 500;
    const backButton = qSelect('.wbn-slider-back-btn');
    const forwardButton = qSelect('.wbn-slider-next-btn');
    const allSlides = [...document.querySelectorAll('.wbn-slide')];

    let clickable = true;
    let active = null;
    let newActive = null;

    function initSlider() {
        // Set the CSS transition on the slides to the value we specified in SLIDETIME above
        allSlides.forEach(slide =>
            slide.setAttribute('style',
                `transition: transform ${SLIDETIME}ms ease;
                animation-duration: ${SLIDETIME}ms`,
            ),
        );
    }

    function changeSlide(forward) {
        if (clickable) {
            clickable = false;
            active = document.querySelector('.active');
            const activeSlideIndex = allSlides.indexOf(active);

            if (forward) {
                log('activeSlideIndex: ', activeSlideIndex);
                log('allSlides.length: ', allSlides.length);
                log('new slide: ', (activeSlideIndex + 1) % allSlides.length);

                newActive = allSlides[(activeSlideIndex + 1) % allSlides.length];
                active.classList.add('slideOutLeft');
                newActive.classList.add('slideInRight', 'active');
            } else {
                log('activeSlideIndex: ', activeSlideIndex);
                log('allSlides.length: ', allSlides.length);
                log('new slide: ', (activeSlideIndex - 1 + allSlides.length) % allSlides.length);

                newActive =
                    allSlides[
                    (activeSlideIndex - 1 + allSlides.length) % allSlides.length
                    ];
                active.classList.add('slideOutRight');
                newActive.classList.add('slideInLeft', 'active');
            }
        }
    }

    allSlides.forEach(slide => {
        slide.addEventListener('transitionend', e => {
            // Check for the old active transition and if clickable is false
            // to not trigger it more than once
            if (slide === active && !clickable) {
                clickable = true;
                // Remove all CSS animation classes on old active
                active.className = 'wbn-slide';
            }
        });
    });

    // Events Listeners
    forwardButton.addEventListener('click', () => {
        changeSlide(true);
    });
    backButton.addEventListener('click', () => {
        changeSlide(false);
    });

    // slide interval
    setInterval(() => {
        changeSlide(true);
    }, 2000);

    // Init the slides
    initSlider();
});
