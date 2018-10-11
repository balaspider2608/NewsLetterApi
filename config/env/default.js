module.exports = {
    app: {
        title: 'News Letter Api',
    }, 
    db: {
        promise: global.Promise,
        name: 'news-letter'
    }, 
    port: process.env.PORT || 3000,
    host: process.env.HOST || '127.0.0.1'
};