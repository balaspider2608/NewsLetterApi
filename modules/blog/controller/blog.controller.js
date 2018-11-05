var _ = require('lodash'),
    chalk = require('chalk'),
    path = require('path'),
    config = require(path.resolve('./config/config')),
    { imageUpload } = require('../../lib');

var blogController = (Category, Blog) => {
    var create = (req, res) => {
        var blog = new Blog(req.body);
        Blog.findOneAndUpdate({_id: blog.id}, blog, {
            upsert: true,
            new: true
        }, (err, Blog) => {
            if(err) {
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
        let presentMonth = new Date().getMonth();

        if (fromDate)
            presentMonth = new Date(fromDate).getMonth();

        let queryBuilder = Blog.list({ "$expr": { "$gt": [{ "$month": "$created" }, presentMonth - 2] } });

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
                console.log(err);
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