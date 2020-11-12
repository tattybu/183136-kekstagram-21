'use strict';

(() => {
  const DEFAULT_EFFECT_VALUE = {
    MIN: 0,
    MAX: 100
  };

  const MAX_FILTER_VALUE = {
    chrome: 1,
    sepia: 1,
    marvin: 100,
    phobos: 3,
    heat: 3
  };
  const DEFAULT_SCALE_VALUE = {
    MIN: 25,
    MAX: 100
  };
  const SCALE_STEP = 25;
  const imgUploadPreview = document.querySelector(`.img-upload__preview`);
  const effectContainer = document.querySelector(`.effects`);
  const imgUploadEffectLevel = document.querySelector(`.img-upload__effect-level`);
  const effectLevelDepth = imgUploadEffectLevel.querySelector(`.effect-level__depth`);
  const effectLevelPin = imgUploadEffectLevel.querySelector(`.effect-level__pin`);
  const effectLevelValue = imgUploadEffectLevel.querySelector(`.effect-level__value`);
  const effectLevelLine = imgUploadEffectLevel.querySelector(`.effect-level__line`);
  let currentFilter = null;
  const scale = document.querySelector(`.scale`);
  const scaleControlValue = document.querySelector(`.scale__control--value`);
  let currentScaleValue = DEFAULT_SCALE_VALUE.MAX;
  scaleControlValue.value = `${DEFAULT_SCALE_VALUE.MAX}%`;

  const reduceScale = function () {
    if (currentScaleValue > DEFAULT_SCALE_VALUE.MIN && currentScaleValue <= DEFAULT_SCALE_VALUE.MAX) {
      currentScaleValue -= SCALE_STEP;
      scaleControlValue.value = `${currentScaleValue}%`;
      imgUploadPreview.style.transform = `scale(${currentScaleValue / 100})`;
    }
  };

  const raiseScale = function () {
    if (currentScaleValue >= DEFAULT_SCALE_VALUE.MIN && currentScaleValue < DEFAULT_SCALE_VALUE.MAX) {
      currentScaleValue += SCALE_STEP;
      scaleControlValue.value = `${currentScaleValue}%`;
      imgUploadPreview.style.transform = `scale(${currentScaleValue / 100})`;
    }
  };

  const onScaleControlChange = function (evt) {
    if (evt.target.closest(`.scale__control--smaller`)) {
      reduceScale();
    }
    if (evt.target.closest(`.scale__control--bigger`)) {
      raiseScale();
    }
  };

  scale.addEventListener(`click`, onScaleControlChange);

  const filterMap = {
    chrome(value) {
      return `grayscale(${value.toFixed(1)})`;
    },
    sepia(value) {
      return `sepia(${value.toFixed(1)})`;
    },
    marvin(value) {
      return `invert(${value.toFixed(1)}%)`;
    },
    phobos(value) {
      return `blur(${value.toFixed(1)}px)`;
    },
    heat(value) {
      return `brightness(${value.toFixed(1)})`;
    }
  };

  const changeEffect = function (currentCoord) {
    const value = (MAX_FILTER_VALUE[currentFilter] * currentCoord) / 100;
    imgUploadPreview.style.filter = filterMap[currentFilter](value);
    effectLevelValue.value = currentCoord;
  };

  window.slider.init(effectLevelLine, effectLevelPin, effectLevelDepth, changeEffect);

  const resetEffects = function () {
    imgUploadEffectLevel.classList.add(`hidden`);
    imgUploadPreview.style.filter = ``;
    effectLevelValue.value = DEFAULT_EFFECT_VALUE.MAX;
    imgUploadPreview.style.transform = `scale(1)`;
    scaleControlValue.value = `${DEFAULT_SCALE_VALUE.MAX}%`;
  };

  const onEffectChange = function (evt) {
    const target = evt.target;
    resetEffects();
    if (target.value === `none`) {
      effectLevelValue.value = DEFAULT_EFFECT_VALUE.MIN;
      imgUploadEffectLevel.classList.add(`hidden`);
    } else {
      currentFilter = target.value;
      imgUploadEffectLevel.classList.remove(`hidden`);
      effectLevelPin.style.left = `${DEFAULT_EFFECT_VALUE.MAX}%`;
      effectLevelDepth.style.width = `${DEFAULT_EFFECT_VALUE.MAX}%`;
      effectLevelValue.value = DEFAULT_EFFECT_VALUE.MAX;
      imgUploadPreview.style.filter = filterMap[currentFilter](MAX_FILTER_VALUE[currentFilter]);
    }
  };

  effectContainer.addEventListener(`change`, onEffectChange);

  window.effects = {
    reset: resetEffects
  };
})();
