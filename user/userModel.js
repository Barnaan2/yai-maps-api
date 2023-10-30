const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema({
    //Phone number 
    phoneNumber:{
        type:Number,
        unique:true,
        required:[true,'Phone number is required to create a new account ']
    },

    password:{
        type:String,
        required:[true,"Password is required!"],
        minlength:6,
        select:false,
    },

    confirmPassword:{
        type:String,
        required:[true,"Confirm  password is required!"]
        ,validate:{
validator:function(el){
    return el === this.password
},
message:"Passwords are not the same!"
        }
    },

    apiKey:{
        type:String,
        required:[
            true,
            " A api key is required!"
        ],
        unique:true,
    }
,

secretKey:{
    type:String,
    required:[
        true,
        " A secret key is required!"
    ],
    minlength:6,
    select:false
},

    role:{
        type:String,
        enum:["User","SuperUser","SystemAdmin"],
        default:"User"},

    createdAt:{
        type:Date,
        default:Date.now()
    },

    updatedAt:{
        type:Date,
        default:Date.now()
    }

})

// a preprocessor.
userSchema.pre('save',async function(next){
if(!this.isModified('password')){
    return next();
}
this.password = await bcrypt.hash(this.password,12);
this.confirmPassword = undefined;
next()
});
// for checking the correctness of user password for logging them in .
userSchema.methods.correctPassword = async function(canditatePassword,password){
    return await bcrypt.compare(canditatePassword,password);
}

userSchema.pre('save',async function(next){
    if(!this.isModified('secretKey')){
         next()
    } 
    this.secretKey = await bcrypt.hash(this.secretKey,12)
    next()
    })
    
    
    userSchema.methods.findSecretKey = async function(candidateSecretKey,secretKey){
        return await bcrypt.compare(candidateSecretKey,secretKey)
    }


const User = mongoose.model('User',userSchema);
module.exports = User;