const mongoose = require('mongoose')

const projectSchema  = mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:[true,"A project should have a user!"],

    },
    name:{
        type:String,
        required:[true,"A project should have a name!"]
    }
    ,
    createdAt:{
        type: Date,
        default: Date.now()
    },
    updatedAt:{
        type:Date,
        default:Date.now()
    }
})

const Project = mongoose.model('Project',projectSchema)


module.exports = Project;