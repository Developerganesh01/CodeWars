const router=require('express').Router();
const UserModel=require('../models/UserModel');




router.post('/login',async function(req,res){

  const user={
    username:req.body.username,
    email:req.body.email,
    password:req.body.password
  };
  const userExist=await UserModel.findOne(user);
  if(!userExist)
    {
      return res.status(404).send("user doesn't exists");
    }
    res.status(200).json(userExist);

})


router.post('/signup',async function(req,res){
  const {username,email,password}=req.body;
  const newuser=new UserModel({
    username,email,password
  })
  // console.log(user);
  try{
    await newuser.save();
    // console.log(user);

  }catch(err)
  {
    console.log(err);
    return res.status(400).send(err);
  }
  res.status(201).json(user);
})










module.exports=router;