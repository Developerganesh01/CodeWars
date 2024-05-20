const router=require('express').Router();
const UserModel=require('../models/UserModel');
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken');



router.post('/login',async function(req,res){

  //1)check for valid inputs
  const {username,password}=req.body;
  if(!(username && password))
    {
      return res.status(400).send("provide details");
    }   
    //2)check user exists in db and password matches
    //note that find gives you array of documenets while findOne gives you a single document
    const user=await UserModel.findOne({username});
    if(!user)
      {
        return res.status(404).send('invalid credentials !!!');
      }
      //comparing the password with hashpassword stored in db that returns boolean
    const result=await bcrypt.compare(password,user.password);
    if(!result)
      {
        return res.status(404).send('invalid credentials !!!');
      }
      //3)generate token and save in cookies
      const token=jwt.sign({username},process.env.SECRET_KEY,{
        expiresIn:'24h'
      })
      res.cookie('token',token,{
        maxAge:86400000,
        httpOnly:true
      });
      //send user back to the client before sending hide sensitive information
      user.password=undefined;
      user.email=undefined;
      res.status(200).json(user);
})


router.post('/signup',async function(req,res){
  const {username,email,password}=req.body;

  //check data is present or not
  if(!(username && email && password))
    {
      //if any one of data is not present 
      return res.status(400).send("error provide all details");
    }
    //check if user already exists in database
  const user=await UserModel.findOne({username});
  if(user)
    {
      return res.status(400).send("user already exists");
    }
    //create new user and return jwt token

    //hash password before saving
    const hashpassword=await bcrypt.hash(password,10);
    const newuser=new UserModel({
      username,email,password:hashpassword
    });
    await newuser.save();

    //jwt.sign({payload object},'secret-key)
    const token=jwt.sign({username},process.env.SECRET_KEY,{
      expiresIn:'24h'
    });
    res.cookie('token',token,{maxAge:86400000,httpOnly:true})
    newuser.password=undefined;
    newuser.email=undefined;
    res.status(201).json(newuser);
})



module.exports=router;