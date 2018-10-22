var chalk = require('chalk');

var categoryController = (Category) => {
    var create = (req, res) => {
        var category = new Category(req.body);
        category.save((err) => {
            if (err) {
                console.log(chalk.red('Error while saving category'));
                console.log(err);
                return res.status(422).send({
                    message: 'Error while adding new Category'
                });
            } else {
                res.json(category);
            }
        })
    };
    var list = (req, res) => {
        Category.find({},(err, categories) => {
            if (err) {
                console.log(chalk.red('Error while getting all category'));
                console.log(err);
                res.status(500).send(err);
            }
            else
                res.json(categories)
        });
    };
    var getById = (req, res) => {
        Category.findById(req.params.categoryId).populate('blog').exec((err, category) => {
            if (err) {
                console.log(chalk.red('Error while getting category'));
                console.log(err);
                return res.status(422).send(err);
            }
            else
                res.json(category);
        });
    }
    return {
        create: create,
        list: list,
        getById: getById
    }
}

module.exports = categoryController;