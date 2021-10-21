const mediaService = require('./service')
const postEvents = require('../posts/events')
const logger = require('@logger')


module.exports = function() {
    postEvents
        .onDeletedPost(
            {
                handler: async deletedPost => await mediaService.deleteMediaByPostId(deletedPost._id),
                onError: (error, deletedPost) => logger.error(`Delete post ${deletedPost._id}. Error: ` + error.message)
            }
        )
}
