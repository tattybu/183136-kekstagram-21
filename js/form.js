'use strict';

(() => {
  const PHOTO_SIZE = {
    MIN: 25,
    MAX: 100
  };
  const PHOTO_SIZE_CHANGE_STEP = 25;
  const PHOTO_EFFECT_VOLUME_DEFAULT = 100;
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
  let photosize;
  let value = ``;

  const comment = document.querySelector(`.text__description`);
  const showPhotoEditForm = (element) => {
    photosize = PHOTO_SIZE.MAX;
    window.utils.showElement(element);
    document.addEventListener(`keydown`, onPhotoEditFormEscPress);
    applyPicturefilter(noEffectImage);
    photoPreviewImage.style = `transform: scale(1)`;
  };

  const hidePhotoEditForm = (element) => {
    if (!element.classList.contains(`hidden`)) {
      window.utils.hideElement(element);
      document.removeEventListener(`keydown`, onPhotoEditFormEscPress);
      uploadFile.value = ``;
    }
  };

  const onPhotoEditFormEscPress = (evt) => {
    if (evt.keyCode === ESC_KEYCODE && evt.target !== comment && evt.target !== window.validation.hashTags) {
      hidePhotoEditForm(photoEditForm);
    }
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
      window.slider.effectsIntensive(PHOTO_EFFECT_VOLUME_DEFAULT, window.slider.EFFECT_VALUES[value]);
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

  window.form = {
    hidePhotoEditForm
  };

})();

