import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const startBtn = document.querySelector('[data-start]');

startBtn.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const choosedDate = new Date(selectedDates).getTime();

    if (choosedDate < dateNow) {
      alert('Choose date in the future');
    }
    else {
      startBtn.removeAttribute('disabled');
    }
    startBtn.addEventListener('click', onStartBtnClick);

function onStartBtnClick(e) {
  const timer = {
    start() {
      const startTime = choosedDate;

      setInterval(() => {
        const currentTime = Date.now();
        const deltaTime = startTime - currentTime;
        const timeComponents = convertMs(deltaTime);
        console.log(timeComponents);
      }, 1000);
    },
  };
  timer.start();
}

  },
};
const timerEl = new flatpickr(document.querySelector('#datetime-picker'), options);
const dateNow = options.defaultDate.getTime();


function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}








