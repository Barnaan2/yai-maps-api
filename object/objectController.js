const AppError = require('../error_handlers/appError ')
const Object = require('./objectModel')
const catchAsync = require('../error_handlers/catchAsync')
const authUtils = require('../utils/authUtils')

exports.getObjects = catchAsync(async (req,res,next)=>{
   try{
const objects = await Object.find({project:req.project})
       res.status(200).json({
           status:"200_OK",
           data:{
              objects
           }
       });
   }

   catch(err){
    next(new AppError(err,400))
   }
}) 


exports.getObject = catchAsync(async (req,res,next)=>{
// how to authorize ?
   try{
       const pk = req.params.pk
       const object = await Object.findById(pk)
       // authorization should be done here.
       authUtils.authorizeObj(object,req.project,next)
       res.status(200).json({
           status:"200_OK",
           data:{
              object
           }
       });
   }
    catch(err){
        next(new AppError(err,400))
    }
}) 



exports.createObject = catchAsync(async (req, res, next) => {
    try{ 
            const objId = req.body.objId;
            const location = {
                type: 'Point',
                coordinates: [req.body.longitude
                    , req.body.latitude]
            };
           
             const newObject = await Object.create({
                project: req.project,
                objId: objId,
                location: location
            });

            res.status(201).json({
                status: "201_CREATED",
                data: {
                    newObject
                }
            });
        }
        catch(err){
           next(new AppError(err,400))
        };
});



exports.updateObject = catchAsync(async (req,res,next)=>{
  
  try{

      const pk = req.params.pk
      const object = await Object.findById(pk)
    //   const project = object.project
      const data = req.body
    //   if(!(req.user == project.user)){
    //       next(new AppError('Not Found',404))
    //   }
    authUtils.authorizeObj(object,req.project,next)
      const updatedObject = await Object.findOneAndUpdate(pk,data,{
          new:true,
          runValidators:true,
      })
      res.status(201).json({
          status:'201_CONTENT_UPDATED',
          data:{
              updatedObject
          }
      })
  }

    catch(err){
        next(new AppError(err,400))
    }
})


exports.deleteObject = catchAsync(async (req,res,next)=>{ 
try{
    const pk = req.params.pk;
    const object = await Object.findById(pk)
    authUtils.authorizeObj(object,req.project,next)
    await Object.findOneAndDelete(pk)
        
    res.status(204).json({
        status:"THE CONTENT IS BEING DELETED",
        data:{
            message:"Deleted content"
        }
    })
}
catch(err){
    next(new AppError(err,400))
}


})