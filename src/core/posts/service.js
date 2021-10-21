const postRepository = require('./repository')
const {ObjectId} = require('mongoose').Types
const {EntityNotExists} = require('utils/error')
const postEvents = require('./events')


async function createPost(post, userId) {
    post.author = ObjectId(userId)

    return await postRepository.savePost(post)
}

async function getPosts({page = 1, limit = 20}) {
    const options = {
        skip: (page - 1) * limit,
        limit,
        page
    }

    return postRepository.findPosts(options)
}

async function updatePost(postId, update, userId) {
    const updatePost = await postRepository.updatePost(postId, update, userId)

    if (!updatePost) {
        throw new EntityNotExists('Post is not exist.')
    }

    return updatePost
}

async function deletePost(postId) {
    const deletedPost = await postRepository.deletePost(postId)

    if (!deletedPost) {
        throw new EntityNotExists('Post not found')
    }

    postEvents.deletedPost(deletedPost)
}

module.exports = {
    createPost,
    getPosts,
    updatePost,
    deletePost
}
