
const path = require("path");
const ProblemModel = require(path.join(__dirname,"..","models","ProblemModel.js"));
const SubmissionModel = require(path.join(__dirname,"..","models","SubmissionModel.js"));
const TestCaseModel = require(path.join(__dirname,"..","models","TestcaseModel.js"));

const compileCode=require(path.join(__dirname,"..","services","codeCompilation","compileCode.js"));
const executeCode=require(path.join(__dirname,"..","services","codeExecution","executeCode.js"));


async function getAllSubmissions (req, res) {

  //data from authMiddleware
  const username=req.username;
  //now from username take 10 recent submissions of that user
  //send data as array of objects[{},{}] each object contains submission id ,problem title,verdict
  const submissionData = await SubmissionModel.find(
    { username },
    "_id problemId verdict"
  )
    .sort({ submissionTime: -1 })
    .limit(10);
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
    };
  });
  data = await Promise.all(data);
  res.status(200).json(data);
};

async function submitCode(req, res) {
  //id here is the problem id i.e for this problemId user have submission
  //req.params will break url and gives you key value pir for parameters
  const problemId = req.params.id;
  const username=req.username;

  //submission schema=>submissionTime,code,verdict,problemId,username,language
  //from client side we have alredy collected problemId,username
  //now get code and save submissionTime
  const submissionTime = new Date();
  const { code,language} = req.body;
  //run code and give verdict it is also a asynchronus work
  let verdict = "";
  //run testcases to get verdict
  //get array of object of testcases for this problemId
  const testcaseData = await TestCaseModel.find({ problemId });
  //array of obj ,obj contains _id,input,output,problemId
  //for each testcase run code and match output with computed output
  // console.log("testcaseData: "+testcaseData);
  //compile first
  let exeFilePath;
  try{
   exeFilePath=await compileCode(language,code);
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
    return res.status(400).json({
      verdict:"compilation Error",
      msg:err.message
    });
  }
  //executeCode(language,code,output,input,compiledFilePath);
  let outputpromises = testcaseData.map(async function(testcase)  {
    try{
      const result=await executeCode(language,code,testcase.output,testcase.input,exeFilePath);
      console.log("testCase result: "+result);
      return result;
    }catch(err)
    {
      return {
        verdict:"error"
      }
    }
  });
  // console.log(outputpromises);
  try {
    outputpromises = await Promise.all(outputpromises);
  } catch (err) {
    return res.status(400).json(err);
  }
  // console.log(outputpromises);
  let err=false;
  let cerr=false;
  for(let index=0;index<outputpromises.length;index+=1){
    if(outputpromises[index].verdict==="error")
      {
        cerr=true;
        break;
      }
    else if(outputpromises[index].verdict==="wrong answer"){
      err=true;
    }
  }
  if(cerr)
    {
      verdict="compilation error";
    }else if(err)
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
    console.log(err);
    return res.status(400).send("something wrong!!!");
  }
  res.status(201).json(submission);
}

// //handle run
// async function runCode (req, res) {
//   //without saving in submission collection send output by running code
//   // console.log(req.body);
//   const { code, input } = req.body;
//   const { id } = req.params;
//   //create file in code folder and write code in that file
//   const codefilepath = path.join(__dirname, "..", "code", `f${id}.cpp`);
//   const exefilepath = path.join(__dirname, "..", "code", `f${id}.exe`);
//   try {
//     await writeFile(codefilepath, code);
//     const child = exec(`g++ ${codefilepath} -o ${exefilepath} && ${exefilepath}`);
//     child.stdin.write(input);
//     child.stdin.end();
//     const { stdout, stderr } = await child;
//     if (stderr) {
//       console.log(stderr);
//       return res.status(200).json({
//         output: "compilation error",
//       });
//     }
//     res.status(200).json({
//       output: stdout,
//     });
//   } catch (err) {
//     console.log(err);
//     return res.status(400).send("something wrong");
//   }
// }
function runCode(req,res)
{
  res.status(200).json({
    output:"runs"
  })
}

module.exports ={getAllSubmissions,runCode,submitCode}