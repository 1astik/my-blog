const {uploadMedia, downloadMedia, deleteMedia} = require('./http-controller')
const multer = require('multer')
const upload = multer({dest: "uploads"})
const security = require('helpers/security')


/**
 * @param {import('express').Router} express
 */
module.exports = function (express) {
    const router = express.Router()

    router.post('/media/:postId', security.authorization, upload.single('fieldName'), uploadMedia)

    router.get('/media/:gridFsId', security.authorization, downloadMedia)

    router.delete('/media/:mediaId', security.authorization, deleteMedia)

    return router
}
