

/**
 * @typedef GetPostsQuery
 * @type {Object}
 * @property {Number} [limit]
 * @property {Number} [page]
 */


module.exports = {
    type: 'object',
    properties: {
        limit: {
            type: 'number',
            minimum: 1,
            maximum: 1000,
            errorMessage: {
                minimum: 'The number of users displayed must be a positive integer.',
                maximum: 'The maximum number of users displayed is limited to 1000.',
                type: 'The number of users must be a positive integer in the decimal system.'
            }
        },
        page: {
            type: 'number',
            minimum: 1,
            maximum: 100000000,
            errorMessage: {
                minimum: 'The page number must be a positive integer.',
                maximum: 'The page number cannot exceed 100000000',
                type: 'The number of pages must be a positive integer in the decimal system.'
            }
        }
    }
}