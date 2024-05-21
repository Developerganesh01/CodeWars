import Header from "./Header";
import { Outlet, useLocation, useParams } from "react-router-dom";
import styles from "./Layout.module.css";
// import { useState } from "react";
// import Loading from './Loading';
/*
we will use layout for authentication purpose and for sharing common ui
*/
function Layout()
{
  // const params=useParams();
  // console.log(params);
  const {pathname}=useLocation();
  // console.log(pathname);
  switch(pathname)
  {
    case '/':
      console.log('inside home');
    break;
    case '/submission':
      console.log('inside submission');
    break;
    case '/dashboard':
      console.log('inside dashboard');
    break;
    case '/profile':
      console.log('inside profile');
    break;
    default:
      console.log('invalid url');
    break;

  }
 
  return (
    <div className={styles["container "]}>
      <div className={styles["header"]}>  <Header/></div>
      <div className={styles["main"]}> <Outlet/></div>
    </div>
  )

}
export default Layout;