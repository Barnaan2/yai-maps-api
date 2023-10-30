const jwt = require('jsonwebtoken')
const User = require('../user/userModel');
const catchAsync = require('../error_handlers/catchAsync')
const AppError = require('../error_handlers/appError')
const { promisify } = require('util')


// protect method for controlling what to be accessed by users.

exports.protect = catchAsync(async (req,res,next)=>{
  try{
    let token;
    if(req.headers
      .authorization && req
      .headers.authorization.startsWith('Bearer')){
     // get token sent form the user.
     token = req.headers
     .authorization.split(' ')[1];
    }
    else{
      next(new AppError('Not Authorized',401));
    }
    const { id,iat } = await promisify(jwt.verify)(token,process.env
        .JWT_SECRET);
    
    const user = await User.findById(id); 
    if(!user){
        next(new AppError('Not Authorized',401));
    }
    req.user=user
    next()
  }

  catch(err){
    next(new AppError(err,400))
  }
})