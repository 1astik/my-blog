const Post = require('./Post')
const {ObjectId} = require('mongoose').Types

const savePost = postData => new Post(postData)
    .save()
    .then(post => post.toJSON())

const updatePost = (postId, data, userId) => Post
    .findOneAndUpdate({_id: ObjectId(postId), author: ObjectId(userId)}, data, {new: true})
    .lean()

const deletePost = postId => Post
    .findByIdAndDelete({_id: ObjectId(postId)})
    .select({_id: 1})
    .lean()

const findPosts = (options) => Post.aggregate([
    { $lookup: { from: "media", localField: "_id", foreignField: "postId", as: "result" } },
    { $project: { "author":1, _id:1, "text": 1, "media": "$result" } },
    { $facet: {
            metadata: [ { $count: "total" }, { $addFields: { page: options.page } } ],
            data: [ { $skip: options.skip }, { $limit: options.limit } ]
        } }
    ]
)


module.exports = {
    savePost,
    findPosts,
    updatePost,
    deletePost,
}
