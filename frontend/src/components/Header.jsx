import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";

function Header()
{
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
    </ul>
  )
}
export default Header;