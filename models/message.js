const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    fullname:String,
    email:String,
    mobile:Number,
    role:String,
    message:String
})


module.exports=mongoose.model('message',messageSchema)