const Media = require('./Media')
const mongoose = require("mongoose")
const {ObjectId} = require('mongoose').Types
const GridFsBucket = require('mongodb').GridFSBucket
const fs = require('fs')

const saveMedia = mediaData => new Media({positionInText:mediaData.positionInText, postId:ObjectId(mediaData.postId)})
    .save()
    .then(user => user.toJSON())


const uploadToGridFS = (
    {
        fileName,
        filePath,
        fileType,
    }
) =>
    new Promise((resolve, reject) => {
        try {
            const bucket = new GridFsBucket(mongoose.connection.db, {bucketName: 'media'})
            const uploadStream = bucket.openUploadStream(fileName, {contentType: fileType})

            const downloadStream = fs.createReadStream(filePath)
            /**
             * TIMEOUT ---
             */
            const timeout = setTimeout(() => {
                reject(new Error('Cancel Upload'))
                uploadStream.destroy(new Error('Cancel Upload Stream'))
                downloadStream.destroy(new Error('Cancel Download Stream'))
            }, 10000)

            uploadStream
                .on('error', error => {
                    reject(error)
                })
                .on('finish', () => {
                    resolve(ObjectId(uploadStream.id))
                    clearTimeout(timeout)
                })

            downloadStream
                .on('error', error => {
                    reject(error)
                    if (!uploadStream.destroyed) {
                        uploadStream.destroy(error)
                    }
                })
                .pipe(uploadStream)

        } catch (error) {
            reject(error)
        }
    })


const setGridFsId = (mediaId, gridFsId) => Media
    .updateOne(
        {
            _id: ObjectId(mediaId)
        },
        {
            gridFsId: ObjectId(gridFsId)
        }
    )


const findGridFsById = (gridFsId) => new GridFsBucket(mongoose.connection.db, {bucketName: 'media'}).find({_id: ObjectId(gridFsId)}).toArray()

const downloadGridFsById = (gridFsId) => new GridFsBucket(mongoose.connection.db, {bucketName: 'media'}).openDownloadStream(ObjectId(gridFsId))

const deleteGridFsById = (gridFsId) => new GridFsBucket(mongoose.connection.db, {bucketName: 'media'}).delete(ObjectId(gridFsId))

const deleteMedia = postId => Media
    .deleteMany({postId: ObjectId(postId)})

const findMedia = postId => Media
    .find({postId: ObjectId(postId)})
    .select({gridFsId: 1})
    .lean()


module.exports = {
    saveMedia,
    uploadToGridFS,
    setGridFsId,
    findGridFsById,
    downloadGridFsById,
    deleteMedia,
    deleteGridFsById,
    findMedia
}
