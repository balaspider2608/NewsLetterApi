var path = require('path'),
    mongoose = require('mongoose'),
    Category = mongoose.model('Category'),
    chalk = require('chalk');


exports.create = (req, res) => {
    var category = new Category(req.body);
    category.save((err) => {
        if(err) {
            console.log(chalk.red('Error while saving category'));
            console.log(err);
            return res.status(422).send({
                message: 'Error while creating category'
            });
        } else {
            res.json(category);
        }
    });
};


// var categoryController = ()