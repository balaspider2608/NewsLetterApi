var bodyParser = require('body-parser');

module.exports = (app, { User }) => {
    var userController = require('../controller/user.controller')(User);
    //VCN ID fetching only for Users.....
    app.use((req, res, next) => {
        var nodeSSPI = require('node-sspi');
        var nodeSSPIObj = new nodeSSPI({
            retrieveGroups: true
        })
        nodeSSPIObj.authenticate(req, res, function (err) {
            res.finished || next()
        })
    }).route('/api/User')
        .get(userController.getUser)
        .post(userController.create);
    app.use(bodyParser.urlencoded({
        extended: true
    })).route('/api/User/picture')
        .post(userController.uploadImage);
    app.route('/api/User/:userId')
        .get(userController.getByEmailId);
}