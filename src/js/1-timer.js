import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate;

const dateTimePicker = document.querySelector('input[type="text"]');
const btnStartTimer = document.querySelector('button[data-start]');

const daysCounter = document.querySelector('.value[data-days]');
const hoursCounter = document.querySelector('.value[data-hours]');
const minutesCounter = document.querySelector('.value[data-minutes]');
const secondsCounter = document.querySelector('.value[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];

    if (
      userSelectedDate.getTime() === Date.now() ||
      userSelectedDate.getTime() < Date.now()
    ) {
      iziToast.warning({
        message: 'Please choose a date in the future',
        closeOnEscape: 'true',
        closeOnClick: 'true',
        position: 'topRight',
        titleSize: '20',
        messageSize: '16',
        progressBarColor: '#ffffff',
        messageColor: '#000000',
        backgroundColor: 'orange',
      });

      btnStartTimer.setAttribute('disabled', '');
    } else {
      btnStartTimer.removeAttribute('disabled');
    }
  },
};

flatpickr(dateTimePicker, options);

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

function addLeadingZero(dataValueObj) {
  for (const key in dataValueObj) {
    dataValueObj[key] = dataValueObj[key].toString().padStart(2, '0');
  }
  return dataValueObj;
}

function handler(e) {
  dateTimePicker.setAttribute('disabled', '');
  btnStartTimer.setAttribute('disabled', '');

  const timerId = setInterval(() => createTimer(), 1000);

  function createTimer() {
    let time = userSelectedDate.getTime() - Date.now();

    if (time < 0) {
      clearInterval(timerId);
      dateTimePicker.removeAttribute('disabled');
      return;
    }

    const timerObj = addLeadingZero(convertMs(time));
    const { days, hours, minutes, seconds } = timerObj;

    daysCounter.textContent = days;
    hoursCounter.textContent = hours;
    minutesCounter.textContent = minutes;
    secondsCounter.textContent = seconds;
  }
}

btnStartTimer.addEventListener('click', handler);
