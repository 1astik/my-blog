const express = require('express')
const cors = require('cors')
const {errorHandler, error404} = require('./error')
const config = require('@config')

const routerPaths = [
    require('../../core/auth'),
    require('../../core/user'),
    require('../../core/posts'),
    require('../../core/media')
]

function createHttpServer() {

    const app = express()

    app.use(cors({
        origin: config.server.CORS.ALLOWED_ORIGINS,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
        optionsSuccessStatus: 204,
        allowedHeaders: config.server.CORS.ALLOWED_HEADERS
    }))

    routerPaths.forEach(routerPath => app.use(routerPath(express)))

    app.use(error404)
    app.use(errorHandler)

    return app
}


module.exports = createHttpServer
