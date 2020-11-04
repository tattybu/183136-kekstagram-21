'use strict';

(() => {

  const getData = (onSuccess, onError) => {

    let URL = `https://21.javascript.pages.academy/kekstagram/data`;
    let xhr = new XMLHttpRequest();

    xhr.responseType = `json`;

    xhr.addEventListener(`load`, () => {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
      }
    });

    xhr.addEventListener(`error`, () => {
      onError(`Ошибка соединения`);
    });

    xhr.addEventListener(`timeout`, () => {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
    });

    xhr.timeout = 10000;

    xhr.open(`GET`, URL);
    xhr.send();
  };


  window.load = {
    getData
  };

})();
