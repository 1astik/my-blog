const userService = require('./service')
const validation = require('./validation')
const {asyncHttpWrapper} = require('utils/error-wrappers')


module.exports.createUser = asyncHttpWrapper(
    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */
    async(req, res) => {
        validation.createUser(req.body)

        const response = await userService.createUser(req.body)

        res.status(201).json(response)
    }
)