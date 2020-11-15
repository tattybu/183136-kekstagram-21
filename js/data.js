'use strict';

(() => {
  let offers = [];
  const imgFilter = document.querySelector(`.img-filters`);
  const pictureContainer = document.querySelector(`.pictures`);

  // imgFilter.classList.remove(`img-filters--inactive`);

  const dataTransform = function (data) {
    data.forEach(function (item, index) {
      item.id = index;
    });
  };

  const successHandler = function (data) {
    offers = data;
    dataTransform(offers);
    window.picture.render(offers);
    imgFilter.classList.remove(`img-filters--inactive`);
  };

  const errorHandler = function (errorMessage) {
    window.popup.error(errorMessage);
    imgFilter.classList.add(`img-filters--inactive`);
  };

  window.backend.download(successHandler, errorHandler);

  const onFiltersClick = function (evt) {
    const target = evt.target.closest(`.img-filters__button`);
    if (target) {
      window.picture.remove();
      window.picture.render(window.filter(offers, target));
    }
  };

  imgFilter.addEventListener(`click`, window.util.debounce(onFiltersClick));
  pictureContainer.addEventListener(`click`, function (evt) {
    let target = evt.target.closest(`.picture`);
    if (target) {
      window.bigPicture.show(offers[target.dataset.id]);
    }
  });
})();

