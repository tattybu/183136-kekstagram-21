'use strict';

(() => {
  const photosElement = document.querySelector(`.pictures`);
  const photosTitle = photosElement.querySelector(`.pictures__title`);
  const photostemplate = document.querySelector(`#picture`)
      .content
      .querySelector(`.picture`);

  const renderPhoto = function (photo) {
    const pictureElement = photostemplate.cloneNode(true);

    pictureElement.dataset.id = photo.id;
    pictureElement.querySelector(`.picture__img`).src = photo.url;
    pictureElement.querySelector(`.picture__img`).alt = photo.description;
    pictureElement.querySelector(`.picture__likes`).textContent = photo.likes;
    pictureElement.querySelector(`.picture__comments`).textContent = photo.comments.length;

    return pictureElement;
  };

  const fillElements = function (data) {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < data.length; i++) {
      fragment.appendChild(renderPhoto(data[i]));
    }
    photosElement.appendChild(fragment);
    photosTitle.classList.remove(`visually-hidden`);
  };

  const delElements = function () {
    const picturesCards = document.querySelectorAll(`.picture`);
    picturesCards.forEach(function (item) {
      item.remove();
    });
  };

  window.picture = {
    render: fillElements,
    remove: delElements
  };
})();
