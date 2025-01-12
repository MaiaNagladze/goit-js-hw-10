'use strict';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');
form.addEventListener('submit', (event) => {
    event.preventDefault();

const delayInput = form.elements.delay.value;
const stateInput = form.elements.state.value;
const delay = Number(delayInput);
const shouldResolve = stateInput === 'fulfilled';

const makePromise = (delay, shouldResolve) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldResolve) {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay);
    });
};

makePromise(delay, shouldResolve)
    .then((delay) => {
        iziToast.success({
            title: 'Success',
            message: `✅ Fulfilled promise in ${delay}ms`,
            position: 'topRight',
    });
})
    .catch((delay) => {
        iziToast.error({
            title: 'Error',
            message: `❌ Rejected promise in ${delay}ms`,
            position: 'topRight',
    });
}); 
});
  