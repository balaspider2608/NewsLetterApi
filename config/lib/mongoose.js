var _ = require('lodash'),
    config = require('../config'),
    chalk = require('chalk'),
    path = require('path'),
    mongoose = require('mongoose');


module.exports.loadModels = (callback) => {
    config.files.server.models.forEach((modelPath) => {
        require(path.resolve(modelPath));
    });

    if (callback) callback();
}

// Intialize Mongoose connection
module.exports.connect = function (callback) {
    mongoose.Promise = config.db.promise;
    var options = config.db.options || {};
    mongoose
        .connect(config.db.uri, options)
        .then((connection) => {
            mongoose.set('debug', config.db.debug);

            if (callback) callback(connection.db);
        })
        .catch((err) => {
            console.error(chalk.red('Could not connect to MonGoDB!'));
            console.log(err);
        })
};


//Disconnect from Mongoose
module.exports.disconnect = function (cb) {
    mongoose.connection.db
        .close((err) => {
            console.info(chalk.yellow('Disconnected from mongose'));
            return cb(err);
        });
};