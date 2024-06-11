import { useState } from "react";
import styles from "./style.module.css";
import { useNavigate } from "react-router-dom";
import {ToastContainer,toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
function Login()
{
  const[formData,setFormData]=useState(null);
  const[loading,setLoading]=useState(true);
  const navigate=useNavigate();
  if(!loading)
    {
      navigate('/');
    }
  function handleChange(e)
  {
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    })
  }
  function handleSubmit(e)
  {
    //send this data to server 
    e.preventDefault();
    //i do have formdata now
    async function getData()
    {
      const response=await fetch('http://localhost:4000/auth/login',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        credentials:'include',
        body:JSON.stringify({
          username:formData.username,
          password:formData.password
        }),
      });
      if(!response.ok){
        const obj=await response.json();
        toast.error(obj.msg,{
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      }else{
        setLoading(false);
      }
    }
    getData();
  }
  return (
    <form onSubmit={handleSubmit} className={styles["form-box"]}>
      <div className={styles["form-box__header"]}>
        login 
      </div>
      <div className={styles["form-box__input-box"]}>
        <input required id="username"type="text" name="username" placeholder="username" onChange={handleChange} />
      </div>
      <div className={styles["form-box__input-box"]}>
        <input required id="password" name="password" placeholder="password" type="password" onChange={handleChange}/>
      </div>
      <button type="submit" className={styles["form-btn"]}>Login</button>
      <a href="/signup">signup ?</a>
      <ToastContainer/>
    </form>
  );
}
export default Login;