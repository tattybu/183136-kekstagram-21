'use strict';

(() => {
  const hashTags = document.querySelector(`.text__hashtags`);
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

  window.validation = {
    hashTags
  };

})();
