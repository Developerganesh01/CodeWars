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
  const[descdata,setdescdata]=useState(null);
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
        const temp=<Problembox obj={obj}/>;
        setdescdata(temp);
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
  return(
    <div className={styles["problemdesc-container"]}>
      <div className={styles["problemdesc-container__left"]}>
        <p>compiler</p>
        <textarea placeholder="//code here"></textarea>
        <div className={styles["pdesc-footer"]}>
          <button>Run</button>
          <button>Submit</button>
        </div>
      </div>
      <div className={styles["problemdesc-container__right"]}>{descdata}</div>
    </div>
  );
}
export default ProblemDesc;