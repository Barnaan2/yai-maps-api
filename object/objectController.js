const AppError = require('../error_handlers/appError')
const Object = require('./objectModel')
const catchAsync = require('../error_handlers/catchAsync')
const authUtils = require('../auth/authUtils')
const  mongoose  = require('mongoose')

exports.getObjects = catchAsync(async (req,res,next)=>{
   try{
const objects = await Object.find({project:req.project})

       res.status(200).json({
           status:"200_OK",
           results:objects.length,
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
       console.log("hello")
       const object = await Object.findById(pk)
    // console.log(object.project)
    //    print("hello")
       // authorization should be done here.
      
       if(!authUtils.authorizeObj(object.project,req.project.id)){
        next(new AppError('Not Found',404))
       }
       else{

           res.status(200).json({
               status:"200_OK",
               data:{
                  object
               }
           });
       }
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
      const data = req.body
    if(!authUtils.authorizeObj(object.project,req.project.id)){
        next(new AppError('Not Found',404))
       }

       else{
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
  }

    catch(err){
        next(new AppError(err,400))
    }
})


exports.deleteObject = catchAsync(async (req,res,next)=>{ 
try{
    const pk = req.params.pk;
    const object = await Object.findById(pk)
    if(!authUtils.authorizeObj(object.project,req.project.id)){
        next(new AppError('Not Found',404))
       }
       else{

        const objectNew = await Object.findByIdAndDelete(pk);
        if(!objectNew){
         next(new AppError('Not Found',404))
        }
    else{
        res.status(204).json({
            status:"THE CONTENT IS BEING DELETED",
            data:{
                message:"Deleted content"
            }
        })
    }
    
       }
    }
catch(err){
    next(new AppError(err,400))
}


})

exports.getObjectsWithin = catchAsync( async (req,res,next)=>{
   
    try{
//If specifying latitude and longitude coordinates, list the longitude first, and then latitude.

// Valid longitude values are between -180 and 180, both inclusive.

// Valid latitude values are between -90 and 90, both inclusive.
        const {distance,latlng,unit} = req.params;
        const[lat,lng] = latlng.split(',')
        if(!lat || !lng){
            next(new AppError('Please Provide latitude and longitude in the format lat,lng',400))
        }
   
        const radius =  unit === 'mi' ? distance / 3963.2 : distance / 6378.1
   
        const objects= await Object.find({location:{
        $geoWithin:{$centerSphere:[[lng,lat], radius]}
     }
     ,
    
         project:mongoose.Types.ObjectId(req.project._id)
     
    }
    ).select('objId');
    //  console.log(distance,lat,lng,unit)
        res.status(200).json({
            status:"200_OK",
            results:objects.length,
            data:{
    objects
            }
        })
    }

    catch(err){
        next(new AppError(err,400))
    }
})

exports.getDistances = catchAsync( async (req,res,next)=>{
    try{
const { latlng,unit } = req.params;
const [ lat, lng] = latlng.split(',')

const proj_id = req.project._id
console.log(proj_id)
const distances = await Object.aggregate([
    {
        $geoNear:{
            near:{
                type:'Point',
                coordinates:[lng*1,lat*1]
            },
            distanceField : 'distance',
            distanceMultiplier:0.001,
            query:{
                project:mongoose.Types.ObjectId(req.project._id)
            }
        }
    },
    {
        $project: {
        distance:1,
        objId:1,
    }
}

])


res.status(200).json({
    status:"200_OK",
    results:distances.length,
    data:{
distances
    }
})

    }

    catch(err){
next(new AppError(err,400))
    }

})