const {Schema, model} = require('mongoose')

/**
 * @typedef MediaModel
 * @type {Object}
 * @property {import('mongoose').ObjectId} _id
 * @property {String} postId
 * @property {import('mongoose').ObjectId} gridFsId
 * @property {String} positionInText
 * @property {Date} updatedAt
 * @property {Date} createdAt
 *
 * @typedef {MediaModel} MediaModel
 */
const MediaSchema = new Schema(
    {
        postId: {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        },
        gridFsId: {
            type: Schema.Types.ObjectId,
        },
        positionInText: {
            type: String
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)


MediaSchema.index({postId: 1})


module.exports = model('Media', MediaSchema, 'media')


