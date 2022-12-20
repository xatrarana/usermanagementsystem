const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,

    },
    email:{
        type:String,
        required:true,
    },
    phoneno:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        
    },
    address:{
        type:String,
        
    },
    password:{
        type:String,
        required:true,
        minlength:6,
    },
    is_admin:{
        type:Number,
        required:true,
        
    },
    is_verified:{
        type:Number,
        default:0,
    }
});

module.exports = mongoose.model('user',userSchema);