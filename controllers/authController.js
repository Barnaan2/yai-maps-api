const catchAsync = require('../error_handlers/catchAsync')
const User = require('../models/userModel');
const authUtils = require('../utils/authUtils')
const AppError = require('../error_handlers/appError')

exports.register = catchAsync( async(req,res,next)=>{

    if(req.body.password !== req.body.confirmPassword){
        next(new AppError('Password must be the same!',400))
    }
    const newUser = await User.create({
        phoneNumber:req.body.phoneNumber,
        password:req.body.password,
        confirmPassword:req.body.confirmPassword
    });


    const token = authUtils.signToken(newUser._id);
    res.status(201).json({
        status:"201_CREATED",
        data:{
            token,
            role:newUser.role
        }
    });
})



// Login controller.
exports.login = catchAsync(async(req,res,next )=>{
    if(!(req.body.password && req.body.phoneNumber)){
        next(new AppError('Both phone number{phoneNumber} and password{password} should be provided to login !',400));
    }    
     // after being sure we have both phone number and password for the user.
     const user = await User.findOne({
        phoneNumber:req.body.phoneNumber
     }).select('+password');
    
     if(user){
        const correct = await user.correctPassword(req.body.password,user.password);
        if(correct){
            const token  = authUtils.signToken(user._id);
            res.status(200).json({
                status:'Successful',
                data:{
                  token,
                  role:user.role  
                }
            })
        }
        else{
            next(new AppError("User phoneNumber doesn't exits or the password is not correct!",400))
        }
     }
     else{
        next(new AppError("User phoneNumber doesn't exits or the password is not correct!",400))
     }
    })
