const ApplicationError = require('utils/error')
const mongoose = require('mongoose')
const logger = require('@logger')


module.exports.error404 = function(req, res) {
    res.status(404).json({message: 'Not found'})
}

module.exports.errorHandler = function(error, req, res, next) {
    let status = 0, body = {}
    console.log(error)
     if (error instanceof ApplicationError) {

        status = ApplicationError.complianceHttpCode(error)
        body = error
    } else if (error instanceof mongoose.Error.ValidationError) {
        status = 400
        body.message = error.errors[Object.keys(error.errors)[0]]?.properties?.message || "Invalid data"
    } else if (error instanceof SyntaxError && error.type === 'entity.parse.failed') {
        status = 400
        body.message = 'Invalid data'
    } else {
        status = 500
        body.message = 'Internal server error'
    }

    if (!res.headersSent) {
        res.status(status).json(body)
    }

    if (status >= 500) {
        logger.error(error.message)
    }
}
