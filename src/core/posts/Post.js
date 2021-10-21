const {Schema, model} = require('mongoose')


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


