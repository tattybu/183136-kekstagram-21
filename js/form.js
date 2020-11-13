'use strict';

(() => {
  const uploadForm = document.querySelector(`.img-upload__form`);
  const uploadFile = document.querySelector(`#upload-file`);
  const photoEditForm = document.querySelector(`.img-upload__overlay`);
  const body = document.querySelector(`body`);
  const photoEditFormClose = photoEditForm.querySelector(`#upload-cancel`);
  const textDescription = document.querySelector(`.text__description`);
  const photoPreview = document.querySelector(`.img-upload__preview`);
  const preview = photoPreview.querySelector(`img`);
  const effectLevel = document.querySelector(`.effect-level`);

  const onUploadFormEscPress = function (evt) {
    if (evt.key === window.constants.ESCAPE && textDescription !== document.activeElement) {
      evt.preventDefault();
      closeUploadForm();
    }
  };

  const onCancelClick = function () {
    closeUploadForm();
  };

  const openUploadForm = function () {
    window.uploadPicture(uploadFile, preview);
    body.classList.add(`modal-open`);
    effectLevel.classList.add(`hidden`);
    photoEditForm.classList.remove(`hidden`);
    document.addEventListener(`keydown`, onUploadFormEscPress);
    photoEditFormClose.addEventListener(`click`, onCancelClick);
  };

  const closeUploadForm = function () {
    photoEditForm.classList.add(`hidden`);
    photoEditForm.value = ``;
    preview.src = ``;
    body.classList.remove(`modal-open`);
    window.effects.reset();
    document.removeEventListener(`keydown`, onUploadFormEscPress);
    photoEditFormClose.removeEventListener(`click`, onCancelClick);
  };

  const successSend = function () {
    photoEditForm.classList.add(`hidden`);
    window.popup.success();
  };

  const hideErrorButton = function () {
    const hide = document.querySelector(`.error__button`);
    hide.classList.add(`hidden`);
  };
  const errorSend = function (errorMessage) {
    photoEditForm.classList.add(`hidden`);
    window.popup.error(errorMessage);
    hideErrorButton();
  };

  const onSubmitForm = function (evt) {
    window.backend.upload(new FormData(uploadForm), successSend, errorSend);
    evt.preventDefault();
    window.effects.reset();
    uploadForm.reset();
  };

  uploadFile.addEventListener(`change`, openUploadForm);
  uploadForm.addEventListener(`submit`, onSubmitForm);
})();
