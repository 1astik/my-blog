const {Schema, model} = require('mongoose')


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


