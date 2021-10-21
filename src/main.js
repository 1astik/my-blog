require('module-alias/register')
const createHttpServer = require('./servers/http')
const db = require('./utils/db')
const config = require('@config')
const logger = require('@logger')

const events = require('core/media/events-controller')

;(async function main() {
    const res = await db.finalConnection(config.database.credentials.connectionString)

    logger.info(`Connecting to the database. DB name: ${res.connection.name}. DB host: ${res.connection.host}`, 'main')

    const server = createHttpServer()

    events() //Initial event emitter

    server.listen(config.server.HTTP.PORT, () => logger.info(`Http server has been started. Port: ${config.server.HTTP.PORT}`))
})()