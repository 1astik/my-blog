const Ajv = require('ajv').default
const ajv = new Ajv({
    removeAdditional: true,
    useDefaults: true,
    coerceTypes: true,
    allErrors: true,
    allowUnionTypes: true
})
require('ajv-errors')(ajv, {singleError: false, keepErrors: false})
require('ajv-keywords')(ajv)
const emailValidator = require('email-validator')
const {IncorrectData} = require('utils/error')


class JsonSchemaValidationError extends IncorrectData {
    constructor(message) {
        super(message, 1)
    }
}

ajv.addKeyword({
    keyword: 'emailValidator',
    validate: (_, data) => emailValidator.validate(data)
})

/** Schema validation mongodb string-id */
const schemaValidationId = {
    type: 'string',
    regexp: "/^[0-9a-fA-F]{24}$/",
    errorMessage: {
        regexp: 'Invalid unique identifier'
    }
}

const validationId = ajv.compile(schemaValidationId)

module.exports = function(schema) {
    const validate = ajv.compile(schema)
    return function (data) {
        validate(data)
        if (validate.errors) {
            throw new JsonSchemaValidationError(validate.errors[0].message)
        }
    }
}

module.exports.baseCompile = function (schema) {
    const validate = ajv.compile(schema)
    return function (data) {
        validate(data)
        return validate.errors
    }
}

module.exports.validationId = function(id) {
    validationId(id)
    if (validationId.errors) {
        throw new JsonSchemaValidationError(validationId.errors[0].message)
    }
}

module.exports.schemaValidationId = schemaValidationId