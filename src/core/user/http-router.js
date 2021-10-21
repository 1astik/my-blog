const {createUser} = require('./http-controller')
const parse = require('helpers/parse')


/**
 * @param {import('express').Router} express
 */
module.exports = function (express) {
    const router = express.Router()

    router.post('/user',  parse.json, createUser)

    return router
}
