const path = require('path')

module.exports = {
    database: {
        credentials: {
            connectionString: process.env.DB_CONNECTION || 'mongodb+srv://admin:pH6Q5E7ZjDbHmgk@cluster0.ugnuu.mongodb.net/MyBlog?retryWrites=true&w=majority'
        },
        options: {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
            useCreateIndex: true,
            ignoreUndefined: true
        }
    },
    auth: {
        jwt: {
            secret:  process.env.JWT_SECRET || 'password',
            expires: 86400
        }
    },
    server: {
        HTTP: {
            PORT: process.env.PORT || 8090
        },
        CORS: {
            ALLOWED_HEADERS: ['origin', 'authorization', 'content-type'],
            ALLOWED_ORIGINS: ['http://localhost:8080']
        }
    },
    path: {
        upload_media: path.resolve(__dirname, '../../uploads')
    }
};