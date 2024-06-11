import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import Loading from "../components/Loading";
import Problem from "../components/Problem";
import { NavLink } from "react-router-dom";
function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(true);
  const[problemsDataJsx,setProblemsDataJsx]=useState(null);
  const[problemData,setProblemData]=useState([]);
  const [toggleSort,setToggleSort]=useState(true);
  const[role,setRole]=useState("user");
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
        //data={role,problemData:[{id,title,rating},{}..]}
        let ct=1;
        const temp=data.problemData.map((obj)=>{
          obj.ct=ct;
          ct=ct+1;
          return (
              <Problem obj={obj}/>
          )
        })
        // console.log(data);
        setRole(data.role);
        setProblemsDataJsx(temp);
        setProblemData(data.problemData);
        setLoading(false);
    }
    getData();
  },[]);
  function handleSort(){
    if(toggleSort){
      //sort in ascending order
      setToggleSort(!toggleSort);
      problemData.sort((problem1,problem2)=>{
        return problem1.rating-problem2.rating
      });
      let ct=1;
      const temp=problemData.map((obj)=>{
        obj.ct=ct;
        ct=ct+1;
        return(
          <Problem obj={obj} />
        )
      });
      setProblemsDataJsx(temp);
    }else{
      //sort in descending order
      setToggleSort(!toggleSort);
      problemData.sort((problem1,problem2)=>{
        return problem2.rating-problem1.rating; 
      });
      let ct=1;
      const temp=problemData.map((obj)=>{
        obj.ct=ct;
        ct=ct+1;
        return (
          <Problem obj={obj} />
        )
      });
      setProblemsDataJsx(temp);
    }
  }
  if (!loading && !auth) {
    navigate("/login");
    return;
  }
  if(loading){
    return <Loading />;
  }
  return (
         <div className={styles["home-container"]}>
          <div className={styles["home-container__header"]}>
            <li className={styles["home-container__header-sr"]}>#</li>
            <li className={styles["home-container__header-title"]}>title</li>
            <li className={styles["home-container__header-rating"]}>rating</li>
            <button className={styles["sort-btn"]} onClick={handleSort}>sort</button>
          </div>
          <div className={styles["home-container__content"]}>
          {problemsDataJsx}
          </div>
         {role==="problemsetter"&&<NavLink to="/addproblem"className={styles["addproblem-container"]}>
            <span>problems</span><span>&#43;</span>
          </NavLink>}
         </div>
         );
}
export default Home;
