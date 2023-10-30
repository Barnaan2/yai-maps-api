const catchAsync = require('../error_handlers/catchAsync')
const AppError = require('../error_handlers/appError')


exports.isAdmin = catchAsync( async (req,res,next) =>{
  
  try{
      if(!(req
           .user
           .role == "SystemAdmin" ||  req
           .user
       .role =="SuperUser"))
   {
   next(new AppError('Not Found',404))
   }
   next()
  } 
  catch(err){
    next(new AppError(err,400))
  }
})



exports.isSuperUser = catchAsync(async (req,res,next)=>{
    try{
        if(!(req.user.role == "SuperUser")){
            next(new AppError('Not Found',400))
        }

        next()
    }

    catch(err){
        next(new AppError(err,400))
    }
})