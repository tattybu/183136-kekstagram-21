'use strict';

(() => {
  const LIKES_AMOUNT = {
    MIN: 15,
    MAX: 200
  };

  const AVATARS_AMOUNT = {
    MIN: 1,
    MAX: 6
  };

  const COMMENTS_AMOUNT = {
    MIN: 0,
    MAX: 6
  };

  const COMMENTS = [
    `Всё отлично!`,
    `В целом всё неплохо. Но не всё.`,
    `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально`,
    `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
    `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
    `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`
  ];

  const AUTHOR_NAMES = [
    `Евлампий`,
    `Шурочка`,
    `Настя`,
    `Толян`,
    `Ирка`,
    `Никифор`
  ];

  const createComments = (quantity) => {
    const comments = [];
    for (let i = 0; i < quantity; i++) {
      const comment = {
        avatar: `img/avatar-${window.utils.getRandomNumber(AVATARS_AMOUNT.MIN, AVATARS_AMOUNT.MAX)}.svg`,
        message: COMMENTS[window.utils.getRandomNumber(0, COMMENTS.length - 1)],
        name: AUTHOR_NAMES[window.utils.getRandomNumber(0, AUTHOR_NAMES.length - 1)]
      };
      comments.push(comment);
    }
    return comments;
  };

  const createPhotoDescription = (quantity) => {
    const photos = [];
    for (let i = 0; i < quantity; i++) {
      const photo = {
        url: `photos/${window.utils.getRandomNumber(1, 25)}.jpg`,
        description: `описание фотографии`,
        likes: window.utils.getRandomNumber(LIKES_AMOUNT.MIN, LIKES_AMOUNT.MAX),
        comments: createComments(window.utils.getRandomNumber(COMMENTS_AMOUNT.MIN, COMMENTS_AMOUNT.MAX))
      };
      photos.push(photo);
    }
    return photos;
  };

  window.data = {
    createPhotoDescription,
  };
})();
