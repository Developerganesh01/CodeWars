const {exec}=require("promisify-child-process");
async function executeJava(output,input,compiledFilePath)
{
  try{
    console.log(compiledFilePath);
    const directory=compiledFilePath.split("[]")[0];
    const className=compiledFilePath.split("[]")[1];
    const child=exec(`cd ${directory} && java ${className}`);
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
        return {
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
module.exports=executeJava;