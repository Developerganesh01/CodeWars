const { verify } = require("jsonwebtoken");
const {exec}=require("promisify-child-process");
async function executeCpp(code,output,input,compiledFilePath)
{
  try{
    const child=exec(compiledFilePath);
    child.stdin.write(input);
    child.stdin.end();
    const {stdout,stderr}=await child;
    if(stderr)
      {
        return{
          verdict:"error",
          msg:stderr
        }
      }
    if(stdout.trim()===output){
      return{
        verdict:"accepted"
      }
    }else{
      return{
        verdict:"wrong answer"
      }
    }
  }catch(err)
  {
    return{
      verdict:"error",
      msg:err.message
    }
  }
}
module.exports=executeCpp;