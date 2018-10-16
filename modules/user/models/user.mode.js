import validators from '../../lib/validator';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var UserSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        default: 'Anonymous',
        alias: 'User Name'
    }, 
    email: {
        type: String,
        default: 'User like to be Anonymous',
        alias: 'Email ID'
    },
    blogs: [{
        type: Schema.Types.ObjectId,
        ref: 'Blog'
    }],
    img: {
        alias: 'User Image',
        default: 'Default Image'
    }
});


mongoose.model('User', UserSchema);