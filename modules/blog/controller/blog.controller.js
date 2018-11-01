var _ = require('lodash'),
    chalk = require('chalk'),
    path = require('path'),
    config = require(path.resolve('./config/config')),
    { imageUpload } = require('../../lib');

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

        if (fromDate)
            presentMonth = new Date(fromDate).getMonth();
        let queryBuilder = Blog.list({ "$expr": { "$gt": [{ "$month": "$created" }, presentMonth - 2] } })

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
        // run the promise with the call
        // imageUpload(req, res, config.uploads.blog.image.dest)().then().catch();
        let uploadImage = imageUpload(req, res, config.uploads.blog.image.dest);
        uploadImage()
            .then((loc) => {
                res.json(loc);
            })
            .catch(function (err) {
                res.status(422).send(err);
            });
    }

    return {
        create: create,
        getArticle: getArticle,
        uploadImage: blogImages
    }
}

module.exports = blogController;