window.addEventListener('load', () => {

    let newLoad = true;
    let randomImage = 0;
    let image = document.querySelector('#img');
    let preview = document.querySelector('#preview');
    let rating = document.querySelector('.rating');

    // btn new image
    let newImage = document.querySelector('#newImage');
    newImage.addEventListener('click', loadImage);

    // get Previews elements of an dom array
    function prevAll(element) {
        var result = [];

        while (element = element.previousElementSibling)
            result.push(element);
        return result;
    }

    // load image
    function loadImage() {
        let newLoad = true;

        // remove any elements from html
        rating.innerHTML = '';

        // insert 5 span in the element
        let span = '';
        for (let i = 0; i < 5; i++) {
            span += '<span></span>';
        }
        rating.innerHTML = span;

        
        let ratingSpan = document.querySelectorAll('.rating span');

        ratingSpan.forEach((rate) => {
            rate.addEventListener('mouseenter', () => {
                rate.classList.add('blank');
            });
            rate.addEventListener('mouseleave', () => {
                rate.classList.remove('blank');
            });
        })
        
        // converting node list to array
        // ratingSpan = Array.from(ratingSpan);
        
        // convert using spreed
        ratingSpan = [...ratingSpan];

        
        ratingSpan.map((rating, indexItem) => {

            rating.addEventListener('click', () => {
                if (newLoad) {
                    let index = indexItem + 1;
                    dataString = '?image=' + randomImage + '&vote=' + index;;
                    let prevSpans = prevAll(rating);
                    prevSpans.forEach(span => span.style.color = '#f00');
                    rating.style.color = '#f00';

                    //xhrPOST()
                    xhrGET('add', () => {
                        success(() => {
                            newLoad = false;
                            let rating = document.querySelector('.rating');
                            rating.insertAdjacentHTML('beforeend', 'Thanks');
                            console.log(JSON.parse(xhr.responseText));
                        });
                    }, dataString);
                }
            });

        })

        // Ajax call
        // ajaxCall("POST", "server.php", true);
        xhrPOST('server', () => {
            success(() => {
                let img = JSON.parse(xhr.responseText);
                randomImage = img.id;
                image.src = img.image;
                preview.innerHTML = `Total - Votes ${img.votes} Average: ${img.average}`;
            });
        });
    }

});