const mongoose = require('mongoose')
const config = require('@config')

async function connect(connectString = config.database.credentials.connectionString) {
    return await mongoose.connect(connectString, config.database.options)
}

async function finalConnection(connectString = config.database.credentials.connectionString) {
    const connection = await connect(connectString).catch((err) => {
        throw new Error(err.message)
    })

    return connection
}


module.exports = {
    finalConnection
}