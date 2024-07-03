import { useState,useEffect } from "react";
import { useParams,useNavigate} from "react-router-dom";
import styles from "./ProblemDesc.module.css";
import Loading from "../components/Loading";
import Problembox from "../components/Problembox";
// import SyntaxHighlighter from "react-syntax-highlighter";
// import {vs2015 } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import MonacoEditor from '@monaco-editor/react';
import TestcaseResult from "../components/TestcaseResult";
import { ToastContainer ,toast} from "react-toastify";
function ProblemDesc()
{

  const {id}=useParams();
  const[loading,setLoading]=useState(true);
  const[auth,setAuth]=useState(false);
  const[code,setCode]=useState("");
  const[descData,setdescData]=useState(null);
  const[verdict,setVerdict]=useState("");
  const[language,setLanguage]=useState("cpp");
  const[testResultContent,setTestResultContent]=useState("");
  const[testcaseContent,setTestcaseContent]=useState("");
  const[activeContent,setActiveContent]=useState(true);

  const navigate=useNavigate();
  useEffect(()=>{

    async function getData()
    {
      const response=await fetch(`${process.env.REACT_APP_BACKEND_URL}/problem/${id}`,{
        method:'GET',
        credentials:'include'
      });
      setLoading(false);
      if(!response.ok)
        {
          setAuth(false);
          return;
        }
        setAuth(true);
        const obj=await response.json();
        setdescData(obj);
        // const temp=<Problembox obj={obj}/>;
        // setdescdatajsx(temp);
    }
    getData();
  },[]);
  if(!loading&&!auth)
    {
      navigate('/login');
      return;
    }
    if(loading)
      {
        return <Loading/>;
      }

      //display error msg if user try to submit/run empty code
      function displayNoCodeError()
      {
        toast.success("Code is not provided !!!⬇️",{
          position:"top-center",
          autoClose:900,
          hideProgressBar:false,
          closeOnClick:true,
          pauseOnHover:true,
          draggable:true,
          progress:undefined
        })
      }

  
      //handlinputData when user pastes input
      function handleInputChange(e)
      {
        setTestcaseContent(e.target.value);
        console.log(e.target.value);
      }
      //handleCodeChange
      function handleCodeChange(val)
      {
        setCode(val);
        // console.log(e.target.value);
      }
      //handleLanguageCjange for submission
      function handleLanguageChange(e){
        setLanguage(e.target.value);
        // console.log(e.target.value);
      }
      //handleTestcaseActive
      function handleTestcaseActive(){
        setActiveContent(true);
      }
      //handleTestresultActive
      function handleTestresultActive(){
        setActiveContent(false);
      }
      //handleRun
      async function handleRun()
      {
        // window.alert("running 🏃‍♂️🏃‍♂️🏃💨 !!!")
        //send post request server and get output 
        if(!code){
          displayNoCodeError();
          return;
        }
        const response=await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/run/${id}`,{
          method:'POST',
          credentials:'include',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({
            code:code,
            input:testcaseContent,
            language
          })
        })
        if(!response.ok){
          navigate("/login");
        }
          const data=await response.json();
          //data is object contains output key
          setActiveContent(false);
          setTestResultContent(data.output);
      }
      //handleSubmit
     async function handleSubmit()
      {
        if(!code)
          {
            displayNoCodeError();
            return;
          }
        //send code
        const response=await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/submit/${id}`,{
          method:'POST',
          credentials:'include',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({
            code,
            language
          })
        });
        if(!response.ok){
          navigate("/login");
        }
        const data=await response.json();
        setVerdict(data.verdict);
        setActiveContent(false);
        if(data.verdict!=="compilation error"){
        const temp=data.testcaseResult.map((obj)=>{
          return (
            <TestcaseResult verdict={obj.verdict} />
          )
        });
        setTestResultContent(temp);}
        else{
          setTestResultContent(data.msg);
        }
      }
  return(
    <div className={styles["problemdesc-container"]}>
      <div className={styles["problemdesc-container__left"]}>
       <select onChange={handleLanguageChange}>
        <option value="cpp">C++</option>
        <option value="java">JAVA</option>
        <option value="py">PYTHON</option>
       </select>
       <div className={styles["code-editor"]}>
          <MonacoEditor
          height="70vh"
          language={language === 'py' ? 'python' : language}
          value={code}
          onChange={handleCodeChange}
          theme="vs-dark"
        />
       </div>
        <div className={styles["pdesc-footer"]}>
          <div className={styles["pdesc-footer__header"]}>
            <button onClick={handleRun}>Run</button>
            <button onClick={handleSubmit}>Submit</button>
            <button className={activeContent?styles["active"]:""} onClick={handleTestcaseActive}>Testcase</button>
            <button className={!activeContent?styles["active"]:""} onClick={handleTestresultActive}>TestResult</button>
            <p className={verdict?(verdict==='accepted'?styles["act"]:styles["nact"]):""}>{verdict}</p>
          </div>
          <div className={styles["pdesc-footer__content"]}>
            {activeContent&&<textarea onChange={handleInputChange}>{testcaseContent}</textarea>}
            {!activeContent&&
            <div className={styles["testcase-result"]}>
              {testResultContent}
            </div>
              }
          </div>
          
        </div>
      </div>
      <div className={styles["problemdesc-container__right"]}>
       {descData?<Problembox obj={descData} />:<Loading />}
      </div>
      <ToastContainer/>
    </div>
  );
}
export default ProblemDesc;