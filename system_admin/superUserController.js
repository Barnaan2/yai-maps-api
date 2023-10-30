const AppError = require('../error_handlers/appError')
// const Project = require('../project/projectModel')
const catchAsync = require('../error_handlers/catchAsync')
const User = require('../user/userModel')

exports.addAdmin = catchAsync(async (req,res,next)=>{
    try{
// Here the users role should be changed to admin
const id = req.params.id
const user = await User.findById(id)
user.role = "SystemAdmin"
await user.save()
res.status(201).json({
    status:"201_UPDATED",
    data:{
        user
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
const user = await User.findById(id)
user.role = "User"
await user.save()
res.status(201).json({
    status:"201_UPDATED",
    data:{
        user
    }
})
    }
    catch(err){
        next(new AppError(err,400))
    }
})
