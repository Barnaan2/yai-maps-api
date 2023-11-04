const jwt = require('jsonwebtoken');
const AppError = require('../error_handlers/appError')
const catchAsync = require('../error_handlers/catchAsync');
exports.signToken = (id) =>{
    return jwt.sign({id:id},
       process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_IN
  }  
);
}


exports.authorizeObj =  (currProject,userProject) =>
{
  try{
userProject = userProject.toString()
currProject = currProject.toString()
if(currProject == userProject ){
 return true;
}
else{

  return false;
}


}

catch(err){
  return false;
   throw new AppError(err,404)
}
   
}