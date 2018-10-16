import validators from '../../lib/validator';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;  
    // path = require('path');
    // chalk = require('chalk');

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

mongoose.model('Category', CategorySchema);