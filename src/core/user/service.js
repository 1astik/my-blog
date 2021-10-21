const userRepository = require('./repository')
const bcrypt = require('bcrypt')
const {checkErrorUniqueKey} = require('../../utils/db/error')

/**
 * @param {{email: String, password: String}} user
 * @return {import('./User').UserModel}
 */
async function createUser(user) {
    user.password = await bcrypt.hash(user.password, 10)

    const findUser = await userRepository
        .saveUser(user)
        .catch(err => checkErrorUniqueKey(err, 'User with this email already exists'))

    delete findUser.password
    delete findUser.updatedAt

    return user
}


module.exports = {
    createUser,
}
