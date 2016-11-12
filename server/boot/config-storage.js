/**
 * Created by mehari on 7/12/16.
 */

module.exports = function (app) {
  let crypto = require('crypto');

  app.dataSources.storage.connector.getFilename = function (file, req, res) {

    //regx from http://stackoverflow.com/questions/22920677/javascript-regex-to-validate-document-files-pdf-txt-doc
    let acceptFileTypes = /^image\/(jpe?g|png)$|^application\/(pdf|msword)$|^text\/plain$/i;
    let value = acceptFileTypes.test(file.type);
    if (value) {
      let filename = file.name.split('.');
      let fileExtension = filename.pop();
      let fileName = '' + filename;
      let random = Math.random().toString();
      let timestamp = (new Date().valueOf()).toString();
      let hash = crypto.createHash('md5').update(random + timestamp + fileName).digest('hex');

      return hash + '.' + fileExtension;
    }
    else {
      throw "FileTypeError: File type is unaccepted.";
    }
  };
};
