const userRepository = require('./repository')
const bcrypt = require('bcrypt')
const {checkErrorUniqueKey} = require('../../utils/db/error')


async function createUser(user) {
    user.password = await bcrypt.hash(user.password, 10)

    user = await userRepository
        .saveUser(user)
        .catch(err => checkErrorUniqueKey(err, 'User with this email already exists'))

    delete user.password
    delete user.updatedAt

    return user
}


module.exports = {
    createUser,
}
