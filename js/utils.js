'use strict';

(function () {
  const getRandomNumber = (min, max) => {
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  };

  const showElement = (element) => {
    if (element.classList.contains(`hidden`)) {
      element.classList.remove(`hidden`);
    }
  };

  const hideElement = (element) => {
    if (!element.classList.contains(`hidden`)) {
      element.classList.add(`hidden`);
    }
  };

  const reshuffleArray = (array) =>{
    let j;
    let temp;
    for (let i = array.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = array[j];
      array[j] = array[i];
      array[i] = temp;
    }
    return array;
  };


  window.utils = {
    getRandomNumber,
    showElement,
    hideElement,
    reshuffleArray,
  };
})();
