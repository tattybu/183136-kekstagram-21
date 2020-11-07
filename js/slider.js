'use strict';
(function () {
  let effects = document.querySelectorAll(`.effects__radio`);
  let imgPreview = document.querySelector(`.img-upload__preview`);
  let effectLevelValue = document.querySelector(`.effect-level__value`);

  const EFFECT_VALUE = 100;

  const EFFECT_VALUES = {
    'chrome': {
      min: 0,
      max: 1,
      template: `grayscale({value})`
    },
    'sepia': {
      min: 0,
      max: 1,
      template: `sepia({value})`
    },
    'marvin': {
      min: 0,
      max: 100,
      template: `invert({value}%)`
    },
    'phobos': {
      min: 0,
      max: 3,
      template: `blur({value}px)`
    },
    'heat': {
      min: 1,
      max: 3,
      template: `brightness({value})`
    },
  };

  let effectsIntensive = function (effect) {
    if (effect.value !== `none`) {
      let min = EFFECT_VALUES[effect.value].min;
      let max = EFFECT_VALUES[effect.value].max;
      let template = EFFECT_VALUES[effect.value].template;

      let result = min + ((max - min) / 100 * effectLevelValue.value);
      imgPreview.style = `filter: ` + template.replace(`{value}`, result);
    } else {
      imgPreview.style = null;
    }
  };

  effects.forEach(function (effect) {
    effect.addEventListener(`change`, function () {
      imgPreview.classList = null;
      imgPreview.classList.add(`img-upload__preview`);
      imgPreview.classList.add(`effects__preview--` + effect.value);
      sliderPin.style.left = sliderLine.offsetWidth + `px`;
      sliderDepth.style.width = `100%`;

      effectLevelValue.value = EFFECT_VALUE;
      effectsIntensive(effect);
    });
  });

  let sliderPin = document.querySelector(`.effect-level__pin`);
  let sliderLine = document.querySelector(`.effect-level__line`);
  let sliderDepth = document.querySelector(`.effect-level__depth`);

  sliderPin.addEventListener(`mousedown`, function (evt) {
    evt.preventDefault();
    let sliderWidth = sliderLine.offsetWidth;

    let startCoords = {
      x: evt.clientX
    };

    let onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      let shift = {
        x: startCoords.x - moveEvt.clientX
      };

      startCoords = {
        x: moveEvt.clientX
      };

      let pixelOffset = sliderPin.offsetLeft - shift.x;

      if (pixelOffset < 0 || pixelOffset > sliderWidth) {
        return;
      }

      sliderPin.style.left = pixelOffset + `px`;
      let percentOfLine = pixelOffset / sliderWidth * 100;
      let rounded = Math.round(percentOfLine);
      sliderDepth.style.width = rounded + `%`;

      effectLevelValue.value = rounded;

      let effect = document.querySelector(`input[name=effect]:checked`);
      effectsIntensive(effect);
    };

    let onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });

  window.slider = {
    EFFECT_VALUES,
    effectsIntensive,
  };
})();
