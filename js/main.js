'use strict';

const PHOTOS_AMOUNT = 25; // Количество фотографий
const AUTHOR_NAMES = [
  `Евлампий`,
  `Шурочка`,
  `Настя`,
  `Толян`,
  `Ирка`,
  `Никифор`
]; // Имена авторов

const COMMENTS = [
  `Всё отлично!`,
  `В целом всё неплохо. Но не всё.`,
  `Мега фото! Просто обалдеть. Как вам так удалось?`,
  `Да это фоташоп!!!!!!!!`,
  `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
  `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`
];
// Примеры комментариев

const DESCRIPTIONS = [
  `Тестим новую камеру! =)`,
  `Затусили с друзьями на море`,
  `Как же круто тут кормят`,
  `Отдыхаем...`,
  `Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......`,
  `Вот это тачка!`
];

// Минимальный и максимальный номер аватарки из папки img
const AVATAR_LIMITS = {
  MIN: 1,
  MAX: 6
};

// Минимальное и максимальное количество комментариев к фото
const NUMBER_OF_COMMENTS = {
  MIN: 1,
  MAX: 5
};

// Минимальное и максимальное количество лайков к фото
const NUMBER_OF_LIKES = {
  MIN: 15,
  MAX: 200
};

let photos = []; // Массив объектов с ссылкой, лайками и комментами к фотографиии

const photoListElement = document.querySelector(`.pictures`); // Находим тег, внутрь которого будем вставлять данные из template'а
const userPictureTemplate = document.querySelector(`#picture`).content.querySelector(`.picture`); // Находим нужный шаблон
const fragment = document.createDocumentFragment(); // Создаем documentFragment

const getRandomNumber = function (min, max) { // Функция для получения случайного целого числа в диапазоне от мин. до макс., включая эти значения
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const reshuffleArray = function (array) { // Для избежания дублирования фотографий
  let j;
  let temp;
  for (let i = array.length - 1; i > 0; i--) { // Перемешиваем массив
    j = Math.floor(Math.random() * (i + 1));
    temp = array[j];
    array[j] = array[i];
    array[i] = temp;
  }
  return array;
};

const getRandomElement = function (array) { // Функция выбора случайного элемента из входного массива
  return array[getRandomNumber(0, array.length - 1)];
};


const createComments = function (amountOfComment) {
  let array = [];
  while (array.length < amountOfComment) {
    const avatar = `img/avatar-` + getRandomNumber(AVATAR_LIMITS.MIN, AVATAR_LIMITS.MAX) + `.svg`;
    // eslint-disable-next-line no-shadow
    const item = array.find((item) => item.avatar === avatar);

    if (!item) {
      let commentOptions = {
        avatar,
        message: getRandomElement(COMMENTS),
        name: getRandomElement(AUTHOR_NAMES)
      };
      array.push(commentOptions);
    }
  }
  return array;
};// Функция генерации комментария, аватара и имени автора


const createPhotos = function (amountOfPhotos) { // Функция генерации фотографии
  let array = []; // Промежуточный массив

  for (let i = 1; i <= amountOfPhotos; i++) {
    let numberOfComments = getRandomNumber(NUMBER_OF_COMMENTS.MIN, NUMBER_OF_COMMENTS.MAX); // Получаем число комментов к фотографии
    let photosInfo = { // Объект, в котором хранятся данные о фотографии (путь, лайки и комменты)
      url: `photos/` + i + `.jpg`, // Путь к фотке
      likes: getRandomNumber(NUMBER_OF_LIKES.MIN, NUMBER_OF_LIKES.MAX), // Cлучайное количество лайков
      comment: createComments(numberOfComments), // Пустой массив для записи комментов
      description: getRandomElement(DESCRIPTIONS)
    };
    array.push(photosInfo); // Добаляем сгенерированный объект в массив
  }
  return array; // Наш итоговый массив объектов
};

photos = reshuffleArray(createPhotos(PHOTOS_AMOUNT)); // Создаем фотографии

for (let i = 0; i < PHOTOS_AMOUNT; i++) { // Цикл для добавления фотографий(объектов) в DOM дерево.
  let photoElement = userPictureTemplate.cloneNode(true);

  photoElement.querySelector(`.picture__img`).src = photos[i].url; // Меняем ссылку
  photoElement.querySelector(`.picture__likes`).textContent = photos[i].likes; // Записываем лайки
  photoElement.querySelector(`.picture__comments`).textContent = photos[i].comment.length; // Записываем кол-во коментарий на фотографии

  fragment.appendChild(photoElement); // Добавляем полученный блок в фрагменты
}

photoListElement.appendChild(fragment); // Из фрагмента переносим в DOM

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

const showElement = function (element) {
  if (element.classList.contains(`hidden`)) {
    element.classList.remove(`hidden`);
  }
};

const hideElement = function (element) {
  if (!element.classList.contains(`hidden`)) {
    element.classList.add(`hidden`);
  }
};

const showPhotoEditForm = function (element) {
  photosize = PHOTO_SIZE.MAX;
  showElement(element);
  document.addEventListener(`keydown`, onPhotoEditFormEscPress);
  applyPicturefilter(noEffectImage);
  photoPreviewImage.style = `transform: scale(1)`;
};

const hidePhotoEditForm = function (element) {
  if (!element.classList.contains(`hidden`)) {
    element.classList.add(`hidden`);
    document.removeEventListener(`keydown`, onPhotoEditFormEscPress);
    uploadFile.value = ``;
  }
};

const onPhotoEditFormEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && evt.target !== comment && evt.target !== hashTags) {
    hidePhotoEditForm(photoEditForm);
  }
};

// hashtags validation

const addHashTagsValidation = function () {
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

hashTags.addEventListener(`input`, function () {
  addHashTagsValidation();
});

const hashtagValidation = function (hashTagsData, i) {
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


const changeSizePhotoPreview = function (button) {
  if (button.target.classList.contains(`scale__control--bigger`) && photosize < PHOTO_SIZE.MAX) {
    photosize += PHOTO_SIZE_CHANGE_STEP;
  } else if ((button.target.classList.contains(`scale__control--smaller`) && photosize > PHOTO_SIZE.MIN)) {
    photosize -= PHOTO_SIZE_CHANGE_STEP;
  }
  photoSizeValue.value = `` + photosize;
  photoPreviewImage.style = `transform: scale(` + (photosize / 100) + `)`;
};

const applyPicturefilter = function (element) {
  value = element.value;

  photoPreview.classList = `img-upload__preview`;
  photoPreview.classList.add(`effects__preview--` + value);

  if (value === `none`) {
    hideElement(imageUploadEffectsLevel);
    photoPreview.style = ``;
  } else {
    showElement(imageUploadEffectsLevel);
    addEffectLevelValue(PHOTO_EFFECT_VOLUME_DEFAULT, effects[value]);
  }
};

const addEffectLevelValue = function (percent, effect) {
  imageEffectPin.style.left = percent + `%`;
  imageEffectDepth.style.width = percent + `%`;
  let valuePercent = (effect[2] - effect[1]) / PHOTO_EFFECT_VOLUME_DEFAULT * percent;
  let valueInput = effect[1] + valuePercent;
  imageEffectLevelValue.textContent = valueInput.toFixed(2);
  photoPreview.style = `filter: ` + effect[0] + `(` + valueInput.toFixed(2) + effect[3] + `)`;
};

const getEffectValue = function (percent) {
  if (percent >= 0 && percent <= PERCENT_MAX) {
    addEffectLevelValue(percent, effects[value]);
  }
};

uploadFile.addEventListener(`change`, function () {
  showPhotoEditForm(photoEditForm);
});

photoEditFormClose.addEventListener(`click`, function (evt) {
  evt.preventDefault();
  hidePhotoEditForm(photoEditForm);
});

photoChangeSize.addEventListener(`click`, changeSizePhotoPreview);

imageUploadEffects.addEventListener(`change`, function (evt) {
  applyPicturefilter(evt.target);
});

imageEffectPin.addEventListener(`mousedown`, function (evt) {
  evt.preventDefault();

  let startCoords = evt.clientX;

  let onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    let lineWidth = imageEffectLine.clientWidth;
    let shift = startCoords - moveEvt.clientX;

    startCoords = moveEvt.clientX;

    getEffectValue((imageEffectPin.offsetLeft - shift) * 100 / lineWidth);
  };

  const onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);
  };

  document.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMouseUp);
});
