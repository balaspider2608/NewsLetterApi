var path = require('path'),
    chalk = require('chalk'),
    config = require(path.resolve('./config/config')),
    { imageUpload } = require('../../lib');

var userController = (User) => {
    /**
    *  Creating users
    */

    var createOtherUser = (req, res) => {
        var user = new User(req.body);
        user.uniqueID = user.uniqueID.toLowerCase();
        if(user.uniqueID.indexOf("vcn") === -1){
            user.uniqueID = "vcn\\" + user.uniqueID;
        }
        user.save((err, data) => {
            if (err) {
                console.log(chalk.red(500));
                console.log(err);
                return res.status(500).send({
                    message: 'Error while creating or Updating User'
                });
            } else {
                return res.json(data);
            }
        });
    }

    var create = (req, res) => {
        var user = new User(req.body);
        user.uniqueID = req.connection.user.toLowerCase();
        delete user._id;
        if (user.uniqueID) {
            let query = {
                uniqueID: user.uniqueID
            }
            User.findOneAndUpdate(query, user, {
                upsert: true,
                new: true
            }, (err, Users) => {
                if (err) {
                    console.log(chalk.red(500));
                    console.log(err);
                    return res.status(500).send({
                        message: 'Error while creating or Updating User'
                    });
                } else {
                    res.json(Users);
                }
            });
        } else {
            console.log(chalk.red('ID not assigned'))
            return res.status(422).send({
                message: 'ID not mentioned'
            });
        }
    };
    /**
     * get articles by id 
     */
    var getByUserId = (req, res) => {
        // var id = req.params.userId;
        let uniqueID = "VCN\\" + req.query.userId; 
        User.find({
            uniqueID: uniqueID.toLowerCase()
        }, (err, user) => {
            if (err) {
                console.log(chalk.red('No data found '));
                console.log(err);
                return res.status(422).send({
                    message: 'Error while fetching data'
                });
            } else {
                if (Array.isArray(user)) {
                    res.json(user[0]);
                } else {
                    res.json(user)
                }
            }
        });
    };

    var getUser = (req, res) => {
        let uniqueID = req.connection.user;
        User.find({ uniqueID: uniqueID }, (err, user) => {
            if (err) {
                console.log(chalk.red('No data found'));
                console.log(err);
                return res.status(422).send({
                    message: 'User not found'
                });
            } else {
                res.json(user[0]);
            }
        });
    }

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
        getUser: getUser,
        getByUserId: getByUserId,
        uploadImage: userImages,
        createOtherUser: createOtherUser
    }

}

module.exports = userController;