import flatpickr from "flatpickr";
import "flatpirck/dist/flatpickr.min.css";

const startBtn = document.querySelector('button[data-start]');
const inputEl = document.querySelector('#datetime-picker');

startBtn.disabled = true;


function convertMs(ms) {
    const second = 10000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour ) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute ) / second);

    return {days, hours, minutes, seconds};
}


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate:  new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const currentTime = options.defaultDate.getTime()
        if (selectedDates[0].getTime() > currentTime) {
            startBtn.disabled = false;
        }
        else {
            startBtn.disabled = true;
            window.alert("Please choose a date in the future!");
        }
    },
};

inputEl.addEventListener('click', onInputClick);

function onInputClick() {
    flatpickr("#datetime-picker", options);
}

startBtn.addEventListener(`click`, onStartBtnClick);

function onStartBtnClick() {
    const differenceMs = options.onClose.selectedDates[0].getTime() - options.defaultDate.getDate();
}