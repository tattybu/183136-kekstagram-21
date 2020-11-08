'use strict';

(() => {
  const hashTags = document.querySelector(`.text__hashtags`);
  const HASHTAG_SYMBOLS_AMOUNT = {
    MIN: 1,
    MAX: 20
  };
  const HASHTAG_MAX_QUANTITY = 5;
  const HASHTAG_REPEAT = 0;
  const HASHTAG_WHITESPACE = 0;

  const addHashTagsValidation = () => {
    const hashTagsData = hashTags.value.trim().split(/\s+/gi);
    let message = ``;

    if (hashTagsData.length > HASHTAG_MAX_QUANTITY) {
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

    } else if (hashTagsData[i].length === HASHTAG_SYMBOLS_AMOUNT.MIN) {
      message = `Хеш-теги должны состоять хотя бы из одного символа`;

    } else if (hashTagsData[i].indexOf(`#`, 1) > HASHTAG_WHITESPACE) {
      message = `Хеш-теги должны разделяться пробелами`;

    } else if (hashTagsData.indexOf(hashTagsData[i], i + 1) > HASHTAG_REPEAT) {
      message = `Один и тот же хэш-тег не может быть использован дважды`;

    } else if (hashTagsData[i].length > HASHTAG_SYMBOLS_AMOUNT.MAX) {
      message = `Максимальная длина одного хэш-тега - 20 символов`;
    }
    return message;
  };

  window.validation = {
    hashTags
  };

})();


