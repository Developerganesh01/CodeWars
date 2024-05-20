import Header from "./Header";
import { Outlet } from "react-router-dom";
import styles from "./Layout.module.css";
/*
we will use layout for authentication purpose and for sharing common ui
*/
function Layout()
{


  return (
    <div className={styles["container "]}>
      <div className={styles["header"]}>  <Header/></div>
      <div className={styles["main"]}>  <Outlet/></div>
    </div>
  )

}
export default Layout;