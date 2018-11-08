var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        default: 'Title of the article',
    },
    subtitle: {
        type: String,
        default: 'Something is really funny about this article.',
    },
    body: {
        type: String,
        default: 'Add content here',
    },
    coverImage: {
        type: String,
        default: 'Cover Page image',
    },
    isPublished: {
        type: Boolean,
        default: false
    },
    isDraft: {
        type: Boolean,
        default: true
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

ArticleSchema.statics.list = function (query = {}, callback) {
    return this.find(query).select('-body').populate('author', 'name img email');
}

module.exports = mongoose.model('Blog', ArticleSchema);    