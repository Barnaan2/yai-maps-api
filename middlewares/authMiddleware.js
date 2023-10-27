const jwt = require('jsonwebtoken')
const User = require('../models/userModel');
const catchAsync = require('../error_handlers/catchAsync')
const { promisify } =require('util')


// protect method for controlling what to be accessed by users.

exports.protect = catchAsync(async (req,res,next)=>{
let token;
if(req.headers.authorization && req.headers.startsWith('Bearer')){
 // get token sent form the user.
 token = req.headers.authorization.split(' ')[1];
}

else{
    return AppError('Not Authorized',401);
    next()
}
const { id } = await promisify(jwt.verify)(token,process.JWT_SECRET);
const user = await User.findById(id);
if(!user){
    return AppError('Not Authorized',401)
    next()
}
req.user =user
next()
})