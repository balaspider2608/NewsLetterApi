module.exports = (app, { Category, Blog }) => {
    var blogController = require('../controller/blog.controller')(Category, Blog);
    app.route('/api/Blog')
        .get(blogController.getArticle)
        .post(blogController.create);
    app.route('/api/Blog/picture')
        .post(blogController.uploadImage);
}