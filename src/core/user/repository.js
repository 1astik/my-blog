const User = require('./User')

const saveUser = userData => new User(userData)
    .save()
    .then(user => user.toJSON())


const findUserByEmail = email => User
    .findOne({email})
    .select('+password')
    .lean()


const findUserById = userId => User
    .findById(userId)
    .lean()


module.exports = {
    saveUser,
    findUserByEmail,
    findUserById,
}
