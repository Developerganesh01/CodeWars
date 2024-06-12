import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../pages/Dashboard.module.css";
import Loading from "../components/Loading";
import Bargraph from "../components/Bargraph";
import Piegraph from "../components/Piegraph";
function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(false);
  const [barData,setBarData]=useState([]);
  const[pieData,setPieData]=useState([]);
  useEffect(()=>{
    //on Dashboard i want to show bar graph of number of problems vs rating
    //and pei chart of accuracy accpted/wrong answer/compilation error
    //to do so make request user/Dashboard
    async function getData(){
      setLoading(false);
      const response1=await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/getbardata`,{
        method:"GET",
        credentials:"include"
      });
      if(!response1.ok){
        setAuth(false);
        return;
      }
      const data=await response1.json();
      setBarData(data);
      // console.log(data);
      const response2=await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/getpiedata`,{
        method:"GET",
        credentials:"include"
      });
      if(!response2.ok){
        setAuth(false);
        return;
      }
      const data2=await response2.json();
      setPieData(data2);
      // console.log(data2);
      setAuth(true);
    }
    getData();
  },[]);
  // if (!loading && !auth) {
  //   navigate("/login");
  //   return;
  // }
  return loading ? <Loading /> : 
  <div className={styles["Dashboard-container"]}>
    <div className={styles["Dashboard__bargraph"]}><Bargraph data={barData}/></div>
    <div className={styles["Dashboard__piechart"]}><Piegraph data={pieData}/></div>
  </div>;
}
export default Dashboard;
