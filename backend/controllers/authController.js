const path=require("path");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const UserModel=require(path.join(__dirname,"..","models","UserModel.js"));


async function loginUser(req,res){
  const {username,password}=req.body;
  //step1)check for valid inputs
  if(!(username && password)){
    return res.status(400).json({
      status:"failed",
      msg:"provide all information"
    });
  }
  //step2)check whether user exists in Database or not and match password
  //Modelname.find() gives array of object and findOne() gives single document
  const user=await UserModel.findOne({username});
  //MongoDb returns null if findOne don't have matching document
  if(!user){
    return res.status(404).json({
      status:"failed",
      msg:"invalid credentials"
    });
  }
  //step3)Match password now
  const result=await bcrypt.compare(password,user.password);
  if(!result){
    return res.status(404).json({
      status:"failed",
      msg:"invalid credentials"
    });
  }
  //step4)generate token and save in cookie
  const token=jwt.sign({username,role:user.role || "user"},process.env.SECRET_KEY,{
    expiresIn:"24h"
  });
  res.cookie("token",token,{
    maxAge:86400000,
    httpOnly:true
  })
  //step5)send user object to client
  user.password=undefined;
  user.email=undefined;
  res.status(200).json({
    status:"success",
    msg:"loged in",
    user
  });
}

async function signupUser(req,res)
{
  const{username,email,password}=req.body;
  //step1)input validation
  if(!(username && email && password))
    {
      return res.status(400).json({
        status:"failed",
        msg:"provide all information"
      });
    }
  //step2)check whether user already exists
  const user=await UserModel.findOne({username});
  if(user)
      {
        return res.status(400).json({
          status:"failed",
          msg:"invalid credentials"
        });
      } 
  //step3)create user and return jwt token
  
  //hash password and save user in Database
  const hashpassword=await bcrypt.hash(password,10);
  const newUser=new UserModel({
    username,
    password:hashpassword,
    email
  });
  await newUser.save();

  //generate token and save in cookie
  const token=jwt.sign({username,role:"user"},process.env.SECRET_KEY,{
    expiresIn:"24h"
  });
  res.cookie("token",token,{
    maxAge:86400000,
    httpOnly:true
  });
  newUser.password=undefined;
  newUser.email=undefined;
  res.status(201).json(newUser);
}
module.exports={loginUser,signupUser};