// source: https://www.youtube.com/watch?v=cjIswDCKgu0&ab_channel=WebDevSimplified

let textEl = document.querySelector('.textEl');
let input = document.querySelector('input');

input.addEventListener('input', e => {
  updateText(e.target.value);
});

const updateText = debounce(text => {
  textEl.textContent = text;
}, 250);

function debounce(callBack, delay = 1000) {
  let timeout;

  return (...args) => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      callBack(...args);
    }, delay);
  }
}

function throttle(callback, delay = 1000) {
  let shouldWait = false;
  let waitingArgs;
  const timeOutFunc = () => {
    if (waitingArgs == null) {
      shouldWait = false;
      return;
    }

    callback(...waitingArgs);
    waitingArgs = null;

    setTimeout(timeOutFunc, delay);
  }

  return (...args) => {
    if (shouldWait) {
      waitingArgs = args;
      return;
    }

    callback(...args);
    shouldWait = true;

    setTimeout(timeOutFunc, delay);
  }
}