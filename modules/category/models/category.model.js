var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    path = require('path'),
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
        required: 'Title cannot be blank'
    }
});

mongoose.model('Category', CategorySchema);