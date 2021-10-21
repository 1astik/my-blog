const {EventEmitter} = require('events')
const {asyncEventsWrapper} = require('utils/error-wrappers')


class UserEvents extends EventEmitter {
    constructor() {
        super()
    }

    deletedPost(deletedPost) {
        this.emit('deleted-post', deletedPost)
    }

    onDeletedPost({handler, onError}) {
        return this.on('deleted-post', asyncEventsWrapper(handler, onError))
    }
}


module.exports = new UserEvents()