import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import Loading from "../components/Loading";
import Problem from "../components/Problem";
function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(true);
const[problemsData,setProblemsData]=useState(null);
  useEffect(()=>{

    async function getData(){

      const response=await fetch('http://localhost:4000/problem/getall',
        {
          method:'GET',
          credentials:'include'
        }
      );
      if(!response.ok)
        {
          setLoading(false);
          setAuth(false);
          return ;
        }else{
          setAuth(true);
        }
        const data=await response.json();
        //id title rating
        let ct=1;
        const temp=data.map((obj)=>{
          obj.ct=ct;
          ct=ct+1;
          return (
              <Problem obj={obj}/>
          )
        })
        setProblemsData(temp);
        setLoading(false);
    }
    getData();
  },[]);

  if (!loading && !auth) {
    navigate("/login");
    return;
  }
  if(loading){
    return <Loading />;
  }
  return (
         <div className={styles["home-container"]}>
          {problemsData}
         </div>
         );
}
export default Home;
