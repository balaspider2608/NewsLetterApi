
module.exports = (app, { Category }) => {
    var categoryController = require('../controller/category.controller')(Category);
    app.route('/api/Category')
        .get(categoryController.list)
        .post(categoryController.create);
    app.route('/api/Category/:categoryId')
        .get(categoryController.getById);
}