const path=require("path");
const TestCaseModel=require(path.join(__dirname,"..","models","TestcaseModel.js"));
async function create(req,res)
{
  const {problemId,input,output}=req.body;
  const newtestcase=new TestCaseModel({
    input,
    output,
    problemId
  })

  await newtestcase.save();
  res.status(201).json(newtestcase);
}
module.exports={create};
