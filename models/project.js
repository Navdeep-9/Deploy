const mongoose = require('mongoose');

const projectShema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        default:'pp.jpg'
    },
    url:{
        type:String,
        required:true
    }
})

const projectModel = mongoose.model('project',projectShema);

module.exports = {
    projectModel
}