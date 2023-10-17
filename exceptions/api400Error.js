const httpStatusCodes = require('./httpStatusCodes')
const BaseError = require('./baseError')

class Api400Error extends BaseError {
 constructor (
 name,
 statusCode = httpStatusCodes.BAD_REQUEST,
 description = 'Not found.',
 isOperational = true
 ) {
 super(name, statusCode, isOperational, description)
 }
}

module.exports = Api400Error