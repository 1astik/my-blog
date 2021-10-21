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
    { $lookup: { from: "media", localField: "_id", foreignField: "postId", as: "media" } },
    { $lookup: { from: "users", localField: "author", foreignField: "_id", as: "user" } },
    {$unwind : "$user"},
    { $project: { "author":"$user.email", _id:1, "text": 1, "media": "$media" } },
    { $facet: {
            metadata: [ { $count: "total" }, { $addFields: { page: options.page } } ],
            data: [ { $skip: options.skip }, { $limit: options.limit } ]
        } }
    ]
)

const getPostById = (postId, userId) => Post
    .find({_id: postId, author: userId})
    .lean()


module.exports = {
    savePost,
    findPosts,
    updatePost,
    deletePost,
    getPostById
}
