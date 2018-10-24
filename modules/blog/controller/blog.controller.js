var _ = require('lodash'),
    chalk = require('chalk'),
    path = require('path'),
    multer = require('multer'),
    config = require(path.resolve('./config/config'));

var blogController = (Category, Blog) => {
    var create = (req, res) => {
        if (req.body.blog && req.body.userId && req.body.categoryId) {
            var blog = new Blog(req.body.blog);
            blog.author = req.body.userId;
            blog.category = req.body.categoryId;
            blog.save((err) => {
                if (err) {
                    console.log(chalk.red('Error while saving blog'));
                    console.log(err);
                    return res.status(422).send({
                        message: 'Error while saving blog'
                    });
                } else {
                    Category.findById(req.body.categoryId, (err, category) => {
                        if (err) {
                            console.log(chalk.red('Error while saving blog'));
                            console.log(err);
                            return res.status(422).send({
                                message: 'Error while saving blog'
                            });
                        } else {
                            category.blog = _.concat(category.blog, blog._id);
                            category.save((err) => {
                                if (err) {
                                    console.log(chalk.red('Error while saving category'));
                                    console.log(err);
                                    return res.status(422).send({
                                        message: 'Error while saving category'
                                    });
                                }
                                else {
                                    res.json(blog);
                                }
                            });
                        }
                    })
                }
            })

        } else {
            res.status(500).send({
                message: 'No data to save'
            });
        }
    }
    var getArticle = (req, res) => {
        let { categoryId, blogId, userId, fromDate } = req.query;
        let query = {};
        let presentMonth = new Date().getMonth();
      
        if(fromDate)
         presentMonth = new Date(fromDate).getMonth();
         let queryBuilder =    Blog.list({ "$expr": { "$gt": [{ "$month": "$created" }, presentMonth-2] } })
    
        if (categoryId) {
            queryBuilder['category'] = categoryId
        
        } else if (blogId) {
            queryBuilder['_id'] = blogId
        } else if (userId) {
            queryBuilder['author'] = userId
        } else {
            return res.status(422).send({
                message: 'No query specified'
            });
        }
        queryBuilder.exec((err, articles) => {
            if (err) {
                console.log(chalk.red('Error occured'));
                return res.status(422).send({
                    messgae: 'Error occured'
                });
            } else {
                res.json(articles);
            }
        });
    }
    var blogImages = (req, res) => {
        //verify if content is available
        // if (!_.isEmpty(req.body)) {
            var multerConfig;
            if (config.uploads.storage === 'local') {
                multerConfig = {
                    storage: multer.diskStorage({
                        destination: function (req, file, cb) {
                            cb(null, config.uploads.blog.image.dest)
                        }, filename: function (req, file, cb) {
                            console.log(file);
                            cb(null, file.originalname)
                        }
                    })
                }
            }
            //upload image only        
            multerConfig.fileFilter = require(path.resolve('./config/lib/multer')).imageFileFilter;
            var upload = multer(multerConfig).single('image');
            uploadImage()
                .then((loc) => {
                    res.json(loc);
                })
                .catch(function (err) {
                    res.status(422).send(err);
                })

            function uploadImage() {
                return new Promise((resolve, reject) => {
                    upload(req, res, (uploadError) => {
                        if (uploadError) {
                            console.log(chalk.red('Upload image error'));
                            console.log(uploadError);
                            reject(uploadError)
                        } else {
                            resolve({
                                location: 'http://' + config.host + ':' + config.port + '/static/' + req.file.originalname
                            });
                        }
                    })
                })
            }
        // } else {
        //     res.status(422).send({
        //         message: 'No file attached'
        //     });
        // }
    }

    return {
        create: create,
        getArticle: getArticle,
        uploadImage: blogImages
    }
}

module.exports = blogController;