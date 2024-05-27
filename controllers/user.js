const userModel = require("../models/user");
const postModel = require("../models/post");
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const {IsloggedIn} = require('../middlewares/verify');

async function showmainpage(req,res){
    res.render('portfolio')
}

async function register(req, res) {
    res.render('index')
}

async function login(req, res) {
    res.render('index')
}

async function profile(req, res) {
    let user = await userModel.findOne({ email: req.user.email }).populate("posts");
    if (!IsloggedIn) res.redirect('/login')
    else {
        res.render('profile', { user });
    }
}

async function likes(req, res) {
    let post = await postModel.findOne({ _id: req.params.id }).populate("user");
    if (post.likes.indexOf(req.user.userid) === -1) {
        post.likes.push(req.user.userid);
    }
    else {
        post.likes.splice(post.likes.indexOf(req.user.userid), 1);
    }
    await post.save();
    res.redirect('/user/profile');
}

async function edit (req, res){
    let post = await postModel.findOne({ _id: req.params.id }).populate("user");
    res.render('edit',{post})

}


async function update (req, res) {
    let post = await postModel.findOneAndUpdate({ _id: req.params.id },{content: req.body.content})
    res.redirect("/user/profile")

}

async  function deletepost (req, res){
    let post = await postModel.findOneAndDelete({ _id: req.params.id})
    res.redirect("/user/profile")

}

async  function createpost(req, res) {
    let user = await userModel.findOne({ email: req.user.email });
    let { content } = req.body;

    let post = await postModel.create({
        user: user._id,
        content
    });
    user.posts.push(post._id);
    await user.save();
    res.redirect("/user/profile")
}

async function createuser(req, res){
    let { email, password, username, name } = req.body;
    let user = await userModel.findOne({ email })
    if (user) return res.status(500).send('user already resigtered');

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            let user = await userModel.create({
                username,
                email,
                name,
                password: hash
            });
            let token = jwt.sign({ email: email, userid: user._id }, "shhhh")
            res.cookie('token', token);
            res.render('profile',{user})
        })
    })
}

async function userlogin (req, res){
    let { email, password } = req.body;
    let user = await userModel.findOne({ email })
    if (!user) return res.status(500).send('something went worng');

    bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
            let token = jwt.sign({ email: email, userid: user._id }, "shhhh")
            res.cookie('token', token);
            res.status(200).redirect('profile')
        }
        else res.redirect('/user/login');
    })
}



function userlogout (req, res){
    res.cookie("token", "");
    res.redirect("/user/login")

}
//

//



module.exports = {
    register,
    login,
    profile,
    likes,
    IsloggedIn,
    edit,
    update,
    deletepost,
    createpost,createuser,userlogin,userlogout,showmainpage
}