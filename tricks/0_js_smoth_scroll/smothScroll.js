// Selects the element and activate the scroll behavior with scrollIntoView
function scrollTo(element) {
    document.querySelector(element).scrollIntoView({behavior: "smooth"});
}

// When #goToUp is clicked the scrollTo is activated and the view goes to that element
document.querySelector("#goToUp").addEventListener("click", (event) => {
    event.preventDefault();

    scrollTo("container");
});

// Scrolls to the end of page
document.querySelector("#goToBottom").addEventListener("click", (event) => {
    event.preventDefault();

    scrollTo("footer");
});