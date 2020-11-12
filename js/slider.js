'use strict';

(() => {
  const POSITION_X = {
    MIN: 0,
    MAX: 100
  };

  const initSlider = function (scale, handler, depth, action) {
    handler.addEventListener(`mousedown`, function (evt) {
      evt.preventDefault();
      let startCoordsX = evt.clientX;

      const onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        const shiftX = startCoordsX - moveEvt.clientX;
        startCoordsX = moveEvt.clientX;

        const currentCoordsX = ((handler.offsetLeft - shiftX) / scale.clientWidth) * 100;

        if (currentCoordsX <= POSITION_X.MAX && currentCoordsX >= POSITION_X.MIN) {
          handler.style.left = `${currentCoordsX}%`;
          depth.style.width = `${currentCoordsX}%`;
        }

        action(Math.round(currentCoordsX));
      };

      const onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        document.removeEventListener(`mousemove`, onMouseMove);
        document.removeEventListener(`mouseup`, onMouseUp);
      };

      document.addEventListener(`mousemove`, onMouseMove);
      document.addEventListener(`mouseup`, onMouseUp);
    });
  };

  window.slider = {
    init: initSlider
  };
})();
