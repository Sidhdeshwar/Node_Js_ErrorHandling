module.exports = catchAsync = (fun)=>{  //this method only catch asyncronous Function (Methods)
    return (req,res,next1)=>{
       fun(req,res,next1).catch((err)=> next1(err));  // this is promise 
    }                          // Allela Error
  };


                