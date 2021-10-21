const progressBar = document.querySelector('[data-js="progress-bar"]');
const section = document.querySelector('section');

const animateProgressBar = () => {
  let clientHeight = document.documentElement.clientHeight;
  let { top, height } = section.getBoundingClientRect();
  let progressWidth =
    (top / (height - clientHeight)) * 100;
  let value = -Math.floor(progressWidth);
  
  return value > 0 ?
    progressBar.style.width = value + '%' :
    progressBar.style.width = '0%';
}

document.addEventListener('scroll', animateProgressBar);