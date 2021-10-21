

/**
 * @typedef PostUpdateBody
 * @type {Object}
 * @property {String} text
 */


module.exports = {
    type: 'object',
    properties: {
        text: {
            type: 'string',
            minLength: 3,
            errorMessage: {
                minLength: 'The text cannot be shorter than three characters',
            }
        }
    },
    additionalProperties: false
}
