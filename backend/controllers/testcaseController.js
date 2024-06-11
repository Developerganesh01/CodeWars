const path=require("path");
const TestCaseModel=require(path.join(__dirname,"..","models","TestcaseModel.js"));
async function create(req,res)
{
  if(req.role!=="problemsetter"){
    return res.status(400).json({
      status:"failed",
      msg:"Permission denied !!!"
    })
  }
  const {problemId,input,output}=req.body;

  if(!(problemId && input && output)){
    return res.status(400).json({
      status:"failed",
      msg:"Provide all details of Testcase !!!"
    })
  };
  const newtestcase=new TestCaseModel({
    input,
    output,
    problemId
  })

  await newtestcase.save();
  res.status(201).json({
    status:"success",
    msg:"Testcase Saved"
  });
}
module.exports={create};
