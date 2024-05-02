import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const dateTimePicker = document.querySelector('#datetime-picker');
const options = {
  enableTime: true, //Вмикає засіб вибору часу
  time_24hr: true, //вмикає формат 24г.
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

const funcOfLib = flatpickr(dateTimePicker, options);
