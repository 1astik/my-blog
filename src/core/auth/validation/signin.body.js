

/**
 * @typedef Credentials
 * @type {Object}
 * @property {String} email
 * @property {String} password
 */


module.exports = {
    type: 'object',
    properties: {
        email: {
            type: 'string',
            minLength: 3,
            maxLength: 50,
            emailValidator: true,
            transform: ['trim', 'toLowerCase'],
            errorMessage: {
                minLength: 'The email address cannot be shorter than three characters',
                maxLength: 'The email address cannot be longer than 50 characters',
                emailValidator: 'Invalid email address'
            }
        },
        password: {
            type: 'string',
            minLength: 8,
            maxLength: 50,
            errorMessage: {
                minLength: 'The password cannot be shorter than 8 characters',
                maxLength: 'The password cannot be longer than 50 characters'
            }
        }
    },
    additionalProperties: false,
    required: ['email', 'password'],
    errorMessage: {
        required: {
            email: 'Email is required',
            password: 'A password is required'
        }
    }
}