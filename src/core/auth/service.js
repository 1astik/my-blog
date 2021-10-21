const userRepository = require('../user/repository')
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')
const config = require('@config')
const {EntityExists, Unauthorized} = require('utils/error')


/**
 * @param {import('./validation/signin.body').Credentials} credentials 
 */
async function signin(credentials) {
    const userRecord = await userRepository.findUserByEmail(credentials.email)

    if (!userRecord)
        throw new EntityExists('User not found or invalid password')

    const correctPassword = await bcrypt.compare(credentials.password, userRecord.password)

    if (!correctPassword)
        throw new EntityExists('User not found or invalid password')

    delete userRecord.password

    userRecord.jwt = jsonwebtoken.sign(
        {
            id: userRecord._id.toString()
        },
        config.auth.jwt.secret,
        {
            expiresIn: config.auth.jwt.expires,
            algorithm: 'HS256'
        }
    )

    return userRecord
}

/**
 * @param {String} jwt
 */
function verifyJwt(jwt) {
    try {
        return jsonwebtoken.verify(jwt, config.auth.jwt.secret, {algorithms: ['HS256']})
    } catch {
        throw new Unauthorized()
    }
}

/**
 * @param {String} bearerToken
 */
async function authorization(bearerToken) {
    if (!bearerToken)
        throw new Unauthorized()

    const [bearer, jwt] = bearerToken.split(' ')

    if (bearer !== 'Bearer')
        throw new Unauthorized()

    const playload = verifyJwt(jwt)

    const user = await userRepository.findUserById(playload.id)

    if (!user)
        throw new Unauthorized()

    return user
}


module.exports = {
    signin,
    authorization
}
