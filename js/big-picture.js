'use strict';

(() => {
  const MAX_COMMENTS = 5;
  const bigPhoto = document.querySelector(`.big-picture`);
  const socialCommentCount = bigPhoto.querySelector(`.social__comment-count`);
  const body = document.querySelector(`body`);
  const closeButtonBigImg = bigPhoto.querySelector(`.big-picture__cancel`);
  const bigPhotoImg = bigPhoto.querySelector(`img`);
  const likesCount = bigPhoto.querySelector(`.likes-count`);
  const socialCaption = bigPhoto.querySelector(`.social__caption`);
  const commentsList = bigPhoto.querySelector(`.social__comments`);
  const commentsItem = bigPhoto.querySelector(`.social__comment`);
  const commentLoader = bigPhoto.querySelector(`.comments-loader`);
  const commentsShown = bigPhoto.querySelector(`.comments-shown`);
  const commentCount = bigPhoto.querySelector(`.comments-count`);
  let bigPhotoElement;
  let index = 1;

  const fillComments = function (commentArray) {
    const fragment = document.createDocumentFragment();
    commentsList.innerHTML = ``;

    commentArray.forEach(function (item) {
      const createCommentItem = commentsItem.cloneNode(true);
      createCommentItem.querySelector(`.social__picture`).src = item.avatar;
      createCommentItem.querySelector(`.social__picture`).alt = item.name;
      createCommentItem.querySelector(`.social__text`).textContent = item.message;
      fragment.appendChild(createCommentItem);
    });
    commentsList.appendChild(fragment);
  };

  const showCommentsCount = function (element) {
    if (element.comments.length > MAX_COMMENTS) {
      commentLoader.classList.remove(`hidden`);
      socialCommentCount.classList.remove(`hidden`);
      commentsShown.textContent = MAX_COMMENTS;
      commentCount.textContent = element.comments.length;
    }
  };

  const fillbigPhoto = function (element) {
    bigPhotoImg.src = element.url;
    likesCount.textContent = element.likes;
    socialCaption.textContent = element.description;
    fillComments(element.comments.slice(0, MAX_COMMENTS));
    showCommentsCount(element);
  };

  const onCancelBigPhotoClick = function () {
    closeBigPhoto();
  };

  const onBigPhotoEscPress = function (evt) {
    if (evt.key === window.constants.ESCAPE) {
      evt.preventDefault();
      closeBigPhoto();
    }
  };

  const onBigPhotoEnterPress = function (evt) {
    if (evt.key === window.constants.ENTER_KEYCODE) {
      evt.preventDefault();
      showBigPhoto();
    }
  };

  const onCommentLoaderClick = function () {
    index++;
    const commentsArray = bigPhotoElement.comments.slice(0, index * MAX_COMMENTS);
    fillComments(commentsArray);
    if (commentsArray.length >= bigPhotoElement.comments.length) {
      commentLoader.classList.add(`hidden`);
    }
    commentsShown.textContent = commentsArray.length;
  };

  const showBigPhoto = function (element) {
    bigPhotoElement = element;
    index = 1;
    commentLoader.classList.add(`hidden`);
    socialCommentCount.classList.add(`hidden`);
    body.classList.add(`modal-open`);
    bigPhoto.classList.remove(`hidden`);
    fillbigPhoto(element);
    closeButtonBigImg.addEventListener(`click`, onCancelBigPhotoClick);
    document.addEventListener(`keydown`, onBigPhotoEscPress);
    commentLoader.addEventListener(`click`, onCommentLoaderClick);
    bigPhoto.addEventListener(`keydown`, onBigPhotoEnterPress);
  };

  const closeBigPhoto = function () {
    bigPhoto.classList.add(`hidden`);
    closeButtonBigImg.removeEventListener(`click`, onCancelBigPhotoClick);
    document.removeEventListener(`keydown`, onBigPhotoEscPress);
    body.classList.remove(`modal-open`);
    commentLoader.removeEventListener(`click`, onCommentLoaderClick);
  };

  window.bigPicture = {
    show: showBigPhoto
  };
})();
