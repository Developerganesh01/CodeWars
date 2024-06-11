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
    // console.log(err);
    throw new Error("error while creating files");
  }
  //compile code and return compiled file path
  /* commands for compiling and executing the programs
  1)cpp
  g++ filepath -o exefilepath (compiling)
  exefilepath (executing) 
  so return "exefilepath"
  2)java
  javac filename.java (compiling)
  java  fileName" (executing) 
  so return filename (filename should be same as of className containing main method)
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
    //extract class name from main method
    const arr=code.match(
      /(public\s+)?class\s+(\w+)[\s\S]*?public\s+static\s+void\s+main\s*\(\s*String\s*\[\s*\]\s*args\s*\)/
  );
  if(!arr){
    throw new Error("can't find main class");
    return;
  }
   const className=arr[2];
  // console.log("classname is "+arr[2]);
  const compiledFilePath2=path.join(codeFolder,`${className}.java`);
  try{
    await writeFile(compiledFilePath2,code);

  }catch(err)
  {
    // console.log("error while writing file");
    throw err;
  }
  //compilenow
  const child=exec(`javac ${compiledFilePath2}`);
 await child;
//  console.log("path="+path.join(codeFolder,className));
 return path.join(codeFolder,`[]${className}`);
  }catch(err){
    // console.log("compilation err here it is line 65");
    // console.log(err);
    throw err;
  }
 }else if(language==="py"){
    return codeFilePath;
 }else{
  throw new Error("language not supported !!!");
 }
}

module.exports=compileCode;