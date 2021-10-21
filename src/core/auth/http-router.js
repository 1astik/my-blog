const controller = require('./http-controller')
const parse = require('helpers/parse')


/** @param {import('express')} express */
module.exports = function(express) {
    const router = express.Router()

    router.post('/signin', parse.json, controller.signin)

    return router
}
