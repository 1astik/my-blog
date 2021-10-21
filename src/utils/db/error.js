const {IncorrectData} = require("../error");

/** @param {Error} error @throws {Error|BadRequest} */
function checkErrorUniqueKey(error, message) {
    if (error.name === 'MongoError' && error.code === 11000)
        throw new IncorrectData(message)
    else
        throw error
}

module.exports = {
    checkErrorUniqueKey
}