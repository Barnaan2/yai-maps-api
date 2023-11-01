const jwt = require('jsonwebtoken');
const catchAsync = require('../error_handlers/catchAsync');
exports.signToken = (id) =>{
    return jwt.sign({id:id},
       process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_IN
  }  
);
}


const authorizeObj = (object,project,next)=>{
  try{
const projId = project._id
const objProjId = object.project._id
if(projId !== objProjId){
next(new AppError('Not found',404))
}
next()
}

catch(err){
   next(new AppError(err,404))
}
   
}