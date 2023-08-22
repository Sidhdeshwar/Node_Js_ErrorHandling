class mainFileError extends Error{
    constructor(message, statusCode)
    {
        super(message);
        this.statusCode = statusCode;   
        this.status = `${statusCode}`.startsWith('4') ? 'status fail' : 'error';
        this.isOperational = true; //? optional (don't No)

        Error.captureStackTrace(this, this.constructor); //?optional
    }
}

module.exports = mainFileError;