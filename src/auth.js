const auth = async (req,res,next)=>{
   const {password,cpassword} = req.body;
   console.log(password,cpassword);
    if(req.body.password == req.body.cpassword){
        
        next();
    }else{
        return res.status(403).render('signin',{
            Errmessage:"password miss match"
        })
    }
}

module.exports = {auth};