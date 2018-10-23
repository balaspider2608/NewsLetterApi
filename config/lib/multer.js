module.exports.imageFileFilter = function (req, file, callback) {
    console.log(file.mimetype);
    if(file.mimetype !== 'image/png' && file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/gif') {
        var err = new Error();
        err.code = 'UNSUPPORTED_MEDIA_TYPE';
        return callback(err, false);
    }
    callback(null, true);
}