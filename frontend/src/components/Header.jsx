import styles from "./Header.module.css";
import { NavLink,useNavigate } from "react-router-dom";

function Header()
{
  const navigate=useNavigate();
   async function handleLogout(){
    const response=await fetch("http://localhost:4000/user/logout",{
      method:"POST",
      credentials:"include",
    });
    if(response.ok){
      navigate("/login");
    }
  }
  return (
    <ul className={styles["header-container"]}>
      <li><NavLink to="/" className={({isActive})=>{
        return isActive?styles["active-btn"]:null;
      }}>Home</NavLink></li>
      <li><NavLink to="/submission"className={({isActive})=>{
        return isActive?styles["active-btn"]:null;
      }}>Submissions</NavLink></li>
      <li><NavLink to="/dashboard" className={({isActive})=>{
        return isActive?styles["active-btn"]:null;
      }}>Dashboard</NavLink></li>
      <li><NavLink to="/profile" className={({isActive})=>{
        return isActive?styles["active-btn"]:null;
      }}>Profile</NavLink></li>
      <button className={styles["logout-btn"]} onClick={handleLogout}>Log out</button>
    </ul>
  )
}
export default Header;