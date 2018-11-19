var _ = require('lodash'),
    chalk = require('chalk'),
    path = require('path'),
    config = require(path.resolve('./config/config')),
    { imageUpload, categorize } = require('../../lib');

var blogController = (Blog, User) => {
    var create = (req, res) => {
        var blog = new Blog(req.body);
        blog.modified = Date.now();
        Blog.findOneAndUpdate({ _id: blog.id }, blog, {
            upsert: true,
            new: true
        }).populate('author', 'name img email team').exec((err, Blog) => {
            if (err) {
                console.log(chalk.red(500));
                console.log(err);
                return res.status(500).send({
                    message: 'Error while creating or updating Article'
                });
            } else {
                res.json(Blog);
            }
        });
    };

    var getArticle = (req, res) => {
        let { categoryId, blogId, userId, fromDate } = req.query;
        if (blogId) {
            Blog.findById(blogId).populate('author', 'name img email team').populate('edited', 'name').exec((err, articles) => {
                if (err) {
                    console.log(chalk.red('Error occured'));
                    console.log(err);
                    return res.status(422).send({
                        message: 'Error occured'
                    });
                } else {
                    return res.json(articles);
                }
            });
        } else {
            let presentMonth = new Date().getMonth();
            let queryBuilder = {
                isPublished: true
            };
            if (fromDate) {
                presentMonth = new Date(fromDate).getMonth();
                queryBuilder["$expr"] = { "$gt": [{ "$month": "$created" }, presentMonth - 2] }
            }
            if (categoryId) {
                queryBuilder["category"] = categoryId;
            } else if (userId) {
                queryBuilder["author"] = userId;
                delete queryBuilder.isPublished;
            }
            Blog.list(queryBuilder).exec((err, articles) => {
                if (err) {
                    console.log(chalk.red('Error occured'));
                    console.log(err);
                    return res.status(422).send({
                        message: 'Error occured'
                    });
                } else {
                    let result = articles;
                    if (!userId)
                        result = categorize(articles);
                    res.json(result);
                }
            });
        }
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

    var getBlogForReview = (req, res) => {
        User.findOne({ uniqueID: req.connection.user }, (err, User) => {
            if (err) {
                res.status(500).send({
                    message: 'Internal server error'
                })
            } else if (Object.keys(User).length > 0) {
                if (User.isEditor) {
                    let presentMonth = new Date().getMonth() + 1;
                    let queryBuilder = {
                        isDraft: false,
                        isPublished: false
                    };
                    queryBuilder["$expr"] = { "$gt": [{ "$month": "$created" }, presentMonth - 2] };
                    Blog.list(queryBuilder).exec((err, articles) => {
                        if (err) {
                            console.log(chalk.red('Error occured'));
                            console.log(err);
                            return res.status(422).send({
                                message: 'Error occured'
                            });
                        } else {
                            let result = articles;
                            res.json(result);
                        }
                    });
                } else {
                    res.status(401).send({
                        message: 'Access denied'
                    });
                }
            }
        })
    }

    return {
        create: create,
        getArticle: getArticle,
        uploadImage: blogImages,
        getBlogForReview: getBlogForReview
    }
}

module.exports = blogController;