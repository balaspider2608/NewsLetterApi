var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    validators = require('../../lib/validator');  
    chalk = require('chalk');

var CategorySchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        default: '',
        trim: true,
        required: 'Title cannot be blank',
        validate: [validators.lengthValidator({
            length: {
                min: 3,
                max: 20
            }
        }), 'Title between 3 to 20 are more funny.']
    },
    blog: [{
        type: Schema.Types.ObjectId,
        ref: 'Blog' 
    }]
});

module.exports = mongoose.model('Category', CategorySchema);