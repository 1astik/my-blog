const bodyParser = require('body-parser')

module.exports.json = bodyParser.json({limit: '100kb'})