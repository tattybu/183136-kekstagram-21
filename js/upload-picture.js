'use strict';
(() => {
  const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
  const onUploadFileRead = function (input, previewImg) {
    const file = input.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener(`load`, function () {
        previewImg.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  };

  window.uploadPicture = onUploadFileRead;

})();
