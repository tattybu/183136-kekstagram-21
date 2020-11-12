'use strict';

(() => {
  const HASHTAG_MAX_QUANTITY = 5;
  const HASHTAG_SYMBOLS_AMOUNT = {
    MIN: 1,
    MAX: 20
  };
  const hashTags = document.querySelector(`.text__hashtags`);
  const uploadSelectImageForm = document.querySelector(`#upload-select-image`);

  const hasDuplicates = function (item, index, array) {
    return array.indexOf(item, index + 1) >= 0;
  };

  const addHashTagsValidation = function () {
    let arrayHashTags = hashTags.value.trim().toLowerCase().split(` `);
    const re = /^#[\w\a-я]*$/;
    const errors = [];
    arrayHashTags = arrayHashTags.filter(function (item) {
      return item !== ``;
    });

    for (let hashTag of arrayHashTags) {
      if (hashTag[0] !== `#`) {
        errors.push(`Хеш-теги должны начинаться с "#"`);
      } else if (hashTag.length <= HASHTAG_SYMBOLS_AMOUNT.MIN) {
        errors.push(`Хеш-теги должны состоять хотя бы из одного символа`);
      } else if (!re.test(hashTag)) {
        errors.push(`Хэштег должен начинаться с # не может содержать спецсимволы`);
      } else if (hashTag.length > HASHTAG_SYMBOLS_AMOUNT.MAX) {
        errors.push(`Максимальная длина одного хэш-тега ${HASHTAG_SYMBOLS_AMOUNT.MAX} символов`);
      }
    }

    if (arrayHashTags.some(hasDuplicates)) {
      errors.push(`Один и тот же хэш-тег не может быть использован дважды`);
    }

    if (arrayHashTags.length > HASHTAG_MAX_QUANTITY) {
      errors.push(`Нельзя указать больше пяти хэш-тегов`);
    }

    if (errors.length) {
      hashTags.setCustomValidity(errors[0]);
      hashTags.classList.add(`error-frame`);
    } else {
      hashTags.setCustomValidity(``);
      hashTags.classList.remove(`error-frame`);
    }
    uploadSelectImageForm.reportValidity();
  };

  hashTags.addEventListener(`input`, addHashTagsValidation);
})();
