const mediaRepository = require('./repository')
const fs = require("fs");
const path = require("path");
const logger = require('@logger')
const {EntityNotExists} = require('utils/error')

/**
 * @param {{positionInText: String, postId: String}} media
 * @param {{fileName: String, fileType: String}} fileStat
 * @returns {Promise<void>}
 */
async function uploadMedia(media, fileStat) {
    const createMedia = await mediaRepository.saveMedia(media)
    fileStat.filePath = path.resolve(__dirname, '../../../uploads', fileStat.fileName)
    const uploadFile = await mediaRepository.uploadToGridFS(fileStat)

    await mediaRepository.setGridFsId(createMedia._id, uploadFile)

    fs.rm(fileStat.filePath, err =>err && logger.error(err))
}

async function findMedia(gridFsId) {
    const media = await mediaRepository.findGridFsById(gridFsId)

    if (media.length === 0) {
        throw new EntityNotExists('Media not found')
    }

    return {
        downloadStream: mediaRepository.downloadGridFsById(gridFsId),
        filetype: media[0].contentType
    }
}

async function deleteMediaByPostId(postId){
    const media = await mediaRepository.findMedia(postId)

    const promises = media.map(({gridFsId}) => {
        const promises = []

        promises.push(mediaRepository.deleteGridFsById(gridFsId))

        return Promise.all(promises)
    })

    promises.push(mediaRepository.deleteMedia(postId))

    return void (await Promise.all(promises))
}


module.exports = {
    uploadMedia,
    findMedia,
    deleteMediaByPostId
}
