const userSchema = require("../models/userModel");
const bcrypt = require('bcrypt');
const session = require('express-session');

/////email validation/verification
const nodemailer = require('nodemailer');
/////////////////////
//////////for sending mail///
const sendVerifyMail = async(name,email,_id)=>{
    try {
       const transporter = nodemailer.createTransport({
            host:'smtp.gmail.com',
            port:587,
            secure:false,
            tls:true,
            auth:{
                user:'xcrwolfie@gmail.com',
                pass:'jiefsiykivjzpran'
            }
        });
        const mailOptions = {
            from:'xcrwolfie@gmail.com',
            to:email,
            subject:'For mail Verification',
            html:`<p> Hi ${name}, please click here to <a herf="http:192.168.1.126:8000/verifiy?id=${_id}>verify</a> your mail.<p>`,

        }
        transporter.sendMail(mailOptions,(e,info)=>{
            if(e){
                console.log(e);
            }else{
                console.log("Email has been sent",info.response);
            }
        })
        
    } catch (e) {
        console.log(e.message)
    }
};
//////////////////////////////////////////
const signin = async (req,res,next)=>{
    try{
        res.render('signin');
    }catch(e){
        console.log(e);
    }
};

const insertData = async (req,res,next)=>{
   const  {name,email,phoneno,image,address,password,cpassword} = req.body;
   
   let existingUser;
    try {
        existingUser = await userSchema.findOne({email});
        if(existingUser){
            return res.status(403).render('signin',{
                Errmessage:"user already exists please procede to login"
            });
        }
        else{

            if(password!=cpassword){
                return res.status(403).render('signin',{
                    Errmessage:"password didn't match"
                });
            }
            else{
                const hashPass = bcrypt.hashSync(password,10);
                const data = new userSchema({
                    name,
                    email,
                    phoneno,
                    image:req.file.filename,
                    address,
                    password:hashPass,
                    is_admin:0,
                });
                const ifdata = await data.save();
                if(!ifdata){
                   
                   return  res.status(400).json({msg:"error is signin"});
                }else{
                    // console.log(ifdata);
                    /////data is sucessfully inserted we call verification
                    sendVerifyMail(req.body.name,req.body.email,ifdata._id);
                    return res.status(200).render('signin',{
                        Sucessmessage:"Please verify you email"
                    });
                }
            }
        }
        
    } catch (error) {
        console.log(error);
    };
    
};

const getDashboard = async(req,res,next)=>{
    try {
        const usr = await userSchema.findById(req.session.user_id);
        let verified='True';
        console.log(usr);
        if(usr.is_verified ==0){
            verified='False'
        }
        res.render('usrIndex',{
            usrname:usr.name,
            usremail:usr.email,
            usrphone:usr.phoneno,
            usraddress:usr.address,
            usrimage:usr.image,
            isadmin:usr.is_admin,
            isverified:verified,
        });
    } catch (error) {
        console.log(error);
    }
};

//////////////////verrify
const verfiyMail = async (req,res,next)=>{
    try {
        console.log(req.query.id);
     const UpdateData = await userSchema.updateOne({_id:req.query.id},{
        $set:{is_verified:1}
      });
      console.log(UpdateData);
      res.render("email-verified");
      
        
    } catch (error) {
        console.log(error);
    }
    
}

///////////////////

 //////////////////////////////////////////////////////////userlogin section////////////////////
 const landing = async (req,res,next)=>{
    try {
        return res.render('landing');
    } catch (error) {
            console.log(error);
    }
 }
 const login = async(req,res,next)=>{
    const {email,password} = req.body;
    let existingUser;
    try {
        existingUser = await userSchema.findOne({email});
        if(!existingUser){
            return res.status(403).render('login',{
                errorMessage:"user dosen't exits procede to signin"
            });
        }
        else{
            var isPassCorrect = bcrypt.compareSync(password,existingUser.password);
            if(!isPassCorrect){
                return res.status(403).render('login',{
                    errorMessage:"email or password is incorrect"
                });
            }else{
                // return res.status(200).render('login',{
                //     sucessMessage:"login sucessfully"
                // });
                req.session.user_id = existingUser._id;
                res.redirect('/home');
            }

        }
        
        
    } catch (e) {
        console.log(e)
    }
};

const logout = async(req,res,next)=>{
    try {
        req.session.destroy();
        res.redirect('/');
        
    } catch (e) {
        console.log(e.message);
    }
}
const editName = async (req,res)=>{
    const name = req.body;
  let usr;

    try {
       usr = await userSchema.updateOne({_id:req.session.user_id},{$set:{name:name}});
       console.log(usr);
       return res.redirect('/home');
       
    } catch (e) {
        
    }
    console.log(name);
}
module.exports = {
    signin,
    insertData,
    getDashboard,
    login,
    verfiyMail,
    // auth,
    landing,
    logout,
    editName,

}