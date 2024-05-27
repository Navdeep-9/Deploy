const multer = require('multer');
const crypto = require('crypto');
const { extname } = require('path');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images/projects')
    },
    filename: function (req, file, cb) {
    crypto.randomBytes(12,(err,filename)=>{
        const fn = filename.toString('hex') + extname(file.originalname)
        cb(null, fn)
    });

    }
  })
  
  const uploadprojectpic = multer({ storage: storage })


  module.exports = {uploadprojectpic}