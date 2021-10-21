const mediaService = require('./service')
const postService = require('../posts/service')
const validation = require('./validation')
const {asyncHttpWrapper} = require('utils/error-wrappers')
const {validationId} = require('utils/validation')
const {EntityNotExists} = require('utils/error')

module.exports.uploadMedia = asyncHttpWrapper(
    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */
    async(req, res) => {
        validationId(req.params.postId)

        validation.createMedia(req.body)

        const fileStat = {
            fileName: req.file.filename,
            fileType: req.file.originalname.split('.')[1]
        }

        const post = await postService.getPostById(req.params.postId, req.user._id)

        if (!post){
            throw new EntityNotExists('Post not found')
        }

        await mediaService.uploadMedia({positionInText: req.body.positionInText, postId: req.params.postId}, fileStat)

        res.status(201).json("File upload successful")
    }
)


module.exports.downloadMedia = asyncHttpWrapper(
    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */
    async(req, res) => {
        validationId(req.params.gridFsId)

        const {downloadStream, filetype} = await mediaService.findMedia(req.params.gridFsId)

        res.setHeader('Content-Type', 'application/' + filetype)

        downloadStream
            .on('error', () => {
                if (!res.headersSent) {
                    res.setHeader('Content-Type', 'application/json')
                    res.status(404).json({message: 'File not found'})
                }
            })
            .pipe(res)
    }
)