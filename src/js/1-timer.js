'use strict';
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const btnStart = document.querySelector('button[data-start]');
const datetimeInput = document.querySelector('#datetime-picker');
const timerFields = {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
};

let selectedDate = null;
let countdownInterval = null;
btnStart.disabled = true;

flatpickr("#datetime-picker", {
        enableTime: true,
        time_24hr: true,
        defaultDate: new Date(),
        minuteIncrement: 1,
        onClose(selectedDates) {
            const now = new Date();
            selectedDate = selectedDates[0];

            if (selectedDate <= now) {
                btnStart.disabled = true;
                iziToast.error({
                    title: "Error",
                    message: "Please choose a date in the future",
                    position: 'topRight',
                });
            } else {
                btnStart.disabled = false;
            }
        },
});

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

function updateTimerInterface(days, hours, minutes, seconds) {
    timerFields.days.textContent = String(days).padStart(2, "0");
    timerFields.hours.textContent = String(hours).padStart(2, "0");
    timerFields.minutes.textContent = String(minutes).padStart(2, "0");
    timerFields.seconds.textContent = String(seconds).padStart(2, "0");
}

btnStart.addEventListener('click', () => {
    btnStart.disabled = true;
    datetimeInput.disabled = true;

    countdownInterval = setInterval(() => {
        const now = new Date();
        const timeRemaining = selectedDate - now;

        if (timeRemaining <= 0) {
            clearInterval(countdownInterval);
            updateTimerInterface(0, 0, 0, 0);
            datetimeInput.disabled = false;
            return;
        }

        const { days, hours, minutes, seconds } = convertMs(timeRemaining);
        updateTimerInterface(days, hours, minutes, seconds);
    }, 1000);
});