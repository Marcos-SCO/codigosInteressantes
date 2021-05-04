const accordion = document.querySelector('.accordion');
const items = accordion.querySelectorAll('.accordion__item');

items.forEach((item) => {
    const title = item.querySelector('.accordion__title');

    title.addEventListener('click', (e) => {
        const opened_item = accordion.querySelector('.is-open');
        
        // Toggle current item
        toggle_item(item);

        // Close earlier opened item if exists
        if (opened_item && opened_item !== item) {
            toggle_item(opened_item);
        }
    });
});

const toggle_item = (item) => {
    const accordionBody = item.querySelector('.accordion__body');
    const content = item.querySelector('.accordion__content');

    if (item.classList.contains('is-open')) {
        accordionBody.removeAttribute('style');
        item.classList.remove('is-open');
    } else {
        accordionBody.style.height = accordionBody.scrollHeight + 'px';
        item.classList.add('is-open');
    }
}

