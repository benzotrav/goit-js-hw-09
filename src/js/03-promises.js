import Notiflix from "notiflix";

const form = document.querySelector('.form'); 
form.addEventListener('submit', onFormSubmit); 

const data = {}; 

function onFormSubmit(event) { 
  event.preventDefault(); 
  dataGrabber(event.currentTarget); 
  promiseRunner(); 
  event.currentTarget.reset();
}

function createPromise(position, delay) { 
  const shouldResolve = Math.random() > 0.3; 
 
  return new Promise((resolve, reject) => { 
    setTimeout(() => { 
      if (shouldResolve) { 
        resolve({ position, delay }); 
      } else { 
        reject({ position, delay }); 
      }
    }, delay); 
  });
}

function promiseRunner() { 
  const { delay: firstDelay, step, amount } = data; 
  let delay = firstDelay; 
  
  for (let i = 1; i <= amount; i+=1) { 
    createPromise(i, delay).then(successPromise).catch(failurePromise); 
    delay += step; 
  }
}

function dataGrabber(form) { 
  [...form.elements].forEach(({ name, value }) => (data[name] = Number(value))); 
}


function successPromise({ position, delay }) { 
    Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`); 
} 

function failurePromise({ position, delay }) { 
    Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`); 
}