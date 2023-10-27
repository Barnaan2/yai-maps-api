const jwt = require('jsonwebtoken');
const catchAsync = require('../error_handlers/catchAsync');
exports.signToken = (id) =>{
    return jwt.sign({id:id},
       process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_IN
  }  
);
}


