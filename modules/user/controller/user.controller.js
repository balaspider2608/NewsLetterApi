var path = require('path'),
    chalk = require('chalk'),
    config = require(path.resolve('./config/config')),
    { imageUpload } = require('../../lib');


var userController = (User) => {
    /**
    *  Creating users
    */
    var create = (req, res) => {
        console.log(req.body);
        var user = new User(req.body);
        user.uniqueID = req.connection.user;
        delete user._id;
        console.log(user);
        if(user.uniqueID){
            let query = {
                uniqueID: user.uniqueID
            }
            User.findOneAndUpdate(query, user, {
                upsert: true,
                new: true
            }, (err, Users) => {
                if(err){
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

    var getUser = (req, res) => {
        let uniqueID = req.connection.user;
        User.find({uniqueID : uniqueID}, (err, user) => {
            if(err){
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
        getByEmailId: getByEmailId,
        uploadImage: userImages
    }

}

module.exports = userController;