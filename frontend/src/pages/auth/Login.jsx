import { useState } from "react";
import styles from "./style.module.css";
import { useNavigate } from "react-router-dom";
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
      let data=await fetch('http://localhost:4000/auth/login',{
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
      data=await data.json();
      if(!data)
        {
          //something worng 
        }
      else{
        //we get data 
        setLoading(false);
      }
    }
    getData();
  }
  return (
    <form onSubmit={handleSubmit} className={styles["form-box"]}>
      <div className={styles["form-box__input-box"]}>
        <label htmlFor="username">username :</label>
        <input required id="username"type="text" name="username" placeholder="username" onChange={handleChange} />
      </div>
      <div className={styles["form-box__input-box"]}>
        <label htmlFor="password">password :</label>
        <input required id="password" name="password" type="password" onChange={handleChange}/>
      </div>
      <button type="submit" className={styles["form-btn"]}>Login</button>
      <a href="/signup">signup ?</a>
    </form>
  );
}
export default Login;