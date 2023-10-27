const catchAsync = require('../error_handlers/catchAsync')


// initial route for checking everything is working as excpected 
exports.getUsers = catchAsync(async(req,res,next)=>{
    // const items = await UserActivation.find();
    const users = {
        "barnaan":"developer"
    }
    res.status(200).json({
        status:"Successful",
        data:{users}
    })
})