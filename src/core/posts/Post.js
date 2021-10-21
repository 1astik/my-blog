const {Schema, model} = require('mongoose')

/**
 * @typedef PostModel
 * @type {Object}
 * @property {import('mongoose').ObjectId} _id
 * @property {String} author
 * @property {String} text
 * @property {Date} updatedAt
 * @property {Date} createdAt
 *
 * @typedef {PostModel} PostModel
 */
const PostSchema = new Schema(
    {
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        text: {
            type: String,
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


module.exports = model('Post', PostSchema, 'posts')


