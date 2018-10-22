// import validators from '../../lib/validator';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    validators = require('../../lib/validator');


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
        default: 'User like to be Anonymous',
        required: true
    },
    img: {
        type: String,
        default: 'Default Image'
    }
});


module.exports = mongoose.model('User', UserSchema);