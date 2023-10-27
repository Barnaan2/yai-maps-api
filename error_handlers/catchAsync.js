// Global error handler method for the Asynchronous method.
module.exports  = catchAsync = fn =>{
    return (req,res,next) =>{
        fn(req,res,next).catch(err => next(err));
    }
}