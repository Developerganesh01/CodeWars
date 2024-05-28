const router=require('express').Router();
const TestCaseModel=require('../models/TestcaseModel');



router.post('/create',async function(req,res)
{
  const {problemId,input,output}=req.body;
  const newtestcase=new TestCaseModel({
    input,
    output,
    problemId
  })

  await newtestcase.save();
  res.status(201).json(newtestcase);
})

module.exports=router;