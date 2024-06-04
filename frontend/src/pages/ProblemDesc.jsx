import { useState,useEffect } from "react";
import { useParams,useNavigate} from "react-router-dom";
import styles from "./ProblemDesc.module.css";
import Loading from "../components/Loading";
import Problembox from "../components/Problembox";
function ProblemDesc()
{

  const {id}=useParams();
  const[loading,setLoading]=useState(true);
  const[auth,setAuth]=useState(false);
  const[code,setCode]=useState("");
  const[descData,setdescData]=useState(null);
  const[verdict,setVerdict]=useState("");
  const[language,setLanguage]=useState("cpp");
  const navigate=useNavigate();
  useEffect(()=>{

    async function getData()
    {
      const response=await fetch(`http://localhost:4000/problem/${id}`,{
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
      //problembox is child component contains input ,output box to handle change
      //in child component we will pass functions from parent to child and child calls
      //this functions and sets state variable of parent here child
      //will change sample input only output will be provided by browser


      //state uplifting
      //handlinputData when user pastes input
      function handleInputChange(obj)
      {
        //here obj is modified obj passsed by chid component 
        //i.e. we have obj with updated sampleinput
        setdescData(obj);
      }
      //handleCodeChange
      function handleCodeChange(e)
      {
        setCode(e.target.value);
        // console.log(e.target.value);
      }
      //handleLanguageCjange for submission
      function handleLanguageChange(e){
        setLanguage(e.target.value);
        // console.log(e.target.value);
      }
      //handleRun
      async function handleRun()
      {
        // window.alert("running 🏃‍♂️🏃‍♂️🏃💨 !!!")
        //send post request server and get output 
        const response=await fetch(`http://localhost:4000/user/run/${id}`,{
          method:'POST',
          credentials:'include',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({code:code,
            input:descData.sampleinput
          })
        })
        if(!response.ok)
          {
            navigate('/login');
            return;
          }
          const data=await response.json();
          //data is object contains output key
          setdescData({
            ...descData,
            sampleoutput:data.output
          })
          
          console.log('ok from client side');
      }
      //handleSubmit
     async function handleSubmit()
      {
        //send code
        const response=await fetch(`http://localhost:4000/user/submit/${id}`,{
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
        const data=await response.json();
        setVerdict(data.verdict);
      }
  return(
    <div className={styles["problemdesc-container"]}>
      <div className={styles["problemdesc-container__left"]}>
       <select onChange={handleLanguageChange}>
        <option value="cpp">C++</option>
        <option value="java">JAVA</option>
        <option value="py">PYTHON</option>
       </select>
        <textarea placeholder="//code here" name="code" onChange={handleCodeChange}></textarea>
        <div className={styles["pdesc-footer"]}>
          <button onClick={handleRun}>Run</button>
          <button onClick={handleSubmit}>Submit</button>
          <p className={verdict?(verdict==='accepted'?styles["act"]:styles["nact"]):""}>{verdict}</p>
        </div>
      </div>
      <div className={styles["problemdesc-container__right"]}>
       {descData?<Problembox obj={descData} handleInputChange={handleInputChange} />:<Loading />}
      </div>
    </div>
  );
}
export default ProblemDesc;