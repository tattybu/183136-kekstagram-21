'use strict';

(() => {
  const MAX_PHOTOS = 10;

  const getDiscussedPhoto = function (data) {
    return data.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
  };

  const getRandomPhotos = function (data) {
    return data.sort(function () {
      return window.util.getRandomInt(-1, 1);
    }).slice(0, MAX_PHOTOS);
  };

  const activeFilter = function (filter) {
    const lastActiveFilter = document.querySelector(`.img-filters__button--active`);
    lastActiveFilter.classList.remove(`img-filters__button--active`);
    if (!filter.classList.contains(`img-filters__button--active`)) {
      filter.classList.add(`img-filters__button--active`);
    }
  };

  const filterData = function (data, filter) {
    const copyData = data.slice();
    activeFilter(filter);
    switch (filter.id) {
      case `filter-default`:
        return copyData;
      case `filter-random`:
        return getRandomPhotos(copyData);
      case `filter-discussed`:
        return getDiscussedPhoto(copyData);
    }
    return copyData;
  };

  window.filter = filterData;
})();
