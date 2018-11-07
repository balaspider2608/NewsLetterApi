var bodyParser = require('body-parser');


module.exports = (app, { Blog, User }) => {
    var blogController = require('../controller/blog.controller')(Blog, User);
    app.route('/api/Blog')
        .get(blogController.getArticle)
        .post(blogController.create);
    app.use(bodyParser.urlencoded({
        extended: true
    })).route('/api/Blog/picture')
        .post(blogController.uploadImage);

    app.use((req, res, next) => {
        var nodeSSPI = require('node-sspi');
        var nodeSSPIObj = new nodeSSPI({
            retrieveGroups: true
        })
        nodeSSPIObj.authenticate(req, res, (err) => {
            res.finished || next()
        })
    }).route('/api/Blog/review')
        .get(blogController.getBlogForReview);
}