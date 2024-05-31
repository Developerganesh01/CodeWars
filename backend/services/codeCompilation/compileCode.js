const path=require("path");
const{writeFile,mkdir}=require("node:fs/promises");
const{v4:uuidv4}=require("uuid");
const{exec}=require("promisify-child-process");

async function compileCode(language,code){
  //create code folder and src file if does't exist
  const codeFolder=path.join(__dirname,"..","..","code");
  const codeFilePath=path.join(__dirname,"..","..","code",`${uuidv4()}.${language}`);
  try{
    await mkdir(codeFolder,{recursive:true});
    await writeFile(codeFilePath,code);
  }catch(err)
  {
    console.log(err);
    throw new Error("error while creating files");
  }
  //compile code and return compiled file path
  /* commands for compiling and executing the programs
  1)cpp
  g++ filepath -o exefilepath (compiling)
  exefilepath (executing) 
  so return "exefilepath"
  2)java
  javac filepath (compiling)
  java -cp "directorypath fileName" (executing) 
  so return directotypath fileName
  3)Python (interpreter)
  python filepath (runing ) 
  so  return codefilepath only
  */
 if(language==="cpp"){
  try{
    const exeFilePath=codeFilePath.split(".")[0]+".exe";
    const child=exec(`g++ ${codeFilePath} -o ${exeFilePath}`);
    await child;
    return exeFilePath;
  }catch(err){
    throw err;
  }
 }else if(language==="java"){
  try{
    const directoryFilePath=codeFilePath.split("code")[0]+"code";
    const fileName=codeFilePath.split("code")[1].split(".")[0];
    const child=exec(`javac ${codeFilePath}`);
    await child;
    return directoryFilePath+" "+fileName;
  }catch(err){
    throw err;
  }
 }else if(language==="py"){
    return codeFilePath;
 }else{
  throw new Error("language not supported !!!");
 }
}

module.exports=compileCode;