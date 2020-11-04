'use strict';

(() => {
  const getRandomNumber = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

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

  const onModalOpenKeydown = (evt) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      hideElement();
      window.gallery.closeBigPhotoElement();
    }
  };
  window.utils = {
    getRandomNumber,
    showElement,
    hideElement,
    reshuffleArray,
    onModalOpenKeydown,
  };
})();


