const AppError = require('../error_handlers/appError')
const Project = require('../project/projectModel')
const Object = require('../object/objectModel')
const catchAsync = require('../error_handlers/catchAsync')
const User = require('../user/userModel')


exports.getUsers = catchAsync(async (req,res,next)=>{
    // there should be two type of users. one is system admin
    // the super user should not be shown here.
    const user = User.find()
    try{

    }
    catch(err){
        res.status(200).json({
            status:"200_OK",
            data:{
                users
            }
        })
    }
})

exports.getProjects = catchAsync(async (req,res,next) =>{
try{
const projects = Project.find()
res.status(200).json({
    status:"200_0k",
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
        const project = Project.findById(id)
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
