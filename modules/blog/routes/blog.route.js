var bodyParser = require('body-parser');


module.exports = (app, { Category, Blog }) => {
    var blogController = require('../controller/blog.controller')(Category, Blog);
    app.route('/api/Blog')
        .get(blogController.getArticle)
        .post(blogController.create);
    app.use(bodyParser.urlencoded({
        extended: true
    })).route('/api/Blog/picture')
        .post(blogController.uploadImage);
}