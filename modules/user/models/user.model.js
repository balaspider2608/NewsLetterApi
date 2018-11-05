// import validators from '../../lib/validator';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    { lengthValidator } = require('../../lib');


var UserSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        default: 'Anonymous',
    },
    email: {
        type: String,
        default: 'User like to be Anonymous'
    },
    team: {
        type: String,
        default: 'No team known'
    },
    img: {
        type: String,
        default: 'http://localhost:8000/static/defaultUser.png'
    },
    isEditor: {
        type: Boolean,
        default: false
    },
    uniqueID: {
        type: String,
        default: 'AnonumusID'
    }
});


module.exports = mongoose.model('User', UserSchema);