var _ = require('lodash'),
    config = require('../config'),
    chalk = require('chalk'),
    path = require('path'),
    mongoose = require('mongoose');



// Intialize Mongoose connection
module.exports.connect = function (callback) {
    mongoose.Promise = config.db.promise;
    var options = _.merge(config.db.options || {}, { useMongoClient: true });
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