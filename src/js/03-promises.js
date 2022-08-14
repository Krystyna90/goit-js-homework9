import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('input[name = "delay"]'),
  step: document.querySelector('input[name = "step"]'),
  amount: document.querySelector('input[name ="amount"]'),
  promiseBtn: document.querySelector('button'),
}

refs.form.addEventListener('submit', onCreatePromiseBtnClick);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      }
      else {
        reject({ position, delay });
      }
    }, delay);
  })
}

function onCreatePromiseBtnClick(e) {
  e.preventDefault();
  const amount = Number(refs.amount.value);
  let delayValue = Number(refs.delay.value);
  const step = Number(refs.step.value);
  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delayValue)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.warning(`Rejected promise ${position} in ${delay}ms`);
      });
    delayValue += step;
  }
}


