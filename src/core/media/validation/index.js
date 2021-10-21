const validationCompile = require('utils/validation')


module.exports = {
    createMedia: validationCompile(require('./media-create.body'))
}
