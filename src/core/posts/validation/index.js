const validationCompile = require('utils/validation')


module.exports = {
    createPost: validationCompile(require('./post-create.body')),
    getPosts: validationCompile(require('./get-posts.query')),
    updatePost: validationCompile(require('./update-post.body')),
}
