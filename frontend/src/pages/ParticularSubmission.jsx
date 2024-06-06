import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import styles from "./ParticularSubmission.module.css";
import Loading from "../components/Loading";
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
  if(loading){
    return <Loading/>;
  }
  return (
    <div className={styles["submission-container"]}>
     <div className={styles["submission-container__header"]}>{language}</div>
     <pre className={styles["submission-container__content"]}> {code} </pre>
    </div>
  )                                                                                               
}
export default ParticularSubmission;