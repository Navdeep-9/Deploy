const userModel = require('../models/user');



async function uploadfile(req,res){
    let user = await userModel.findOne({email : req.user.email});
    user.profilepic = req.file.filename;
    user.save();
    res.redirect('/user/profile')
}

function getupload (req,res){
    res.render('upload')
}

module.exports = {
    uploadfile,getupload
}