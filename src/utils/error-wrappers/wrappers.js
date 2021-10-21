module.exports.asyncHttpWrapper = func => (...args) => Promise.resolve(func(...args)).catch(args[args.length - 1])
module.exports.asyncEventsWrapper = (func, handler) => (...args) => Promise
    .resolve(func(...args))
    .catch(error => handler(error, ...args))