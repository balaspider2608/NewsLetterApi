var content_length = require('./validator/content_length.validator');
var image_upload = require('./upload/image.upload')

const libs = {
    lengthValidator: content_length,
    imageUpload: image_upload
};


module.exports =  libs;
