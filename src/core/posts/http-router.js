const {getPosts, createPost, updatePost, deletePost} = require('./http-controller')
const parse = require('helpers/parse')
const security = require('helpers/security')


/**
 * @param {import('express').Router} express
 */
module.exports = function (express) {
    const router = express.Router()

    router.get('/posts', parse.json, getPosts)

    router.post('/posts', security.authorization,  parse.json, createPost)

    router.patch('/posts/:postId', security.authorization,  parse.json, updatePost)

    router.delete('/posts/:postId', security.authorization,  parse.json, deletePost)

    return router
}
