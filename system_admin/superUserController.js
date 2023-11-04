const AppError = require('../error_handlers/appError')
// const Project = require('../project/projectModel')
const catchAsync = require('../error_handlers/catchAsync')
const User = require('../user/userModel')

exports.addAdmin = catchAsync(async (req,res,next)=>{
    try{
// Here the users role should be changed to admin
const id = req.params.id
const data = {
    "role":"SystemAdmin"
}
const updatedUser = await User.findOneAndUpdate(id,data,{
    new:true,
    runValidators:false,
})
res.status(201).json({
    status:"201_UPDATED",
    data:{
       updatedUser
    }
})
    }
    catch(err){
        next(new AppError(err,400))
    }
})


exports.removeAdmin = catchAsync(async (req,res,next)=>{
    try{
// Here the users role should be changed to User
const id = req.params.id
const data = {
    "role":"User"
}
const updatedUser = await User.findOneAndUpdate(id,data,{
    new:true,
    runValidators:false,
})
res.status(201).json({
    status:"201_UPDATED",
    data:{
        updatedUser
    }
})
    }
    catch(err){
        next(new AppError(err,400))
    }
})
