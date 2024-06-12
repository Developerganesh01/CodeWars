import styles from "./ProblemAdd.module.css";
import { useState,useRef } from "react";
import {ToastContainer,toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
function ProblemAdd(){
  const[obj,setObj]=useState(
    {
      title:"",
      description:"",
      sampleinput:"",
      sampleoutput:"",
      inputformat:"",
      outputformat:"",
      rating:""
    }
  );
  const[problemId,setProblemId]=useState("");
  const[testcaseData,setTestcaseData]=useState({
    problemId:"",
    input:"",
    output:""
  });

  //notifications
  function successNotification(msg){
    toast.success(msg,{
      position:"top-center",
      autoClose:900,
      hideProgressBar:false,
      closeOnClick:true,
      pauseOnHover:true,
      draggable:true,
      progress:undefined
    })
  }
  function errorNotification(msg){
    toast.error(msg,{
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  //handle problem data 
  function handleOnChange(e){
    setObj({
      ...obj,
      [e.target.name]:e.target.value
    });
  }

  //handle testcase data
  function handleOnChangeTestcaseData(e){
    setTestcaseData({
      ...testcaseData,
      [e.target.name]:e.target.value
    });
  }
  //fillpid
  const problemIdRef=useRef(null);
  function fillPid(){
    if(problemIdRef.current){
      problemIdRef.current.value=problemId;
    }
    setTestcaseData((prev)=>{
      return ({
        ...testcaseData,
        problemId
      })
    })
  }
  //handeling addproblem
  async function handleAddProblem(){
    console.log(obj);
    const response=await fetch(`${process.env.REACT_APP_BACKEND_URL}/problem/create`,{
      method:"POST",
      credentials:"include",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(obj)
    });
    const data=await response.json();
    //data={status:"success",msg:,pid}
    if(!response.ok){
      errorNotification(data.msg);
      return;
    }
    successNotification(data.msg);
    setProblemId(data.problemId);
  }
  //handeling addtestcase
  async function handleAddTestcase(){
    console.log(testcaseData);
    const response=await fetch(`${process.env.REACT_APP_BACKEND_URL}/testcase/create`,{
      method:"POST",
      credentials:"include",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(testcaseData)
    })
    const data=await response.json();
    //data={status:,msg:}
    if(!response.ok){
      errorNotification(data.msg);
      return;
    }
    successNotification(data.msg);
  }

  return (
    <div className={styles["container"]}>


      <div className={styles["container-addproblem"]}>

        <div className={styles["container-addproblem__cont"]}>
          <div className={styles["container-addproblem__title"]}>
            <input name="title" type="text" id="title" placeholder="Problem Title"  onChange={handleOnChange}/>
          </div>
          <div className={styles["container-addproblem__desc"]}>
            <h4>problem statement :</h4>
            <textarea name="description" placeholder="Problem Statement" onChange={handleOnChange}></textarea>
          </div>
        </div>

        <div className={styles["container-addproblem__ioformat"]}>
          <div className={styles["container-addproblem__ioformat-input"]}>
            <h4>input format :</h4>
            <textarea name="inputformat" placeholder="Input Format" onChange={handleOnChange}></textarea>
          </div>
          <div className={styles["container-addproblem__ioformat-output"]}>
            <h4>output format :</h4>
            <textarea name="outputformat" placeholder="Output Format" onChange={handleOnChange}></textarea>
          </div>
        </div>

        <div className={styles["container-addproblem__sampleio"]}>
          <div className={styles["container-addproblem__sampleio-input"]}>
            <h4>sample input :</h4>
            <textarea name="sampleinput" placeholder="Sample Input" onChange={handleOnChange}></textarea>
          </div>
          <div className={styles["container-addproblem__sampleio-output"]}>
            <h4>sample output :</h4>
            <textarea name="sampleoutput" placeholder="Sample Output" onChange={handleOnChange}></textarea>
          </div>
        </div>
        <div className={styles["container-addproblem__btn-box"]}>
          <div><input name="rating" type="number" placeholder="Problem Rating" onChange={handleOnChange}/></div>
          <button onClick={handleAddProblem}>add problem </button>
        </div>
      </div>


      <div className={styles["container-addtestcase"]}>
        <div className={styles["container-addtestcase__pid"]}>
          <div className={styles["container-addtestcase__pid-id"]}>
            <input ref={problemIdRef} name="problemId" type="text" placeholder="ProblemId" required onChange={handleOnChangeTestcaseData} />
          </div>
          <div className={styles["container-addtestcase__btn-box"]}>
            <button onClick={handleAddTestcase}>add testcase</button>
            <button className={styles["fillpid-btn"]} onClick={fillPid}>get pid</button>
          </div>
        </div>
        <div className={styles["container-addtestcase__io"]}>
          <div className={styles["container-addtestcase__io-input"]}>
            <h4>Testcase input :</h4>
            <textarea name="input" placeholder="Testcase Output" onChange={handleOnChangeTestcaseData}></textarea>
          </div>
          <div className={styles["container-addtestcase__io-output"]}>
            <h4>Testcase output :</h4>
            <textarea name="output" placeholder="Testcase Output" onChange={handleOnChangeTestcaseData}></textarea>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  )
}
export default ProblemAdd;