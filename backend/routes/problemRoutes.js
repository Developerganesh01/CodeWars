const router=require('express').Router();
const ProblemModel=require('../models/ProblemModel');



router.get('/getproblems',async function(req,res){

  //check user is authenticated or not
  const data=await ProblemModel.find();
  res.status(200).json({
    data
  })

  //send problems 
})



module.exports=router;