/**
 * @typedef CreateMediaBody
 * @type {Object}
 * @property {String} positionInText
 */


module.exports = {
    type: 'object',
    properties: {
        positionInText: {
            type: 'string',
            minLength: 3,
            transform: ['trim'],
            errorMessage: {
                minLength: 'The positionInText address cannot be shorter than three characters',
            }
        }
    },
    additionalProperties: false,
    required: ['positionInText'],
    errorMessage: {
        required: {
            positionInText: 'positionInText is required',
        }
    }
}
