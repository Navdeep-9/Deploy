const express = require('express');
const multer = require('multer');

const router = express.Router();

const {register,login,profile,likes, edit,update,deletepost,createpost,createuser , userlogin,userlogout,showmainpage} = require('../controllers/user');

const {
    uploadfile,getupload
} = require('../controllers/updateprofile')


const{sendmessage,showproject,getproject,showallproject} = require('../controllers/portfolio')
 
const {IsloggedIn} = require('../middlewares/verify');


const {upload}= require('../config/multerconfig')
let {uploadprojectpic}= require('../config/projectupload')

router.get('/',showproject)

router.get('/addprojects', (req,res)=>{
    res.render('show')
})

router.get('/allprojects',showallproject)

router.post('/addprojects',uploadprojectpic.single('image'),getproject)


router.get('/', showmainpage)

router.post('/message', sendmessage)

router.get('/user/register', register)

router.get('/user/login', login)
router.get('/uploadfile', getupload )

router.post('/uploadfile',IsloggedIn,upload.single("image"),uploadfile)

router.get("/user/profile", IsloggedIn,profile)


router.get("/like/:id",IsloggedIn,likes)


router.get("/edit/:id", IsloggedIn,edit)

router.post("/update/:id", IsloggedIn,update)

router.get("/delete/:id", IsloggedIn, deletepost)


router.post("/post", IsloggedIn, createpost)

router.post('/user/register', createuser)

router.post('/user/profile', userlogin)

router.get('/logout',userlogout)

module.exports = router ;