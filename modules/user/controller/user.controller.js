var path = require('path'),
    chalk = require('chalk'),
    config = require(path.resolve('./config/config')),
    { imageUpload } = require('../../lib');


var userController = (User) => {
    /**
*  Creating users
*/
    var create = (req, res) => {
        var user = new User(req.body);
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
        User.findById(id, (err, user) => {
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

    var userImages = (req, res) => {
        imageUpload(req, res, config.uploads.user.image.dest)()
            .then((loc) => {
                res.json(loc);
            })
            .catch((err) => {
                res.status(422).send(err);
            });
    }


    return {
        create: create,
        list: list,
        getByEmailId: getByEmailId,
        uploadImage: userImages
    }

}

module.exports = userController;