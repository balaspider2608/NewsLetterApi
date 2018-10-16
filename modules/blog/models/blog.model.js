var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        default: 'No title',
        required: [true, 'Why no title?']
    },
    stitle: {
        type: String,
        default: 'Something is really funny about this article.',
        required: [true, 'The article attracts more people with subtitle.'],
    },
    body: {
        type: String,
        required: [true, 'A blog with content is intresting!!!!'],
    },
    cim: {
        type: String,
        default: 'Cover Page image',
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }
});

mongoose.model('Blog', ArticleSchema);    