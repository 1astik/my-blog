const validationCompile = require('utils/validation')


module.exports = {
    createUser: validationCompile(require('./user-create.body'))
}
