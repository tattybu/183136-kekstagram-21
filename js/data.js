'use strict';

(function () {

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

  const createComment = (minComments, maxComments) => {
    const comments = [];
    for (let i = 0; i < window.utils.getRandomNumber(minComments, maxComments); i++) {

      const comment = {
        avatar: `img/avatar` + window.utils.getRandomNumber(AVATAR_LIMITS.MIN, AVATAR_LIMITS.MAX) + `.svg`,
        message: COMMENTS[window.utils.getRandomNumber(0, COMMENTS.length - 1)],
        name: AUTHOR_NAMES[window.utils.getRandomNumber(0, AUTHOR_NAMES.length - 1)]
      };
      comments.push(comment);
    }
    return comments;
  };

  const createPhotos = (i = 0) => {
    const photos = {
      url: `photos/` + i + `.jpg`,
      description: window.utils.getRandomNumber(DESCRIPTIONS),
      likes: window.utils.getRandomNumber(NUMBER_OF_LIKES.MIN, NUMBER_OF_LIKES.MAX),
      comments: createComment(NUMBER_OF_COMMENTS.MIN, NUMBER_OF_COMMENTS.MAX)
    };
    return photos;
  };

  window.data = {
    createPhotos
  };
})();

