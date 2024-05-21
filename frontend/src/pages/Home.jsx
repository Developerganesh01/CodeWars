import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import Loading from "../components/Loading";
function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(true);
const[problems,setProblems]=useState(null);
  useEffect(()=>{

    async function getData(){

      const response=await fetch('http://localhost:4000/problem/getall',
        {
          method:'GET',
          credentials:'include'
        }
      );
      setLoading(false);
      if(!response.ok)
        {
          setAuth(false);
          return ;
        }else{
          setAuth(true);
        }
        const data=await response.json();
        //id title rating
        const temp=data.map((obj)=>{
          return (
            <div >
              <p>problemId :{obj._id}</p>
              <p>title :{obj.title}</p>
              <p>rating :{obj.rating}</p>
            </div>
          )
        })
        setProblems(temp);
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
          {problems}
         </div>
         );
}
export default Home;
