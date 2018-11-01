var multer = require('multer'),
    path = require('path'),
    uuid = require('uuid/v4'),
    config = require(path.resolve('./config/config'));

module.exports = imageUpload = function (req, res, destPath) {
    if (config.uploads.storage === 'local') {
        multerConfig = {
            storage: multer.diskStorage({
                destination: function (req, file, cb) {
                    cb(null, destPath)
                }, filename: function (req, file, cb) {
                    cb(null, uuid() + '.' + file.mimetype.split('/').pop())
                }
            })
        }
    }
    multerConfig.fileFilter = require(path.resolve('./config/lib/multer')).imageFileFilter;
    var upload = multer(multerConfig).single('image');
    return function uploadImage() {
        return new Promise((resolve, reject) => {
            upload(req, res, (uploadError) => {
                if (uploadError) {
                    console.log(chalk.red('Upload image error'));
                    console.log(uploadError);
                    reject(uploadError)
                } else {
                    if (req.file)
                        resolve({
                            location: 'http://' + config.host + ':' + config.port + '/static/' + req.file.filename
                        });
                    else
                        reject({
                            message: 'No file specified'
                        });
                }
            })
        })
    }
}