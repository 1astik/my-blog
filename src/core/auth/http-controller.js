const service = require('./service')
const validation = require('./validation')
const {asyncHttpWrapper} = require('utils/error-wrappers')


module.exports.signin = asyncHttpWrapper(
    /**
     * @param {import('express').Request & {body: import('./validation/signin.body').Credentials}} req
     * @param {import('express').Response} res
     */
    async (req, res) => {

        validation.signin(req.body)

        const response = await service.signin(req.body)

        res.status(200).json(response)
    }
)
