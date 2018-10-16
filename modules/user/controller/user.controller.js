var path = require('path'),
    mongoose = require('mongoose'),
    user = mongoose.model('User'),
    chalk = require('chalk');


    
    /**
 *  Creating users
 */
exports.create = (req, res) => {
    var user = new User(req.body);
    user.save((err) => {
        if(err) {
            console.log(chalk.red('Error while saving user'));
            console.log(err);
            return res.status(422).send({
                message: 'Error while creating category'
            });
        } else {
            res.json(user);
        }
    });
};

/**
 * List of users
 */
exports.list = function (req, res) {
    user.find().sort('-created').populate('name', 'email').exec(function (err, users) {
      if (err) {
        console.log(chalk.red('Error while fetching list of users'));
        console.log(err);
        return res.status(422).send({
            message: 'Error while creating category'
        });
      } else {
        res.json(users);
      }
    });
  };

/**
 * get articles by id 
 */
exports.getByEmailId = (req, res) => {
    var Id = new User(req.body.id);
    user.findbyId(id)((err) => {
        if(err) {
            console.log(chalk.red('No data found '));
            console.log(err);
            return res.status(422).send({
                message: 'Error while fetching data'
            });
        } else {
            res.json(user);
        }
    });
};