var users = require('../controller/user.controller');

module.exports = (app, { User }) => {
    //for Users to create 
    var userController = require('../controller/user.controller')(User);
    app.route('/api/Users')
        .get(userController.list)
        .post(userController.create);

    app.route('/api/Users/:userId')
        .get(userController.getByEmailId);
}