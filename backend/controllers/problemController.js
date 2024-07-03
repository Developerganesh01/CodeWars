const path=require("path");
const ProblemModel=require(path.join(__dirname,"..","models","ProblemModel.js"));

async function getAll(req,res){
  //send 10 problems randomly
  //[{},{},.....] send array of problems which contains only problem id,title and problem rating
  //in find provide string for projection
  //when we use limit without sort random 10 documents will be fetched
  const username=req.username;
  const role=req.role;
  const problemData=await ProblemModel.find({},'_id title rating');
  res.status(200).json({
    role,
    problemData});
}

async function create(req,res){
  //create problem and return 

  //check for authorization
  if(req.role!=="problemsetter"){
    return res.status(400).json({
      status:"failed",
      msg:"permission denied !!!"
    })
  }
  //req.body contains details
  // console.log(req.body);
  const{title,description,sampleinput,sampleoutput,rating,inputformat,outputformat}=req.body;
  if(!(title && description && sampleinput && sampleoutput && rating && inputformat && outputformat)){
    return res.status(400).json({
      status:"failed",
      msg:"provide all necessary details about problem"
    });
  }
  const problem={
    title,
    description,
    sampleinput,
    sampleoutput,
    rating,
    inputformat,
    outputformat    
  };

  const newproblem=new ProblemModel(problem);
  try{
    await newproblem.save();
  }
  catch(err)
  {
    // console.log(err);
    res.status(400).json({
      status:"failed",
      msg:"something went wrong"
    });
    return ;
  }
  // console.log(newproblem._id);
  res.status(201).json({
    status:"success",
    msg:"problem saved",
    problemId:newproblem._id
  });
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