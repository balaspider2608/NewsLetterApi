var path = require('path'),
    mongoose = require('mongoose'),
    //user = mongoose.model('User'),
    chalk = require('chalk');




// exports.create = (req, res) => {
//     var user = new User(req.body);
//     user.save((err) => {
//         if (err) {
//             console.log(chalk.red('Error while saving user'));
//             console.log(err);
//             return res.status(422).send({
//                 message: 'Error while creating category'
//             });
//         } else {
//             res.json(user);
//         }
//     });
// };


// exports.list = function (req, res) {
//     user.find().sort('-created').populate('name', 'email').exec(function (err, users) {
//         if (err) {
//             console.log(chalk.red('Error while fetching list of users'));
//             console.log(err);
//             return res.status(422).send({
//                 message: 'Error while creating category'
//             });
//         } else {
//             res.json(users);
//         }
//     });
// };


// exports.getByEmailId = (req, res) => {
//     var Id = new User(req.body.id);
//     user.findbyId(id)((err) => {
//         if (err) {
//             console.log(chalk.red('No data found '));
//             console.log(err);
//             return res.status(422).send({
//                 message: 'Error while fetching data'
//             });
//         } else {
//             res.json(user);
//         }
//     });
// };



var userController = (User) => {
    /**
*  Creating users
*/
    var create = (req, res) => {
        console.log("Json" +req.body);
        var user = new User(req.body);
        console.log("name" +user.name);
        user.save((err) => {
            if (err) {
                console.log(chalk.red('Error while saving user'));
                console.log(err);
                return res.status(422).send({
                    message: 'Error while creating User'
                });
            } else {
                res.json(user);
            }
        });
    };

    /**
 * List of users
 */
    var list = function (req, res) {
     
      User.find({}).sort('-created').populate('blogs').exec(function (err, users) {
            if (err) {
                console.log(chalk.red('Error while fetching list of users'));
                console.log(err);
                return res.status(422).send({
                    message: 'No Records found'
                });
            } else {
                res.json(users);
            }
        });
    };
    /**
     * get articles by id 
     */
    var getByEmailId = (req, res) => {
        var id = req.params.userId;
        User.findById(id, (err,user) => {
            if (err) {
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


    return {
        create: create,
        list: list,
        getByEmailId: getByEmailId
    }

}

module.exports = userController;