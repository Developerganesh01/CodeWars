import styles from "./Header.module.css";
import { NavLink,useNavigate } from "react-router-dom";

function Header()
{
  const navigate=useNavigate();
   async function handleLogout(){
    const response=await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/logout`,{
      method:"POST",
      credentials:"include",
    });
    if(response.ok){
      navigate("/login");
    }
  }
  return (
    <div className={styles["header-container"]}>
      <div className={styles["header-container__logo"]}>
        <span>Code</span>
        <img src="./CodeWarsLogo.jpeg" alt="logo" className={styles["logo"]} />
        <span>Wars</span>
      </div>
      <ul className={styles["header-container__nav"]}>
      <li><NavLink to="/" className={({isActive})=>{
        return isActive?styles["active-btn"]:null;
      }}>Home</NavLink></li>
      <li><NavLink to="/submission"className={({isActive})=>{
        return isActive?styles["active-btn"]:null;
      }}>Submissions</NavLink></li>
      <li><NavLink to="/dashboard" className={({isActive})=>{
        return isActive?styles["active-btn"]:null;
      }}>Dashboard</NavLink></li>
      {/* <li><NavLink to="/profile" className={({isActive})=>{
        return isActive?styles["active-btn"]:null;
      }}>Profile</NavLink></li> */}
      <li><a href="#" className="logout-btn" onClick={handleLogout}>Logout</a></li>
    </ul>
    </div>
  )
}
export default Header;