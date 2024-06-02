import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Submission.module.css";
import Loading from "../components/Loading";
import UserSubmissions from "../components/UserSubmissions";
function Submission() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(false);
  const[submissionsData,setSubmissionsData]=useState(null);

  //useEffect
  useEffect(()=>{

    //update states in async only when we get data
    async function getData()
    {
      //send server get request for user's submissions
      //to send cookie set credentials as include
      const response=await fetch('http://localhost:4000/user/getsubmissions',{
        method:'GET',
        credentials:'include'
      })
      //if response is not ok or gets error
      setLoading(false);
      if(!response.ok)
        {
          setAuth(false);
          return ;
        }
        setAuth(true);
        const data=await response.json();
        //data contains array of object ,objects field are=>submissionid,title,verdict,rating
        const temp=data.map((obj)=>{
          return (
            <UserSubmissions obj={obj}/>
          )
        });

        //now we have array of jsx set it to submissionData
        setSubmissionsData(temp);
    }
    getData();
  },[]);

  if (!loading && !auth) {
    navigate("/login");
    return;
  }

  if(loading){
    return <Loading/>;
  }
  return (
    <div className={styles["submission-container"]}>
      <div className={styles["submission-container__header"]}>
        <li className={styles["submission-container__header-verdict"]}>verdict</li>
        <li className={styles["submission-container__header-title"]}>problem title</li>
        <li className={styles["submission-container__header-rating"]}>rating</li>
      </div>
      <div className={styles["submission-container__content"]}>
      {submissionsData}
      </div>
    </div>
  );
}
export default Submission;
