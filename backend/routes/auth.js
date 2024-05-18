const router=require('express').Router();
const UserModel=require('../models/UserModel');



router.post('/login',async function(req,res){

  console.log(req.body);
  res.status(201).json({
    status:"successful",
    data:req.body
  });

})


router.post('/signup',async function(req,res){
  const {username,email,password}=req.body;
  const user=new UserModel({
    username,email,password
  })
  // console.log(user);
  try{
    await user.save();
    // console.log(user);

  }catch(err)
  {
    console.log(err);
    return res.status(400).send(err);
  }
  res.status(201).json(user);
})










module.exports=router;