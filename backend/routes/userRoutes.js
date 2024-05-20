//user/getsubmissions =>get request
//user/submit post request
const router=require('express').Router();
const jwt=require('jsonwebtoken');
const ProblemModel=require('../models/ProblemModel');
const SubmissionModel=require('../models/SubmissionModel');

//from jwt token we will get payload which contains some user information
//here it's username 

router.get('/getsubmissions',async function(req,res)
{
  //verify user is authenticated or not
  const {token}=req.cookies;
  const payload=jwt.verify(token,process.env.SECRET_KEY);
  if(!payload)
    {
      return res.status(400).send('user is not authenticated');
    }
    const {username}=payload;
    //now from username take 10 recent submissions of that user
    //send data as array of objects[{},{}] each object contains submission id ,problem title,verdict
    const submissionData=await SubmissionModel.find({username},'_id problemId verdict').sort({submissionTime:-1}).limit(10);
    //now we have array of object,object have submissionid,problemid fields
    //from problemid read problem title and send new array of object containing submission id and title 
    //sending submission id will be useful next time ,when user wants to
    //know particular submission we will send that submission id
    // console.log(submissionData);
    /*
    let data=[];
      submissionData.forEach(async function(obj){
        const {title}=await ProblemModel.findOne({_id:obj.problemId});
        data.push({
          _id:obj._id,
          verdict:obj.verdict,
          title
        })
      })
      //forEach is synchronous loop we have to wait until all promises
      //inside array gets resolved

      data=await Promise.all(data);
    res.status(200).json(data);

    executing above code still gives empty array as we can't create array of promises
    using forEach function we have to use map method 
    */
   let data=submissionData.map(async function(obj){

    const {title,rating}=await ProblemModel.findOne({_id:obj.problemId});
    return {
      _id:obj._id,
      title,
      verdict:obj.verdict,
      rating
    }
   })
   data=await Promise.all(data);
   res.status(200).json(data);
});
//when user want to submit their code
router.post('/submit/:id',async function(req,res){

  //id here is the problem id i.e for this problemId user have submission
  //req.params will break url and gives you key value pir for parameters
  const problemId=req.params.id;
  const {token}=req.cookies;
  const payload=jwt.verify(token,process.env.SECRET_KEY);
  const {username}=payload;
  //submission schema=>submissionTime,code,verdict,problemId,username
  //from client side we have alredy collected problemId,username
  //now get code and save submissionTime
  const submissionTime=new Date();
  const {code}=req.body;
  //run code and give verdict it is also a asynchronus work
  //for now i'm hardcoding the result in verdict
  const verdict='accepted';
  const submission=new SubmissionModel({
    submissionTime,
    code,
    verdict,
    problemId,
    username
  })
try{
  await submission.save();
}
catch(err)
{
  console.log(err);
  return res.status(400).send("something wrong!!!")
}
res.status(201).json(submission);
})



module.exports=router;