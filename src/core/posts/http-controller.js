const postService = require('./service')
const validation = require('./validation')
const {asyncHttpWrapper} = require('utils/error-wrappers')
const {validationId} = require('utils/validation')


module.exports.getPosts = asyncHttpWrapper(
    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */
    async(req, res) => {
        validation.getPosts(req.query)

        const response = await postService.getPosts(req.query)

        res.status(200).json(response)
    }
)

module.exports.createPost = asyncHttpWrapper(
    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */
    async(req, res) => {
        validation.createPost(req.body)

        const response = await postService.createPost(req.body, req.user._id)

        res.status(201).json(response)
    }
)

module.exports.updatePost = asyncHttpWrapper(
    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */
    async (req, res) => {

        validationId(req.params.postId)

        validation.updatePost(req.body)

        const response = await postService.updatePost(req.params.postId, req.body, req.user._id)

        res.status(200).json(response)
    }
)

module.exports.deletePost = asyncHttpWrapper(
    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */
    async(req, res) => {
        validationId(req.params.postId)

        await postService.deletePost(req.params.postId)

        res.status(200).json({message: `Post deleted`})
    }
)