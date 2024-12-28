// Error Handler Class
class ErrorHandler extends Error {//create new instances of the ErrorHandler class
    constructor(message, statusCode) {//message and HTTP status code
        super(message);
        this.statusCode = statusCode

        Error.captureStackTrace(this, this.constructor)//capture the stack trace of the error
    }
}

module.exports = ErrorHandler;