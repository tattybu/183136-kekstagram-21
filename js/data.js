'use strict';

window.data = (function () {
  const AUTHOR_NAMES = [
    `Евлампий`,
    `Шурочка`,
    `Настя`,
    `Толян`,
    `Ирка`,
    `Никифор`
  ];

  const COMMENTS = [
    `Всё отлично!`,
    `В целом всё неплохо. Но не всё.`,
    `Мега фото! Просто обалдеть. Как вам так удалось?`,
    `Да это фоташоп!!!!!!!!`,
    `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
    `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`
  ];


  const DESCRIPTIONS = [
    `Тестим новую камеру! =)`,
    `Затусили с друзьями на море`,
    `Как же круто тут кормят`,
    `Отдыхаем...`,
    `Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......`,
    `Вот это тачка!`
  ];

  const AVATAR_LIMITS = {
    MIN: 1,
    MAX: 6
  };


  const NUMBER_OF_COMMENTS = {
    MIN: 1,
    MAX: 5
  };


  const NUMBER_OF_LIKES = {
    MIN: 15,
    MAX: 200
  };

  const getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const getRandomElement = function (array) {
    return array[getRandomNumber(0, array.length - 1)];
  };

  const createComment = function (amountOfComment) {
    let array = [];
    for (let i = 0; i < amountOfComment; i++) {
      const commentOptions = {
        avatar: `img/avatar-` + getRandomNumber(AVATAR_LIMITS.MIN, AVATAR_LIMITS.MAX) + `.svg`,
        message: getRandomElement(COMMENTS),
        name: getRandomElement(AUTHOR_NAMES),
      };
      array.push(commentOptions);
    }
    return array;
  };

  return {
    createPhotos(amountOfPhotos) {
      let array = [];
      for (let i = 1; i <= amountOfPhotos; i++) {
        const numberOfComments = getRandomNumber(NUMBER_OF_COMMENTS.MIN, NUMBER_OF_COMMENTS.MAX);
        const photosInfo = {
          url: `photos/` + i + `.jpg`,
          likes: getRandomNumber(NUMBER_OF_LIKES.MIN, NUMBER_OF_LIKES.MAX),
          comment: createComment(numberOfComments),
          description: getRandomElement(DESCRIPTIONS)
        };
        array.push(photosInfo);
      }
      return array;
    }
  };
})();
