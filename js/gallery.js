'use strict';

// Модуль для отрисовки миниатюр и увеличенного изображения
(() => {
  const ESC_KEYCODE = 27;
  const ENTER_KEYCODE = 13;
  const photosElement = document.querySelector(`.pictures`);
  const photosTemplate = document.querySelector(`#picture`).content.querySelector(`.picture`);

  const createPhotos = (photo) => {
    const photoElement = photosTemplate.cloneNode(true);

    photoElement.querySelector(`.picture__img`).src = photo.url;
    photoElement.querySelector(`.picture__likes`).textContent = photo.likes;
    photoElement.querySelector(`.picture__comments`).textContent = photo.comments.length;

    return photoElement;
  };

  const addPictureEvents = (photoElement, photo) => {

    photoElement.addEventListener(`click`, (evt) => {
      if (evt.target && evt.target.matches(`img[class=picture__img]`)) {
        openBigPhotoElement(photo);
      }
    });

    photoElement.addEventListener(`keydown`, (evt) => {
      if (evt.keyCode === ENTER_KEYCODE) {
        bigPhotoElement.querySelector(`.big-picture__img img`).src = photo.url;
        openBigPhotoElement(photo);
      }
    });
  };

  const createPicturesList = (photos) => {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < photos.length; i++) {
      const photo = photos[i];
      const photoElement = createPhotos(photo);
      addPictureEvents(photoElement, photo);
      fragment.appendChild(photoElement);
    }

    return fragment;
  };

  photosElement.appendChild(createPicturesList(window.data.createPhotoDescription(25)));

  const commentsList = document.querySelector(`.social__comments`);
  const commentsItem = commentsList.querySelector(`.social__comment`);

  const createCommentItem = (comments) => {
    const commentElement = commentsItem.cloneNode(true);

    commentElement.querySelector(`.social__picture`).src = comments.avatar;
    commentElement.querySelector(`.social__picture`).alt = comments.name;
    commentElement.querySelector(`.social__text`).textContent = comments.message;

    return commentElement;
  };

  const createCommentsList = (comment) => {
    commentsList.innerHTML = ``;
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < comment.length; i++) {
      fragment.appendChild(createCommentItem(comment[i]));
    }

    commentsList.appendChild(fragment);
  };

  const bigPhotoElement = document.querySelector(`.big-picture`);
  const closeButtonBigImg = bigPhotoElement.querySelector(`#picture-cancel`);

  const renderBigPhotoElement = (photos) => {
    bigPhotoElement.querySelector(`.big-picture__img img`).src = photos.url;
    bigPhotoElement.querySelector(`.likes-count`).textContent = photos.likes;
    bigPhotoElement.querySelector(`.social__caption`).textContent = photos.description;
    bigPhotoElement.querySelector(`.comments-count`).textContent = photos.comments.length;

    bigPhotoElement.querySelector(`.social__comment-count`).classList.add(`hidden`);
    bigPhotoElement.querySelector(`.comments-loader`).classList.add(`hidden`);

    createCommentsList(photos.comments);
  };

  renderBigPhotoElement(window.data.createPhotoDescription(25)[0]);

  // Просмотр любого изображения в полноэкранном режиме

  const onModalOpenKeydown = (evt) => {
    if (evt.keyCode === ESC_KEYCODE) {
      evt.preventDefault();
      closeBigPhotoElement();
    }
  };

  const openBigPhotoElement = (photo) => {
    bigPhotoElement.querySelector(`.big-picture__img img`).src = photo.url;
    bigPhotoElement.classList.remove(`hidden`);
    closeButtonBigImg.addEventListener(`click`, closeBigPhotoElement);
    document.addEventListener(`keydown`, onModalOpenKeydown);
    document.querySelector(`body`).classList.add(`modal-open`);
  };

  const closeBigPhotoElement = () => {
    bigPhotoElement.classList.add(`hidden`);
    closeButtonBigImg.removeEventListener(`click`, closeBigPhotoElement);
    document.removeEventListener(`keydown`, onModalOpenKeydown);
    document.querySelector(`body`).classList.remove(`modal-open`);
  };

  window.gallery = {
    createCommentsList,
    closeBigPhotoElement
  };
})();
