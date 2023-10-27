const catchAsync = require('../error_handlers/catchAsync')
const User = require('../models/userModel')

// initial route for checking everything is working as excpected 
exports.getUsers = catchAsync(async(req,res,next)=>{
    const users = { 
        "barnaan":"developer"
    }
    res.status(200).json({
        status:"200_OK",
        data:{users}
    })
})