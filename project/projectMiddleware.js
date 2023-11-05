const AppError = require('../error_handlers/appError')
const catchAsync = require('../error_handlers/catchAsync')
const Project = require('./projectModel')
const mongoose = require('mongoose')


//? HERE THE ID SHOULD BE CHANGEDf
exports.checkProject = catchAsync(async(req,res,next)=>{

    try{
const id = req.params.id
// here find the project with its id.
if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new AppError('Invalid project ID', 400));
}

const project = await Project.findById(id)

if(!project){
next(new AppError('Not Found',404))
}
const projUserId = project.user._id
const userId = req.user._id



if (!userId.equals(projUserId)) {
    next(new AppError('Not Found', 404));
  }
  
req.project = project
// console.log(req.project)
// if req.user == proj.user continue unless raise error.
next()
    }
    
    catch(err){
        next(new AppError(err,400))
    }
})