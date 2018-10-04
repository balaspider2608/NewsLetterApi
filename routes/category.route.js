var express = require('express');

var categoryRoutes = () => {
    var categoryRoute = express.Router();
    var categoryController = require('../controller/categoryController')();
    categoryRoute.route('/')
        .get(categoryController.get);

    return categoryRoute;
}

module.exports = categoryRoutes;