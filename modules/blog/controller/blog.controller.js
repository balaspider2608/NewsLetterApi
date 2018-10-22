var _ = require('lodash'),
    chalk = require('chalk');

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
        } else if (blogId) {
            query['_id'] = blogId
        } else if (userId) {
            query['author'] = userId
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
    return {
        create: create,
        getArticle: getArticle
    }
}

module.exports = blogController;