'use strict';

(() => {
  const PHOTO_SIZE = {
    MIN: 25,
    MAX: 100
  };
  const PHOTO_SIZE_CHANGE_STEP = 25;
  const PHOTO_EFFECT_VOLUME_DEFAULT = 100;
  const PERCENT_MAX = 100;
  const ESC_KEYCODE = 27;
  const uploadFile = document.querySelector(`#upload-file`);
  const photoEditForm = document.querySelector(`.img-upload__overlay`);
  const photoEditFormClose = photoEditForm.querySelector(`#upload-cancel`);
  const photoPreview = document.querySelector(`.img-upload__preview`);
  const photoPreviewImage = photoPreview.getElementsByTagName(`img`)[0];
  const photoChangeSize = document.querySelector(`.img-upload__scale`);
  const photoSizeValue = photoChangeSize.querySelector(`.scale__control--value`);
  const imageUploadEffects = document.querySelector(`.effects__list`);
  const noEffectImage = imageUploadEffects.children[0].children[0];
  const imageUploadEffectsLevel = document.querySelector(`.img-upload__effect-level`);
  const imageEffectLevelValue = imageUploadEffectsLevel.querySelector(`.effect-level__value`);
  const imageEffectLine = imageUploadEffectsLevel.querySelector(`.effect-level__line`);
  const imageEffectPin = imageUploadEffectsLevel.querySelector(`.effect-level__pin`);
  const imageEffectDepth = imageUploadEffectsLevel.querySelector(`.effect-level__depth`);
  let photosize;
  const effects = {
    chrome: [`grayscale`, 0, 1, ``],
    sepia: [`sepia`, 0, 1, ``],
    marvin: [`invert`, 0, 100, `%`],
    phobos: [`blur`, 0, 3, `px`],
    heat: [`brightness`, 1, 3, ``]
  };
  let value = ``;

  const comment = document.querySelector(`.text__description`);
  const hashTags = document.querySelector(`.text__hashtags`);

  const showPhotoEditForm = (element) => {
    photosize = PHOTO_SIZE.MAX;
    window.utils.showElement(element);
    document.addEventListener(`keydown`, onPhotoEditFormEscPress);
    applyPicturefilter(noEffectImage);
    photoPreviewImage.style = `transform: scale(1)`;
  };

  const hidePhotoEditForm = (element) =>{
    if (!element.classList.contains(`hidden`)) {
      window.utils.hideElement(element);
      document.removeEventListener(`keydown`, onPhotoEditFormEscPress);
      uploadFile.value = ``;
    }
  };

  const onPhotoEditFormEscPress = (evt) => {
    if (evt.keyCode === ESC_KEYCODE && evt.target !== comment && evt.target !== hashTags) {
      hidePhotoEditForm(photoEditForm);
    }
  };

  const addHashTagsValidation = () => {
    const hashTagsData = hashTags.value.trim().split(/\s+/gi);
    let message = ``;

    if (hashTagsData.length > 5) {
      message = `Нельзя указать больше пяти хэш-тегов`;

    } else {
      for (let i = 0; i < hashTagsData.length; i++) {
        message = hashtagValidation(hashTagsData, i);
        if (message) {
          break;
        }
      }
    }

    hashTags.setCustomValidity(message);

  };

  hashTags.addEventListener(`input`, () => {
    addHashTagsValidation();
  });

  const hashtagValidation = (hashTagsData, i) => {
    let message = ``;
    if (hashTagsData[i].charAt(0) !== `#`) {
      message = `Хеш-теги должны начинаться с "#"`;

    } else if (hashTagsData[i].length === 1) {
      message = `Хеш-теги должны состоять хотя бы из одного символа`;

    } else if (hashTagsData[i].indexOf(`#`, 1) > 0) {
      message = `Хеш-теги должны разделяться пробелами`;

    } else if (hashTagsData.indexOf(hashTagsData[i], i + 1) > 0) {
      message = `Один и тот же хэш-тег не может быть использован дважды`;

    } else if (hashTagsData[i].length > 20) {
      message = `Максимальная длина одного хэш-тега - 20 символов`;
    }
    return message;
  };


  const changeSizePhotoPreview = (button) => {
    if (button.target.classList.contains(`scale__control--bigger`) && photosize < PHOTO_SIZE.MAX) {
      photosize += PHOTO_SIZE_CHANGE_STEP;
    } else if ((button.target.classList.contains(`scale__control--smaller`) && photosize > PHOTO_SIZE.MIN)) {
      photosize -= PHOTO_SIZE_CHANGE_STEP;
    }
    photoSizeValue.value = `` + photosize;
    photoPreviewImage.style = `transform: scale(` + (photosize / 100) + `)`;
  };

  const applyPicturefilter = (element) => {
    value = element.value;

    photoPreview.classList = `img-upload__preview`;
    photoPreview.classList.add(`effects__preview--` + value);

    if (value === `none`) {
      window.utils.hideElement(imageUploadEffectsLevel);
      photoPreview.style = ``;
    } else {
      window.utils.showElement(imageUploadEffectsLevel);
      addEffectLevelValue(PHOTO_EFFECT_VOLUME_DEFAULT, effects[value]);
    }
  };

  const addEffectLevelValue = (percent, effect) => {
    imageEffectPin.style.left = percent + `%`;
    imageEffectDepth.style.width = percent + `%`;
    let valuePercent = (effect[2] - effect[1]) / PHOTO_EFFECT_VOLUME_DEFAULT * percent;
    let valueInput = effect[1] + valuePercent;
    imageEffectLevelValue.textContent = valueInput.toFixed(2);
    photoPreview.style = `filter: ` + effect[0] + `(` + valueInput.toFixed(2) + effect[3] + `)`;
  };

  const getEffectValue = (percent) => {
    if (percent >= 0 && percent <= PERCENT_MAX) {
      addEffectLevelValue(percent, effects[value]);
    }
  };

  uploadFile.addEventListener(`change`, () => {
    showPhotoEditForm(photoEditForm);
  });

  photoEditFormClose.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    hidePhotoEditForm(photoEditForm);
  });

  photoChangeSize.addEventListener(`click`, changeSizePhotoPreview);

  imageUploadEffects.addEventListener(`change`, (evt) => {
    applyPicturefilter(evt.target);
  });

  imageEffectPin.addEventListener(`mousedown`, (evt) => {
    evt.preventDefault();

    let startCoords = evt.clientX;

    let onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();

      let lineWidth = imageEffectLine.clientWidth;
      let shift = startCoords - moveEvt.clientX;

      startCoords = moveEvt.clientX;

      getEffectValue((imageEffectPin.offsetLeft - shift) * 100 / lineWidth);
    };

    const onMouseUp = (upEvt) => {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });

  window.form = {
    hidePhotoEditForm,
  };

})();

