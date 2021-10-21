const {Schema, model} = require('mongoose')


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


