const {Schema, model} = require('mongoose')

/**
 * @typedef UserModel
 * @type {Object}
 * @property {import('mongoose').ObjectId} _id
 * @property {String} email
 * @property {Date} updatedAt
 * @property {Date} createdAt
 *
 * @typedef {UserModel} UserModel
 */
const UserSchema = new Schema(
    {
        email: {
            type: String,
            required: [true, 'E-mail is required']
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            select: false
        },
        updatedAt: {
            type: Date,
            select: false
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)


UserSchema.index({email: 1}, {unique: true})


module.exports = model('User', UserSchema, 'users')


