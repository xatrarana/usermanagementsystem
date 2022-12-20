const express = require('express');
const path = require('path');
const hbs = require('hbs');
const { signin, insertData, getDashboard, login, verfiyMail, auth, landing, logout, editName } = require('../controllers/userController');
const body_parser = require('body-parser');
const session = require('express-session');
const { sessionSecret } = require('../config/config');

const userRoutes = express();


//////////////////using sessions
userRoutes.use(session({
    secret:sessionSecret,
    saveUninitialized:true,
    cookie:{maxAge:1000*60*60*24},
    resave:false
}));

// userRoutes.use(cookieParser())
///////
userRoutes.use(body_parser.json());
userRoutes.use(body_parser.urlencoded({extended:true}));
////////
const partialsPath = path.join(__dirname,'../templates/partials');
const templatePath = path.join(__dirname,'../templates/views');
const publicPath = path.join(__dirname,'../public');
userRoutes.use(express.static(publicPath));
userRoutes.set('view engine','hbs');
userRoutes.set('views',templatePath);
hbs.registerPartials(partialsPath);
///////for image
const multer = require('multer');
const cookieParser = require('cookie-parser');
const {isLogin,isLogout} = require('../middlewares/auth');


const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname,'../public/usrImages'));
    },
    filename:(req,file,cb)=>{
        const fileName = Date.now()+'-'+file.originalname;
        console.log(fileName);
        cb(null,fileName);
    }
});
const upload = multer({storage:storage});
/////////////
userRoutes.get('/',isLogout,landing);
userRoutes.get('/login',isLogout,landing);
userRoutes.post('/login',login);
userRoutes.get('/signin',isLogout,signin);
userRoutes.post('/signin',upload.single('image'),insertData);
userRoutes.get('/home',isLogin, getDashboard);
userRoutes.get('/verifiy',verfiyMail);
userRoutes.get('/logout',isLogin,logout);
userRoutes.post('/ums/editname',isLogin,editName);


module.exports={
    userRoutes
}