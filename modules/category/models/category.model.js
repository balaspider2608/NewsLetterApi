var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    { lengthValidator } = require('../../lib');  
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
        validate: [lengthValidator({
            length: {
                min: 3,
                max: 20
            }
        }), 'Title between 3 to 20 are more funny.']
    },
    isBody: {
        type: Boolean,
        default: true
    },
    blog: [{
        type: Schema.Types.ObjectId,
        ref: 'Blog' 
    }]
});

module.exports = mongoose.model('Category', CategorySchema);