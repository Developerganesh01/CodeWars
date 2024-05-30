const path=require("path");
const ProblemModel=require(path.join(__dirname,"..","models","ProblemModel.js"));

async function getAll(req,res){
  //send 10 problems randomly
  //[{},{},.....] send array of problems which contains only problem id,title and problem rating
  //in find provide string for projection
  //when we use limit without sort random 10 documents will be fetched
  const problemData=await ProblemModel.find({},'_id title rating').limit(10);
  res.status(200).json(problemData);
}

async function create(req,res){
  //create problem and return 
  //req.body contains details
  const{title,description,sampleinput,sampleoutput,rating}=req.body;
  if(!(title && description &&sampleinput &&sampleoutput &&rating)){
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
}

async function getDescription (req,res){
  //get problemId
  const {id}=req.params;
  //send title,problemDescription,input,output
  //send json object containing this keys
  const obj=await ProblemModel.findOne({_id:id});
  //if object is empty
  if(!obj){
    return res.status(400).send("invalid problem id");
  }
  res.status(200).json(obj);
}

module.exports={getAll,create,getDescription};