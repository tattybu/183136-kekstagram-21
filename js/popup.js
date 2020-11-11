'use strict';

(() => {
  const main = document.querySelector(`main`);
  const body = document.querySelector(`body`);
  const popupSuccess = document.querySelector(`#success`)
      .content
      .querySelector(`.success`);
  const popupError = document.querySelector(`#error`)
      .content
      .querySelector(`.error`);

  const closePopup = function () {
    let popup;
    const BlockPopupSuccess = document.querySelector(`.success`);
    const BlockPopupError = document.querySelector(`.error`);
    if (BlockPopupSuccess) {
      popup = BlockPopupSuccess;
    } else {
      popup = BlockPopupError;
    }
    popup.remove();
    body.classList.remove(`modal-open`);
    document.removeEventListener(`keydown`, onPopupEscPress);
    popup.removeEventListener(`click`, onPopupClick);
  };

  const onPopupClick = function (evt) {
    const target = evt.target;
    if (target.classList.contains(`success`) || target.classList.contains(`success__button`)
    || target.classList.contains(`error`) || target.classList.contains(`error__button`)) {
      closePopup();
    }
  };

  const onPopupEscPress = function (evt) {
    if (evt.key === window.constants.ESCAPE) {
      evt.preventDefault();
      closePopup();
    }
  };

  const showPopupSuccess = function () {
    const popupElement = popupSuccess.cloneNode(true);
    main.appendChild(popupElement);
    popupElement.addEventListener(`click`, onPopupClick);
    document.addEventListener(`keydown`, onPopupEscPress);
  };

  const showPopupError = function (errorMessage) {
    const popupElement = popupError.cloneNode(true);
    const popupTitle = popupElement.querySelector(`.error__title`);
    main.appendChild(popupElement);
    popupTitle.textContent = errorMessage;
    popupElement.addEventListener(`click`, onPopupClick);
    document.addEventListener(`keydown`, onPopupEscPress);
  };

  window.popup = {
    success: showPopupSuccess,
    error: showPopupError
  };
})();
