const ErrorHandler = require('../utils/errorHandler');


module.exports = (err, req, res, next) => {
    //This sets the status code of the error to the statusCode property of the error object, 
    //or to 500 if the statusCode property is not defined.
    err.statusCode = err.statusCode || 500;

    if (process.env.NODE_ENV === 'DEVELOPMENT') {
        console.log(err);//if NODE_ENV---->error details are printed to the console.

        res.status(err.statusCode).json({//sends a JSON response to the client containing details about the error
            success: false,
            error: err,
            errMessage: err.message,
            stack: err.stack
        })
    }

    if (process.env.NODE_ENV === 'PRODUCTION') {
        let error = { ...err }//creates a new error object
        //copies all the properties of the original err object to it

        error.message = err.message;//sets the message property of the error object to the message

        // Wrong Mongoose Object ID Error
        if (err.name === 'CastError') {//value is not castable to the expected type.
            const message = `Resource not found. Invalid: ${err.path}`
            error = new ErrorHandler(message, 400)
        }

        // Handling Mongoose Validation Error
        if (err.name === 'ValidationError') {// checks if the error is a ValidationError
            const message = Object.values(err.errors).map(value => value.message);
            error = new ErrorHandler(message, 400)
        }

        // Handling Mongoose duplicate key errors
        if (err.code === 11000) {//checks if the error is a duplicate key error, 
            const message = `Duplicate ${Object.keys(err.keyValue)} entered`//which occurs when an insert operation violates a unique index
            error = new ErrorHandler(message, 400)
        }

        // Handling wrong JWT error
        if (err.name === 'JsonWebTokenError') {//checks if the error is a JsonWebTokenError,
            const message = 'JSON Web Token is invalid. Try Again!!!'
            error = new ErrorHandler(message, 400)
        }

        // Handling Expired JWT error
        if (err.name === 'TokenExpiredError') {//checks if the error is a expired JsonWebTokenError
            const message = 'JSON Web Token is expired. Try Again!!!'
            error = new ErrorHandler(message, 400)
        }

        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || 'Internal Server Error'
        })
    }

}