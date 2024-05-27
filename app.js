require('dotenv').config()
const express = require('express')
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path')
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.resolve('./public')));
const port = (process.env.PORT || 3006)
const MONGO_URL = ('mongodb://127.0.0.1:27017/Portfolio')

// require multer to upload files
const upload = require('./config/multerconfig');

// multer

//db  connection 
const { connection } = require('./models/database')

connection(MONGO_URL).then(() => {
    console.log(`database connected`);
})
    .catch(() => {
        console.log('failed to connect with database');
    })
//db  connection 

// routes 

const router = require('./routes/user')

app.use('/', router)
// routes


app.listen(port, () => {
    console.log(`servser started at http://localhost:${port}`);
})