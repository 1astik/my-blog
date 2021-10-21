const postRepository = require('./repository')
const {ObjectId} = require('mongoose').Types
const {EntityNotExists} = require('utils/error')
const postEvents = require('./events')

/**
 * @param {{text:String}} post
 * @param {String} userId
 * @return {import('./Post').PostModel}
 */
async function createPost(post, userId) {
    return await postRepository.savePost({author: ObjectId(userId), ...post})
}

async function getPosts({page = 1, limit = 20}) {
    const options = {
        skip: (page - 1) * limit,
        limit,
        page
    }

    return postRepository.findPosts(options)
}

/**
 * @param {String} postId
 * @param {{text: String}} update
 * @param {String} userId
 * @return {import('./Post').PostModel}
 */
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

async function getPostById(postId, userId){
    return postRepository.getPostById(postId, userId)
}

module.exports = {
    createPost,
    getPosts,
    updatePost,
    deletePost,
    getPostById
}
