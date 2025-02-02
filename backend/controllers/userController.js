const user = require("../models/user-model");
const jwt  = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const handleLogin = async(req,res)=>{
  
try {
    const {email,password}=req.body;

    const isValid =  await user.findOne({email});

    if(!isValid){
        return res.json({success:false,message:"email doesn't exists kindly signup"});
    }

    const isMatch = await bcrypt.compare(password,isValid
        .password);
    if(!isMatch){
        return res.json({success:false,message:"incorrect password"});
    }
    else {
        const token = jwt.sign({id:isValid._id},"secret",{expiresIn: '1h'});
      

        
        res.json({success:true,token});

    }
}
    catch(error){
        return res.json({success:false,message:error.message});
    }
 



}

const handleSignup = async(req,res)=>{

    try  {
        const {name,email,password}=req.body;
    
        const exists=  await user.findOne({email});

        if(exists){
            return res.json({success:false,message:"email id already exists"});
        }
    const salt= await bcrypt.genSalt(10);
        const hashedpwd = await bcrypt.hash(password,salt);
        const newuser = await user.create({
            name,email,
            password:hashedpwd
        });
    
        const token = jwt.sign({id:newuser._id},"secret",{expiresIn:'1hr'});
    
        return res.json({success:true,message:"signed in successfully",token});

    }
   catch(error){
    return res.json({success:false,message:error.message});
   }


}

module.exports={
    handleLogin,
    handleSignup

}