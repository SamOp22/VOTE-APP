const mongoose = require('mongoose');

const schema = mongoose.Schema;
const voterSchema = new schema({
    Fname:{
        type:String,
        required:true
    },
    Lname:{
        type:String,
        required:true
    },
    AadharNumber:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    
    
})

module.exports = mongoose.model('voter',voterSchema)