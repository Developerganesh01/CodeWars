const {exec}=require("promisify-child-process");
async function executePython(output,input,compiledFilePath)
{
  try{
    const child=exec(`python ${compiledFilePath}`);
    child.stdin.write(input);
    child.stdin.end();
    const {stdout,stderr}=await child;
    if(stderr)
      {
        // console.log(stderr);
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
    // console.log(err);
    return{
      verdict:"error",
      msg:err.message
    }
  }
}
module.exports=executePython;