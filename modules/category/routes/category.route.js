
var categories = require('../controller/category.controller');

module.exports = (app, { Category }) => {

    var categoryController = require('../controller/category.controller')(Category);
    app.route('/api/Category')
        .get((req, res) => {
            res.send('Hello world');
        }).post(categoryController.create);
}