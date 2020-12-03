// function slide

function slide() {
    let bannerNum = randomNumber(3);
    let banner = qSelect('#banner');
    banner.src= `img/banner${bannerNum}.jpg`;
}

setInterval(slide,2000);