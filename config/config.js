var _ = require('lodash'),
    chalk = require('chalk'),
    glob = require('glob'),
    fs = require('fs'),
    path = require('path');


var validateEnvironmentVariable = () => {
    var environmentFiles = glob.sync('./config/env/' + process.env.NODE_ENV + '.js');
    if (!environmentFiles.length) {
        if (process.env.NODE_ENV) {
            console.log(chalk.red('+ Error: No config file found for "' + process.env.NODE_ENV + '", fallback to development instead'));
        } else {
            console.error(chalk.red('+Error: Env is not defined, fallback to development instead'));
        }
        process.env.NODE_ENV = 'development';
    }
}

var initGlobalConfigFolders = (config, assets) => {
    config.folders = {
        server: {}
    }
}

var initGlobalConfigFiles = (config, assets) => {
    config.files = {
        server: {}
    }
}


