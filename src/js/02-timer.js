import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import Notiflix from 'notiflix';

const startBtn = document.querySelector('[data-start]');
const refs = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

startBtn.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const choosedDate = new Date(selectedDates).getTime();

    if (choosedDate < dateNow) {
      Notiflix.Notify.warning('Choose the date in the future');
    }
    else {
      Notiflix.Notify.success('Lets get it started ;)');
      startBtn.removeAttribute('disabled');
    }
    startBtn.addEventListener('click', onStartBtnClick);

    function onStartBtnClick(e) {
  const timer = {
    start() {
      const startTime = choosedDate;
      startBtn.setAttribute('disabled', true);
      const timerId = setInterval(() => {
        const currentTime = Date.now();
        const deltaTime = startTime - currentTime;
        if (deltaTime < 0) {
          clearInterval(timerId);
        }
        const { days, hours, minutes, seconds } = convertMs(deltaTime);
        updateTimer({ days, hours, minutes, seconds });
      }, 1000);
    },
  };
  timer.start();
}
  },
};
const timerEl = new flatpickr(document.querySelector('#datetime-picker'), options);
const dateNow = options.defaultDate.getTime();

function updateTimer({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.minutes.textContent = `${minutes}`;
  refs.seconds.textContent = `${seconds}`;
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = pad(Math.floor(ms / day));
  const hours = pad(Math.floor((ms % day) / hour));
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}










