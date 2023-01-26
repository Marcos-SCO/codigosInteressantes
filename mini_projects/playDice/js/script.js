// Jogo do Dado

let game = qSelect('#game');
game.addEventListener('click', gameStart);

function gameStart() {
    let random = Math.floor(6 * Math.random() + 1);
    let img = qSelect("#face");
    img.alt = `face${random}`;
    img.src = `img/face${random}.png`;
}