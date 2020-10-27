
'use strict';

(function () {

  const renderPictures = function (pictures) {

    const similarElement = document.querySelector(`.pictures`);
    let fragment = createPictures(pictures);

    similarElement.appendChild(fragment);

  };

  const createPictures = function (pictures) {

    const randomUsersTemplate = document.querySelector(`#picture`).content.querySelector(`.picture`);

    let fragment = document.createDocumentFragment();

    for (let i = 0; i < pictures.length; i++) {
      fragment = generateFragment(fragment, randomUsersTemplate, pictures[i]);
    }

    return fragment;

  };

  const generateFragment = function (fragment, template, picture) {

    const pictureClone = template.cloneNode(true);
    const img = pictureClone.querySelector(`.picture__img`);
    const likes = pictureClone.querySelector(`.picture__likes`);
    const comments = pictureClone.querySelector(`.picture__comments`);

    img.src = picture.url;

    likes.textContent = picture.likes;

    comments.textContent = String(picture.comments.length);

    fragment.appendChild(pictureClone);

    return fragment;
  };

  let successHandler = function (pictures) {
    renderPictures(window.utils.reshuffleArray(pictures));
  };

  const errorHandler = function (errorMessage) {
    const messageContainer = document.createElement(`div`);
    messageContainer.textContent = errorMessage;
    messageContainer.classList.add(`error-message`);
    document.body.appendChild(messageContainer);
  };

  window.load.getData(successHandler, errorHandler);

})();
