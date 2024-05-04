import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formElement = document.querySelector('.form');

const makePromise = (delay, value) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (value === 'fulfilled') {
        resolve(
          iziToast.show({
            title: '✅',
            message: `Fulfilled promise in ${delay}ms`,
            position: 'topRight',
            titleSize: '20',
            messageSize: '16',
            progressBarColor: '#ffffff',
            titleColor: '#ffffff',
            messageColor: '#ffffff',
            backgroundColor: '#59A10D',
          })
        );
      } else {
        reject(
          iziToast.show({
            title: '❌',
            message: `Rejected promise in ${delay}ms`,
            position: 'topRight',
            titleSize: '20',
            messageSize: '16',
            progressBarColor: '#ffffff',
            titleColor: '#ffffff',
            messageColor: '#ffffff',
            backgroundColor: '#EF4040',
          })
        );
      }
    }, delay);
  });
};

formElement.addEventListener('submit', event => {
  event.preventDefault();

  const form = event.target;
  const delayValue = formElement.elements.delay.value;
  const stateValue = formElement.elements.state.value;

  if (delayValue < 0) {
    iziToast.show({
      title: 'ERROR!',
      message: 'Invalid delay number',
      position: 'topRight',
      backgroundColor: '#ef4040',
      progressBarColor: '#ffffff',
      titleColor: '#ffffff',
      messageColor: '#ffffff',
    });
  } else {
    makePromise(delayValue, stateValue)
      .then(value => console.log(value))
      .catch(error => console.log(error));
  }

  form.reset();
});
