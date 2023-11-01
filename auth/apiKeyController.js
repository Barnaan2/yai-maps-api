const AppError = require('../error_handlers/appError')
const catchAsync = require('../error_handlers/catchAsync')
const apiKeyUtils = require('./apiKeyUtils')


// generating api key.
exports.generateApiKey = catchAsync(async(req,res,next)=>{

    try{

        const apiKey = apiKeyUtils.apiKeyGenerator() 
        let user = req.user
        console.log(user.apiKey)
        console.log(user.phoneNumber)
        user.apiKey = apiKey
        console.log(user.apiKey)
    
        // there is an error at this point and i should fix it.
        // await user.save()
        res.status(200).json({
            status:"201_CREATED",
             data:{
             "user":req.user.apiKey
         }
        })
    }
    catch(err){
        next(new AppError(err,400))
    }
})

