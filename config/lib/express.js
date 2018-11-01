var config = require('../config'),
    express = require('express'),
    morgan = require('morgan'),
    logger = require('./logger'),
    bodyParser = require('body-parser'),
    path = require('path'),
    _ = require('lodash'),
    ntlm = require('express-ntlm'),
    cors = require('cors');


var whitelist = config.cors.whiteList;

var corsOptionsDelegate = (req, callback) => {
    var corsOptions;
    if (whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true };
    } else {
        corsOptions = { origin: false }
    }
    callback(null, corsOptions);
}

module.exports.initMiddleware = (app) => {
    app.use(cors(corsOptionsDelegate));
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(bodyParser.json());

    if (_.has(config, 'log.format')) {
        app.use(morgan(logger.getLogFormat(), logger.getMorganOptions()));
    }

    // app.use(ntlm());
}

module.exports.initStaticFiles = (app) => {
    if (_.has(config, 'static')) {
        Object.keys(config.static)
            .forEach(key =>
                app.use('/static', express.static(config.static[key]))
            );
    }
}

module.exports.initModuleRoutes = (app, models) => {
    config.files.server.routes.forEach((routePath) => {
        require(path.resolve(routePath))(app, models);
    });
}

module.exports.init = (db, models) => {
    var app = express();
    this.initMiddleware(app);
    this.initModuleRoutes(app, models);
    this.initStaticFiles(app);
    return app;
}