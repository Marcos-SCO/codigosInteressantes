const imgs = document.querySelectorAll('img');

const imgOptions = {};
const imgObserver = new IntersectionObserver((entries, imgObserver) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const img = entry.target;
        img.src = img.src.replace('w=10&', 'w=800&');
        imgObserver.unobserve(entry.target);
    });
}, imgOptions);

imgs.forEach((img) => {
    imgObserver.observe(img);
});
