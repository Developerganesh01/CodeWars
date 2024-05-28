import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import Loading from "../components/Loading";
import Bargraph from "../components/Bargraph";
import Piechart from "../components/Piechart";
function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useState(false);
  useEffect(()=>{
    //on Dashboard i want to show bar graph of number of problems vs rating
    //and pei chart of accuracy accpted/wrong answer/compilation error
    //to do so make request user/Dashboard

  },[]);
  // if (!loading && !auth) {
  //   navigate("/login");
  //   return;
  // }


  return loading ? <Loading /> : 
  <div>
    <div><Bargraph/></div>
    <div><Piechart/></div>
 
  </div>;
}
export default Dashboard;
