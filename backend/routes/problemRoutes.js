const router=require('express').Router();
const ProblemModel=require('../models/ProblemModel');
const jwt=require('jsonwebtoken');


router.get('/getall',async function(req,res){
  //send problems for home page
});
router.post('/create',async function(req,res){

  //check whether user is authenticated and have permission to do that or not
  
  //verify jwt
  //extract token from cookies
  console.log(req.cookies);
  const {token}=req.cookies;
  const payload=jwt.verify(token,process.env.SECRET_KEY);
  console.log(payload);
  //create problem and return 
  //req.body contains dfetails
  const{title,description,sampleinput,sampleoutput,rating}=req.body;
  if(!(title && description &&sampleinput &&sampleoutput &&rating))
    {
      return res.status(400).send("provide all details for problem");
    }
  const problem={
    title,
    description,
    sampleinput,
    sampleoutput,
    rating    
  };

  const newproblem=new ProblemModel(problem);
  try{
    await newproblem.save();
  }
  catch(err)
  {
    console.log(err);
    res.status(400).send("something went wrong");
  }
  res.status(201).json(newproblem);
})



module.exports=router;