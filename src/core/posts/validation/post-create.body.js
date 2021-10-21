

/**
 * @typedef CreatePostBody
 * @type {Object}
 * @property {String} text
 */


module.exports = {
    type: 'object',
    properties: {
        text: {
            type: 'string',
            minLength: 3,
            transform: ['trim'],
            errorMessage: {
                minLength: 'The text cannot be shorter than three characters',
            }
        },
    },
    additionalProperties: false,
    required: ['text'],
    errorMessage: {
        required: {
            text: 'Text is required',
        }
    }
}
