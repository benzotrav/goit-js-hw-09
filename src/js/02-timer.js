import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css" 
import { Notify } from 'notiflix/build/notiflix-notify-aio';

class Timer { 
  constructor({ selector, date }) { 
    this.selector = document.querySelector(selector); 
    this.date = date.getTime(); 
    this.intervalId = null; 
    this.getRefs(); 
  }

  start() {
    this.intervalId = setInterval(() => { 
      if (this.date < Date.now()) { ы
        clearInterval(this.intervalId); 
        Notify.success('Time elapsed!'); 
        return; 
      }
      this.updateTime(); 
    }, 1000); 
  }

  getRefs() { 
    this.refs = { 
      days: this.selector.querySelector('[data-days]'), 
      hours: this.selector.querySelector('[data-hours]'), 
      minutes: this.selector.querySelector('[data-minutes]'), 
      seconds: this.selector.querySelector('[data-seconds]'),
    };
  }
  updateTime() { 
    const { days, hours, minutes, seconds } = this.convertMs(this.date - Date.now()); 
    this.refs.days.textContent = this.addLeadingZero(days); 
    this.refs.hours.textContent =  this.addLeadingZero(hours);
    this.refs.minutes.textContent =  this.addLeadingZero(minutes);
    this.refs.seconds.textContent =  this.addLeadingZero(seconds); 
  }

  addLeadingZero(value) { 
    return String(value).padStart(2, '0'); 
  }

  convertMs(ms) { 
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
}

const dateSelect = document.querySelector('#datetime-picker'); 
const startBtn = document.querySelector('[data-start]'); 

  startBtn.addEventListener('click', startClickHandler); 

    flatpickr('#datetime-picker', { 
  enableTime: true, 
  time_24hr: true, 
  defaultDate: new Date(), 
  minuteIncrement: 1, 
  onClose(selectedDates) { 
    dateCheck(selectedDates[0]); 
  }
});

function startClickHandler() { 
  const timer = new Timer({ selector: '.timer', date: new Date (dateSelect.value) }); 
  timer.start.call(timer); 
  startBtn.disabled = true; 
}

function dateCheck(date) { 
  if (date.getTime() > Date.now()) { 
    startBtn.disabled = false; 
    return; 
  }
  startBtn.disabled = true; 
  Notify.failure('Choose another date');
}