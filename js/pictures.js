'use strict';

(function () {
  const PHOTOS_AMOUNT = 25;

  const photoListElement = document.querySelector(`.pictures`);
  const userPictureTemplate = document.querySelector(`#picture`).content.querySelector(`.picture`);
  const fragment = document.createDocumentFragment();

  const addPhotos = function (photos) {

    const photoElement = userPictureTemplate.cloneNode(true);

    photoElement.querySelector(`.picture__img`).src = photos.url;
    photoElement.querySelector(`.picture__likes`).textContent = photos.likes;
    photoElement.querySelector(`.picture__comments`).textContent = photos.comment.length;

    return photoElement;
  };

  let photos = [];

  photos = window.utils.reshuffleArray(window.data.createPhotos(PHOTOS_AMOUNT));

  for (let i = 0; i < PHOTOS_AMOUNT; i++) {
    fragment.appendChild(addPhotos(photos[i]));

  }

  photoListElement.appendChild(fragment);

})();
