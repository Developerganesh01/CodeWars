//user/getsubmissions =>get request
//user/submit post request
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const ProblemModel = require("../models/ProblemModel");
const SubmissionModel = require("../models/SubmissionModel");
const path = require("path");
const { writeFile } = require("node:fs/promises");
const { exec, spawn, fork, execFile } = require("promisify-child-process");
const TestCaseModel = require("../models/TestcaseModel");
const { v4: uuidv4 } = require("uuid");
//from jwt token we will get payload which contains some user information
//here it's username

router.get("/getsubmissions", async function (req, res) {
  //verify user is authenticated or not
  const { token } = req.cookies;
  const payload = jwt.verify(token, process.env.SECRET_KEY);
  if (!payload) {
    return res.status(400).send("user is not authenticated");
  }
  const { username } = payload;
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
});
//when user want to submit their code
router.post("/submit/:id", async function (req, res) {
  //id here is the problem id i.e for this problemId user have submission
  //req.params will break url and gives you key value pir for parameters
  const problemId = req.params.id;
  const { token } = req.cookies;
  const payload = jwt.verify(token, process.env.SECRET_KEY);
  const { username } = payload;
  //submission schema=>submissionTime,code,verdict,problemId,username
  //from client side we have alredy collected problemId,username
  //now get code and save submissionTime
  const submissionTime = new Date();
  const { code } = req.body;
  //run code and give verdict it is also a asynchronus work
  //for now i'm hardcoding the result in verdict
  let verdict = "";
  //run testcases to get verdict
  //get array of object of testcases for this problemId
  const testcaseData = await TestCaseModel.find({ problemId });
  //array of obj ,obj contains id,input,output,problemId
  //for each testcase run code and match output with computed output
  // const codefilepath=path.join(__dirname,'..','code',`${problemId}.cpp`);
  // const exefilepath=path.join(__dirname,'..','code',`${problemId}.exe`);
  const codefilepath = path.join(
    __dirname,
    "..",
    "code",
    `${uuidv4()}${problemId}.cpp`
  );
  const exefilepath = path.join(
    __dirname,
    "..",
    "code",
    `${uuidv4()}${problemId}.exe`
  );
  //compile first
  await writeFile(codefilepath, code);
  const child = exec(`g++ ${codefilepath} -o ${exefilepath}`);
  try {
    const { stdout, stderr } = await child;
  } catch (err) {
    console.log(err);
    return res.status(400).send("error");
  }
  if (stderr) {
    console.log(stderr.split("\n"));
    res.status(400).send("compilation error");
    return;
  }
  let outputpromises = testcaseData.map(async (testcase, index) => {
    const child = exec(`${exefilepath}`);
    child.stdin.write(testcase.input);
    child.stdin.end();
    const { stdout, stderr } = await child;
    if (stderr) {
      return {
        verdict: "failed",
        stderr,
      };
    } else {
      return { verdict: "running", stdout };
    }
  });
  try {
    outputpromises = await Promise.all(outputpromises);
  } catch (err) {
    return res.status(400).json(err);
  }
  console.log(outputpromises);
  //if any testcase fails verdict='wrong answer'
  // outputpromises.forEach((testcase, index) => {
  //   if (
  //     testcase.verdict === "failed" ||
  //     testcase.stdout !== testcaseData[index].output
  //   ) {
  //     return res.status(400).send("wrong answer");
  //   }
  // });
  //return in forEach will come out of current execution of call back wont breaks entire forEach so use for of loops insetead
  let err = false;
  for (let index = 0; index < outputpromises.length; index += 1) {
    //stdout may contain line break and other things like /r/n to remove this use string.trim()
    //console.log(outputpromises[index].verdict,outputpromises[index].stdout.trim(),testcaseData[index].output);
    if (
      outputpromises[index].verdict === "failed" ||
      outputpromises[index].stdout.trim() !== testcaseData[index].output
    ) {
      // res.status(400).send('wrong answer');
      err = true;
      break;
    }
  }
  if (!err) {
    verdict = "accepted";
  } else {
    verdict = "wrong answer";
  }
  const submission = new SubmissionModel({
    submissionTime,
    code,
    verdict,
    problemId,
    username,
  });
  try {
    await submission.save();
  } catch (err) {
    console.log(err);
    return res.status(400).send("something wrong!!!");
  }
  if (!err) {
    res.status(201).json(submission);
  } else {
    res.status(400).send("wrong answer");
  }
});

//handle run

router.post("/run/:id", async function (req, res) {
  //without saving in submission collection send output by running code
  // console.log(req.body);
  const { code, input } = req.body;
  const { id } = req.params;
  //create file in code folder and write code in that file
  const codefilepath = path.join(__dirname, "..", "code", `f${id}.cpp`);
  const exefilepath = path.join(__dirname, "..", "code", `f${id}.exe`);
  try {
    await writeFile(codefilepath, code);
    const child = exec(
      `g++ ${codefilepath} -o ${exefilepath} && ${exefilepath}`
    );
    child.stdin.write(input);
    child.stdin.end();
    const { stdout, stderr } = await child;
    if (stderr) {
      console.log(stderr);
      return res.status(200).json({
        output: "compilation error",
      });
    }
    res.status(200).json({
      output: stdout,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send("something wrong");
  }
});

module.exports = router;
