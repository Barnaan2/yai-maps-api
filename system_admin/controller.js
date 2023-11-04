const AppError = require('../error_handlers/appError')
const Project = require('../project/projectModel')
const Object = require('../object/objectModel')
const catchAsync = require('../error_handlers/catchAsync')
const User = require('../user/userModel')


exports.getUsers = catchAsync(async (req,res,next)=>{
    // there should be two type of users. one is system admin
    // the super user should not be shown here.
    try{
        const users = await User.find()
        res.status(200).json({
            status:"200_OK",
            results:users.length,
            data:{
                users
            }
        })

    }
    catch(err){
        next(new AppError(err,400))
    }
})


exports.getUser = catchAsync(async (req,res,next)=>{
    try{
        const id = req.params.id
        const user = await User.findById(id)
        res.status(200).json({
            status:"200_OK",
            data:{
            user
            }
        })
  
    }
    catch(err){
        next(new AppError(err,400))
    }
});




exports.getProjects = catchAsync(async (req,res,next) =>{
try{
const projects = await Project.find()
res.status(200).json({
    status:"200_0k",
    results:projects.length,
    data:{
        projects
    }
})
}

catch(err){
    next(new AppError(err,400))
}
})


exports.getProject = catchAsync(async (req,res,next)=>{
    try{
        const id = req.params.id
        const project = await Project.findById(id)
        res.status(200).json({
            status:"200_OK",
            data:{
            project
            }
        })
  
    }
    catch(err){
        next(new AppError(err,400))
    }
});
