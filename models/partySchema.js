const mongoose = require('mongoose');

const schema = mongoose.Schema;
const partySchema = new schema({
    name:{
        type:String,
        required:true
    },
    desciption:{
        type:String,
        required:true
    },
    
})

module.exports = mongoose.model('party',partySchema)