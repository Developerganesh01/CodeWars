import Header from "./Header";
import { Outlet } from "react-router-dom";
import styles from "./Layout.module.css";
/*
we will use layout for  sharing common ui
*/
function Layout()
{ 
  function handleGoBack()
  {
    if(window.history.length>1)
    {
      window.history.back();
    }
    else
    {
      window.location.href="/";
    }
  }
  return (
    <div className={styles["container"]}>
      <div className={styles["header"]}>  <Header/></div>
      <div className={styles["main"]}> <Outlet/></div>
      <button className={styles["back-button"]} onClick={handleGoBack}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5"></path>
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l-7-7 7-7"></path>
        </svg>
        </button>
    </div>
  )

}
export default Layout;