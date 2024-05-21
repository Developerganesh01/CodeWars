import { useState } from "react";
import styles from "./style.module.css";
import { useNavigate } from "react-router-dom";
function SignUp()
{
  const[formData,setFormData]=useState(null);
  const[loading,setLoading]=useState(true);
  const navigate=useNavigate();
  if(!loading)
    {
      navigate('/home');
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
      let response=await fetch('http://localhost:4000/auth/signup',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        credentials:'include',
        body:JSON.stringify({
          username:formData.username,
          email:formData.email,
          password:formData.password
        }),
      });
      if(!response.ok)
        {
          console.log("error");
          return ;
        }
     const data=await response.json();
      if(!data)
        {
          //something worng 
          console.log("not good");
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
        <input id="username"type="text" name="username" placeholder="username" onChange={handleChange} />
      </div>
      <div className={styles["form-box__input-box"]}>
        <label htmlFor="email">email :</label>
        <input id="email" name="email" type="email" placeholder="example@gmail.com" onChange={handleChange}/>
      </div>
      <div className={styles["form-box__input-box"]}>
        <label htmlFor="password">password :</label>
        <input id="password" name="password" type="password" onChange={handleChange}/>
      </div>
      <button type="submit" className={styles["form-btn"]}>Sign Up</button>
    </form>
  )
}
export default SignUp;