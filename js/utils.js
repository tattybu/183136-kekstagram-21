'use strict';

window.utils = (function () {
  return {
    showElement(element) {
      if (element.classList.contains(`hidden`)) {
        element.classList.remove(`hidden`);
      }
    },

    hideElement(element) {
      if (!element.classList.contains(`hidden`)) {
        element.classList.add(`hidden`);
      }
    },

    reshuffleArray(array) {
      let j;
      let temp;
      for (let i = array.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = array[j];
        array[j] = array[i];
        array[i] = temp;
      }
      return array;
    },
  };
})();
