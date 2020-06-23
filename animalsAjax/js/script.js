// const pets = [
//     {
//         "name": "Meowsalot",
//         "species": "cat",
//         "favFood": "tuna"
//     },
//     {
//         "name": "Barky",
//         "species": "dog",
//         "favFood": "carrots"
//     },
//     {
//         "name": "Spiky",
//         "species": "dog",
//         "favFood": "carrots"
//     }
// ];

const btn = document.getElementById('btn');
const animalInfo = document.getElementById('animal-info');
let pageCounter = 1;

btn.addEventListener('click', getAnimalData);

function getAnimalData() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://learnwebcode.github.io/json-example/animals-${pageCounter}.json`, true);
    xhr.onload = () => {
        if (xhr.status === 200 && xhr.readyState == 4) {
            let result = JSON.parse(xhr.responseText);
            const animals = result.map((animal) => {
                return `<li>${animal.name} - ${animal.species}</li>`;
            }).join(' ');
            renderHTML(animals);
        }
    }
    xhr.send();
    pageCounter++;
    (pageCounter > 3) ? btn.classList.add('hide-me') : '';
}

function renderHTML(data) {
    animalInfo.insertAdjacentHTML('beforeend', data);
}