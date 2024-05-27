
const cookieParser = require('cookie-parser');
// const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


function IsloggedIn (req, res, next) {
    if (req.cookies.token === "") res.redirect('/user/login');
    else {
        let data = jwt.verify(req.cookies.token, "shhhh");
        req.user = data;
        next();
    }
}


module.exports = {
    IsloggedIn
}