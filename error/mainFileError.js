const createError = require('../utilities/craeteError')
const devError = (err,res)=>{
    res.status(err.statusCode).json({
        status: err.status,
        message : err.message,
        error: err,
        stack: err.stack
      })
}

const prodError = (err,res)=>{
    if(err.isOperational)
    {
        res.status(err.statusCode).json({
            status: err.status,
            message : err.message,
          })
    }
    else
    {
        console.error("ERROR : BLast " )
        res.status(404).json({
            status: 'errorsssssssss',
            message : "DANGER"
        })
    }
}

module.exports = (err,req,res,next)=>{
    console.log("Error Location : ",err.stack) ; //It console the error location 
    err.statusCode = err.statusCode || 500; //err madhe code nasel tr
    err.status = err.status || 'Error'; //err madhe status nasel tr
    console.log(process.env.NODE_ENV)
   if(process.env.NODE_ENV=='development')
   {
    let error = {...err}
   
    if(err.name==='CastError') 
    {
        console.log("A")
        error = handleCastErrorDB(error);
        devError(error,res);
    }
    if(error.code==11000)
    {console.log("B")
        error = handleDuplicateFieldsDB(error);
        devError(error,res);
    }
    if(error.name=='validationError')
    {
        console.log("C")
        error = handdleValidationErrorDB(error);
        devError(error,res);
    }
    else
    {
         console.log("Z")
        res.status(err.statusCode).json({
            status:err.status,
            message : err.message
        })
    }
   }
   else if(process.env.NODE_ENV=='production')
   {
    console.log("D")
    prodError(err,res);
    
   }
   else
   {
    console.log("E");
    res.status(err.statusCode).json({
        status:err.status,
        message : err.message
    })
   }

  }

  const handleCastErrorDB = (err)=>{
    const message = `Invalid ${err.path} : ${err.value}`
    return new createError(message, 400);
  }

  const handleDuplicateFieldsDB = (err) =>{
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    console.log("handleDuplicateFieldsDB : ==>",value);
    const message = `Duplicate field value : ${value}. Please use another value!!!!!!!!!!!!!.`;
    return new createError(message,400);
  }

  const handdleValidationErrorDB = (err)=>{
    const errors = Object.values(err.errors).map(el=>el.message);
    const message = `Invalied input data. ${errors.join(',,, ')}`; // Combine multiple errors in = 1; & join
    return new createError(message,400);
  }