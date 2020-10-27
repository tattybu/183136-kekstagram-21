'use strict';

(function () {

  const PHOTOS_AMOUNT = 25;
  const similarElement = document.querySelector(`.pictures`);
  const randomUsersTemplate = document.querySelector(`#picture`).content.querySelector(`.picture`);

  const fragment = document.createDocumentFragment();
  for (let i = 1; i <= PHOTOS_AMOUNT; i++) {


    const generatedUser = window.data.createPhotos(i);
    randomUsersTemplate.querySelector(`.picture__img`).src = generatedUser.url;
    randomUsersTemplate.querySelector(`.picture__comments`).textContent = generatedUser.comments.length;
    randomUsersTemplate.querySelector(`.picture__likes`).textContent = generatedUser.likes;

    const userELement = randomUsersTemplate.cloneNode(true);

    fragment.appendChild(userELement);
  }

  similarElement.appendChild(fragment);

})();
