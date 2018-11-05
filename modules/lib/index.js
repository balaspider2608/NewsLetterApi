var content_length = require('./validator/content_length.validator');
var image_upload = require('./upload/image.upload');
var categorize = require('./filter/categorize.array');

const libs = {
    lengthValidator: content_length,
    imageUpload: image_upload,
    categorize: categorize
};


module.exports =  libs;
