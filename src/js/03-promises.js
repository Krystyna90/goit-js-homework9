import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('input[name = "delay"]'),
  step: document.querySelector('input[name = "step"]'),
  amount: document.querySelector('input[name ="amount"]'),
promiseBtn:document.querySelector('button'),
}

refs.form.addEventListener('submit', onCreatePromiseBtnClick);

let promisesCounter = 0;

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      promisesCounter += 1;
    if (shouldResolve) {
      resolve(' Promise fulfilled successfuly');
    }
    else {
      reject(' Promise is rejected');
    }
  }, delay);
  })
}

function onCreatePromiseBtnClick(e) {
  e.preventDefault();
  const positionValue = refs.amount.value;
  const delayValue = refs.delay.value;
  const stepValue = refs.step.value;
   const promiseInterval = setInterval(() => {
     createPromise(positionValue, delayValue).then(({ position, delay }) => {
       position = promisesCounter;
       if (position >= positionValue) {

         clearInterval(promiseInterval);
      }
      delay = delayValue;
      Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
     })
      .catch(({ position, delay }) => {
        position = promisesCounter;
        if (position >= positionValue) clearInterval(promiseInterval);
        delay = delayValue;
        Notiflix.Notify.warning(`Rejected promise ${position} in ${delay}ms`);
      });
   }, stepValue);
}

