
const { json } = require("express");
const path = require("path");
const ProblemModel = require(path.join(__dirname,"..","models","ProblemModel.js"));
const SubmissionModel = require(path.join(__dirname,"..","models","SubmissionModel.js"));
const TestCaseModel = require(path.join(__dirname,"..","models","TestcaseModel.js"));
const{writeFile,mkdir}=require("node:fs/promises");
const compileCode=require(path.join(__dirname,"..","services","codeCompilation","compileCode.js"));
const executeCode=require(path.join(__dirname,"..","services","codeExecution","executeCode.js"));
const{exec}=require("promisify-child-process");
const { stdin } = require("process");

async function getAllSubmissions (req, res) {

  const username=req.username;
  const submissionData = await SubmissionModel.find(
    { username },
    "_id problemId verdict language"
  )
    .sort({ submissionTime: -1 });
  //now we have array of object,object have submissionid,problemid fields
  //from problemid read problem title and send new array of object containing submission id and title
  //sending submission id will be useful next time ,when user wants to
  //know particular submission we will send that submission id
  let data = submissionData.map(async function (obj) {
    const { title, rating } = await ProblemModel.findOne({
      _id: obj.problemId,
    });
    return {
      _id: obj._id,
      title,
      verdict: obj.verdict,
      rating,
      language:obj.language
    };
  });
  data = await Promise.all(data);
  res.status(200).json(data);
};

async function submitCode(req, res) {
  const problemId = req.params.id;
  const username=req.username;
  //submission schema=>submissionTime,code,verdict,problemId,username,language
  const submissionTime = new Date();
  const { code,language} = req.body;
  let verdict = "";
  const testcaseData = await TestCaseModel.find({ problemId });
  //compile first
  let compiledFilePath;
  try{
    compiledFilePath=await compileCode(language,code);
  //  console.log("exefile: "+exeFilePath);
  }catch(err){
    // console.log(err.message.split(".exe")[1].split(".cpp:")[1]);
    const submission = new SubmissionModel({
      submissionTime,
      code,
      verdict:"compilation error",
      problemId,
      username,
      language
    });
   await submission.save();
  //  console.log(err);
  const Errormsg=err.message.split("."+language);
  // console.log(Errormsg);
    return res.status(200).json({
      verdict:"compilation error",
      msg:"line"+Errormsg[2]
    });
  }
  let outputpromises = testcaseData.map(async function(testcase){
    try{
      const result=await executeCode(language,testcase.output,testcase.input,compiledFilePath);
      // console.log("testCase result: "+result);
      return result;
    }catch(err)
    {
      // console.log(err);
      return {
        verdict:"error",
        msg:err.message
      }
    }
  });
  // console.log(outputpromises);
  try {
    outputpromises = await Promise.all(outputpromises);
  } catch (err) {
    return res.status(200).json({
      verdict:"error",
      msg:err.message
    });
  }
  // console.log(outputpromises);
  let iswrongAnswer=false;
  let isCompilationError=false;
  let Errormsg="none";
  for(let index=0;index<outputpromises.length;index+=1){
    if(outputpromises[index].verdict==="error")
      {
        isCompilationError=true;
        Errormsg=outputpromises[index].msg;
        break;
      }
    else if(outputpromises[index].verdict==="wrong answer"){
      iswrongAnswer=true;
    }
  }
  if(isCompilationError)
    {
      verdict="compilation error";
      Errormsg=Errormsg.split("."+language)[2];
    }else if(iswrongAnswer)
      {
        verdict="wrong answer";
      }
      else{
        verdict="accepted";
      }
  const submission = new SubmissionModel({
    submissionTime,
    code,
    verdict,
    problemId,
    username,
    language
  });
  try {
    await submission.save();
  } catch (err) {
    // console.log(err);
    return res.status(400).send("something wrong!!!");
  }
  res.status(201).json({
    verdict:submission.verdict,
    testcaseResult:outputpromises,
    msg:Errormsg
  });
}

// handle run
async function runCode (req, res) {

  const { code, input,language } = req.body;
  const { id } = req.params;
  try{
    
    const filePath=await compileCode(language,code);
    if(language==="cpp"){
      const child=exec(`g++ ${filePath}`);
      child.stdin.write(input);
      child.stdin.end();
      const {stdout}=await child;
      return res.status(200).json({
        output:stdout
      })
      }
    else if(language==="py"){

      const child=exec(`python ${filePath}`);
      child.stdin.write(input);
      child.stdin.end();
      const {stdout}=await child;
      return res.status(200).json({
        output:stdout
      })

    }
    else if(language==="java"){

      const child=exec(`java ${filePath}`);
      child.stdin.write(input);
      child.stdin.end();
      const{stdout}=await child;

      return res.status(200).json({
        output:stdout
      })
    }
    else{
      res.status(400).josn({
        output:"Language not supported"
      })
      return;
    }
  }
  catch(err)
  {
    console.log(err);
    return res.status(200).json({
      output:err.message
    })
  }
}
async function  getSubmission(req,res){
  const submissionId=req.params.id;
  // console.log(submissionId);
  const submission=await SubmissionModel.findOne({
    _id:submissionId
  });
  // console.log(submission);
  res.status(200).json({
    language:submission.language,
    code:submission.code
  });
}
async function getBarData(req,res){
  const username=req.username;
  const dataArray=await SubmissionModel.find({username,verdict:"accepted"},"problemId");
  const alreadyCounted=new Map();
  const ratingFrequency=new Map();
  //if same problem is solved for multiple times it should be counted as one 
 const promiseArray=dataArray.map(async function(obj,index){
  if(!alreadyCounted.has(obj.problemId)){
    alreadyCounted.set(obj.problemId,1);
    const {rating}=await ProblemModel.findOne({_id:obj.problemId});
    if(ratingFrequency.has(rating)){
      ratingFrequency.set(rating,ratingFrequency.get(rating)+1);
    }else{
      ratingFrequency.set(rating,1);
    }
  }
  return "solved";
 });
 const response=await Promise.all(promiseArray);
 //now i have data
 const data=[];
 for(const arr of ratingFrequency){
  data.push({
    rating:arr[0],
    solved:arr[1]
  })
 }
 data.sort((obj1,obj2)=>{
  return obj1.rating-obj2.rating
 })
//  console.log(data);
 res.status(200).json(data);
}
async function getPieData(req,res){
  const username=req.username;
  const accept=await SubmissionModel.countDocuments({username,verdict:"accepted"});
  const wa=await SubmissionModel.countDocuments({username,verdict:"wrong answer"});
  const cmperr=await SubmissionModel.countDocuments({username,verdict:"compilation error"});
  const data=[{name:"Accepted",value:accept},
    {name:"Wrong answer",value:wa},{name:"compilation error",value:cmperr}];
    res.status(200).json(data);
}
async function logout(req,res){

  res.clearCookie('token',{
    httpOnly:true,
  });
  res.status(200).send("loged out successfully");
}


module.exports ={getAllSubmissions,runCode,submitCode,getSubmission,getBarData,getPieData,logout};
