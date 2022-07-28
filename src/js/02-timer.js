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
  },
};
const timerEl = new flatpickr(document.querySelector('#datetime-picker'), options);
const dateNow = options.defaultDate.getTime();




