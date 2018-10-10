var config = require('../config'),
    mongooseService = require('./mongoose'),
    express = require('./express'),
    chalk = require('chalk');

module.exports.init = (callback) => {
    mongooseService.connect(db => {
        var app = express.init(db);
        if (callback)
            callback(app, db, config);
    });
};

module.exports.start = (callback) => {
    var _this = this;

    _this.init((app, db, config) => {
        app.listen(config.port, config.host, (err) => {
            var server = process.env.NODE_ENV + ':' + config.port;
            console.log(chalk.green('Environment:     ' + process.env.NODE_ENV));
            console.log(chalk.green('Server:          ' + server));
            console.log(chalk.green('Database:        ' + config.db.uri));
            console.log(chalk.green('App version:     ' + config.meanjs.version));
            if (callback)
                callback(app, db, config);
        })
    })
}