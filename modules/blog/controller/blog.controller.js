var _ = require('lodash'),
<<<<<<< HEAD
    chalk = require('chalk'),
    path = require('path'),
    multer = require('multer'),
    config = require(path.resolve('./config/config'));

=======
    chalk = require('chalk');
    
>>>>>>> 0024eaeb5d7b94db92ebee74795cca9e073eb01e
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
<<<<<<< HEAD
        let queryBuilder = Blog.list(query);
        if (categoryId && fromDate) {
            fromDate = new Date(fromDate);
            // console.log(toDate);
            console.log(fromDate);
            let toDate = new Date(fromDate.getMonth() - 1);
            console.log(toDate);
            console.log(fromDate);
            query['category'] = categoryId,
                queryBuilder = queryBuilder
                    .where('created').gt(new Date(fromDate)).lt(new Date(toDate))
                    .select('title stitle cim');
=======
        let presentMonth = new Date().getMonth();
      
        if(fromDate)
         presentMonth = new Date(fromDate).getMonth();
         let queryBuilder =    Blog.list({ "$expr": { "$gt": [{ "$month": "$created" }, presentMonth-2] } })
    
        if (categoryId) {
            queryBuilder['category'] = categoryId
        
>>>>>>> 0024eaeb5d7b94db92ebee74795cca9e073eb01e
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