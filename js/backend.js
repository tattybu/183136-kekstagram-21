'use strict';

(() => {
  const URL = `https://21.javascript.pages.academy/kekstagram`;
  const TIMEOUT_IN_MS = 10000;
  const StatusCode = {
    OK: 200
  };
  const messageOfError = {
    400: `Неверный запрос`,
    401: `Пользователь не авторизирован`,
    403: `Доступ запрещен`,
    404: `Ничего не найдено`,
    500: `Внутренняя ошибка сервера`
  };

  const createXhr = function (onSuccess, onError) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError(`Статус ответа: ${messageOfError[xhr.status]}`);
      }
    });

    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });
    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);
    });

    xhr.timeout = TIMEOUT_IN_MS;

    return xhr;
  };

  const download = function (onSuccess, onError) {
    const xhr = createXhr(onSuccess, onError);
    xhr.open(`GET`, `${URL}/data`);
    xhr.send();
  };

  const upload = function (data, onSuccess, onError) {
    const xhr = createXhr(onSuccess, onError);
    xhr.open(`POST`, URL);
    xhr.send(data);
  };

  window.backend = {
    download,
    upload
  };
})();
