const AppError = require('./appError')

const handleValidationError=(err)=>{
console.log("EVERTHING IS DONE NOW !")
    const errors = Object.values(err.errors).map(el=>el.message);
const message = `Invalid input data ${errors.join(', ')}`;
return new AppError(message,400)
}

const handleCastErrorDB = (err) =>{
    const message = `Invalid ${err.path} : ${err.value}`;
    return new AppError(message,400)
}

const handleDuplicateFieldDB = (err) =>{
// console.log(err.keyPattern);
// console.log(err)
// const value = err.match(/(['"])(.*?)\1/)[2];

const message = `Duplicate field value, Please use another value!`
return new AppError(message, 400)
}

const sendErrorProd = (err,res) =>{
    res.status(err.statusCode).json({
        status:err.status,
        message:err.message
    });

// this are unknown error which are  don't 
// have to leaked to the client. 
// else{
//     console.error('ERROR ',err);
//     res.status(500).json({
//         status:'Error',
//         message: 'something went very wrong!'
//     })
// }
}

const sendErrorDev = (err,res) => {
res.status(err.statusCode).json({
    status:err.status,
    message:err.message
});
}

module.exports = (err,req,res,next)=>{
err.statusCode = err.statusCode || 500;
err.status = err.status || 'error';

if(process.env.NODE_ENV === 'production'){
    let error = { ...err }
    // if one of the following is happened . 
    if((err.name === 'CastError' || error.code === 11000) || err.name === 'ValidationError'){
        if(error.name === 'CastError') error  = handleCastErrorDB(error);
        else if(error.code === 11000) error = handleDuplicateFieldDB(error);
        else if(error.name === 'ValidationError') error = handleValidationError(error);
        sendErrorProd(error,res);
    }
    else{
        sendErrorProd(err,res);
        
    }

    
}

else if(process.env.NODE_ENV === 'development'){
    sendErrorDev(err,res);
}
}


