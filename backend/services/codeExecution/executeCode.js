const path=require("path");
const executeCpp=require(path.join(__dirname,"executeCpp.js"));
const executeJava=require(path.join(__dirname,"executeJava.js"));
const executePython=require(path.join(__dirname,"executePython.js"));
//for every testcase i will call this function 
async function executeCode(language,output,input,compiledFilePath){
  let obj;
  switch(language)
  {
    case "cpp":
       obj=await executeCpp(output,input,compiledFilePath);
      return obj;
    case "py":
       obj=await executePython(output,input,compiledFilePath);
      return obj;
    case "java":
       obj=await executeJava(output,input,compiledFilePath);
      return obj;
    default:
      throw new Error("Not supported");
  }

}
module.exports=executeCode;