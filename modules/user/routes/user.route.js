var users = require('../controller/user.controller');

module.exports = (app) => {
    //for Users to create 
    app.route('/api/Users')
    .get(users.list)
    .post(users.create);

    app.route('/api/Users/:userId')
     .get(users.getByEmailId);
}