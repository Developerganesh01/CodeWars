import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {ToastContainer,toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
// import SyntaxHighlighter from 'react-syntax-highlighter';
import styles from "./ParticularSubmission.module.css";
import Loading from "../components/Loading";
import MonacoEditor from '@monaco-editor/react';
function ParticularSubmission(){
  const params=useParams();
  const navigate=useNavigate();
  const submissionId=params.id;
  const [code,setCode]=useState("");
  const[language,setLanguage]=useState("cpp");
  const [loading,setLoading]=useState(true);
  const[auth,setAuth]=useState(false);
  useEffect(()=>{
    async function getData(){
      const response=await fetch(`http://localhost:4000/user/viewsubmission/${submissionId}`,{
        method:'GET',
        credentials:'include'
      });
      setLoading(false);
      if(!response.ok){
        setAuth(false);
        console.log("not authenticated");
      }
     else{ setAuth(true);
      let data=await response.json();
      setLanguage(data.language);
      setCode(data.code);
      // console.log(data);
     }
    }
    getData();

 },[]);
  if(!loading&&!auth){
    navigate("/login");
    return;
  }
  async function handleCopy(){
    try{
      await navigator.clipboard.writeText(code);
      toast.success("Text copied to clipboard",{
        position:"top-center",
        autoClose:900,
        hideProgressBar:false,
        closeOnClick:true,
        pauseOnHover:true,
        draggable:true,
        progress:undefined
      })
    }
    catch(err){
      console.error("error while coping : ",err);
      toast.error("Failed to copy text.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
    }
  }
  if(loading){
    return <Loading/>;
  }
  return (
    <div className={styles["submission-container"]}>
     <div className={styles["submission-container__header"]}>language: {language}</div>
     <div className={styles["submission-container__content"]}>
     <MonacoEditor
          height="82vh"
          language={language === 'py' ? 'python' : language}
          value={code}
          theme="vs-dark"
          options={{
            readOnly:true
          }
          }
        />
      <button className={styles["copy-btn"]} onClick={handleCopy}>copy</button>
     <ToastContainer/>
     </div>
    </div>
  )                                                                                               
}
export default ParticularSubmission;