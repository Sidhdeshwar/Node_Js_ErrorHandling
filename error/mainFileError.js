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
  
   if(process.env.NODE_ENV=='development')
   {
    let error = {...err}
   
    if(err.name==='CastError') 
    {
        error = handleCastErrorDB(error)
    }
       devError(error,res);
       
   }
   else if(process.env.NODE_ENV=='production')
   {
    prodError(err,res);
   }

  }

  const handleCastErrorDB = (err)=>{
    const message = `Invalid ${err.path} : ${err.value}`
    return new createError(message, 400);
  }