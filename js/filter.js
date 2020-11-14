'use strict';
(() => {
  const MAX_UNIQUE_PHOTOS = 10;
  const FilterId = {
    DEFAULT: `filter-default`,
    RANDOM: `filter-random`,
    DISCUSSED: `filter-discussed`
  };
  const getDiscussedPhoto = function (data) {
    return data.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
  };

  const getRandomPhotos = function (data) {
    return data.sort(function () {
      return window.util.getRandomInt(-1, 1);
    }).slice(0, MAX_UNIQUE_PHOTOS);
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
      case FilterId.DEFAULT:
        return copyData;
      case FilterId.RANDOM:
        return getRandomPhotos(copyData);
      case FilterId.DISCUSSED:
        return getDiscussedPhoto(copyData);
    }
    return copyData;
  };

  window.filter = filterData;
})();
