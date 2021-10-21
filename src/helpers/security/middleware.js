const authService = require('core/auth/service')
const {asyncHttpWrapper} = require('utils/error-wrappers')

module.exports.authorization = asyncHttpWrapper(
    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @param {Function} next
     */
    async (req, _, next) => {
        req.user = await authService.authorization(req.headers['authorization'])

        next()
    }
)