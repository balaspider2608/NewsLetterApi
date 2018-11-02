module.exports = {
    app: {
        title: 'News Letter Api',
    }, 
    db: {
        promise: global.Promise,
        name: 'news-letter'
    }, 
    port: process.env.PORT || 3000,
    host: process.env.HOST || '127.0.0.1',
    uploads: {
        storage: process.env.UPLOADS_STORAGE || 'local',
        blog: {
            image: {
                dest: 'public/blog-images/',
                limits: {
                    fileSize: 10 * 1024 * 1024
                }
            }
        },
        user: {
            image: {
                dest: 'public/profile-images/',
                limits: {
                    fileSize: 10 * 1024 * 1024
                }
            }
        }
    },
    static: {
        blogImage: 'public/blog-images',
        profileImage: 'public/profile-images',
        staticImages: 'public/static-images'
    }
};