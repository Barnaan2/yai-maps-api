const AppError = require('../error_handlers/appError')
const catchAsync = require('../error_handlers/catchAsync')
const Project = require('./projectModel')


exports.checkProject = catchAsync(async(req,res,next)=>{
    // console.log(req.params)
    const id = req.params.id
    // console.log(id)
    // here find the project with its id.
    const project = await Project.findById(id)
    
    // console.log(project)
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
})