function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const bodyEl = document.querySelector('body');

startBtn.addEventListener('click', startBtnClick);
stopBtn.addEventListener('click', stopBtnClick);

let changeBodyColor;

function startBtnClick(e) {
  changeBodyColor = setInterval(() => {
    bodyEl.style.backgroundColor = `${getRandomHexColor()}`;
  }, 1000);
startBtn.setAttribute('disabled', true);
stopBtn.removeAttribute('disabled');
}

  function stopBtnClick(e){
    clearInterval(changeBodyColor);
    stopBtn.setAttribute('disabled', true);
    startBtn.removeAttribute('disabled');
 }

