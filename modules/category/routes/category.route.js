
var categories = require('../controller/category.controller');

module.exports = (app) => {
    app.route('/api/Category')
    .get((req, res) => {
        res.send('Hello world');
    }).post(categories.create);
}