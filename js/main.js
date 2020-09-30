'use strict';

let PHOTOS_AMOUNT = 25; // Количество фотографий
let AUTHOR_NAMES = [
  `Евлампий`,
  `Шурочка`,
  `Настя`,
  `Толян`,
  `Ирка`,
  `Никифор`
]; // Имена авторов
let COMMENT = [
  `Тестим новую камеру! =)`,
  `Затусили с друзьями на море`,
  `Как же круто тут кормят`,
  `Отдыхаем...`,
  `Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......`,
  `Вот это тачка!`

]; // Примеры комментариев
let VALUE_OF_AVATAR_MIN = 1; // Минимальный номер аватарки из папки img
let VALUE_OF_AVATAR_MAX = 6; // Максимальный номер аватарки из папки img
let NUMBER_OF_COMMENTS_MIN = 1; // Минимальное количество комментариев к фото
let NUMBER_OF_COMMENTS_MAX = 5; // Максимальное количество комментариев к фото
let NUMBER_OF_LIKES_MIN = 15; // Минимальное количество лайков к фото
let NUMBER_OF_LIKES_MAX = 200; // Максимальное количество лайков к фото
let photos = []; // Массив объектов с ссылкой, лайками и комментами к фотографиии

let photoListElement = document.querySelector(`.pictures`); // Находим тег, внутрь которого будем вставлять данные из template'а
let userPictureTemplate = document.querySelector(`#picture`).content.querySelector(`.picture`); // Находим нужный шаблон
let fragment = document.createDocumentFragment(); // Создаем documentFragment

let getRandomNumber = function (min, max) { // Функция для получения случайного целого числа в диапазоне от мин. до макс., включая эти значения
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

let reshuffleArray = function (array) { // Для избежания дублирования фотографий
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

let chooseRandomElement = function (array) { // Функция выбора случайного элемента из входного массива
  return array[getRandomNumber(0, array.length - 1)];
};

let createComment = function (amountOfComment) { // Функция генерации комментария, аватара и имени автора
  let array = [];
  for (let i = 0; i < amountOfComment; i++) {
    let commentOptions = {
      avatar: `img/avatar-` + getRandomNumber(VALUE_OF_AVATAR_MIN, VALUE_OF_AVATAR_MAX) + `.svg`,
      message: chooseRandomElement(COMMENT),
      name: chooseRandomElement(AUTHOR_NAMES)
    };
    array.push(commentOptions);
  }
  return array;
};

let createPhotos = function (amountOfPhotos) { // Функция генерации фотографии
  let array = []; // Промежуточный массив

  for (let i = 1; i <= amountOfPhotos; i++) {
    let numberOfComments = getRandomNumber(NUMBER_OF_COMMENTS_MIN, NUMBER_OF_COMMENTS_MAX); // Получаем число комментов к фотографии
    let photosInfo = { // Объект, в котором хранятся данные о фотографии (путь, лайки и комменты)
      url: `photos/` + i + `.jpg`, // Путь к фотке
      likes: getRandomNumber(NUMBER_OF_LIKES_MIN, NUMBER_OF_LIKES_MAX), // Cлучайное количество лайков
      comment: createComment(numberOfComments) // Пустой массив для записи комментов
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
