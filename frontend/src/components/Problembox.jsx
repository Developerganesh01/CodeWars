import styles from "./Problembox.module.css";
function Problembox({obj,handleInputChange})
{
  const{title,description,sampleinput,sampleoutput}=obj;
  //handleChange is function of this component which will call handleInputChange of parent
  function handleChange(e)
  {
    obj={
      ...obj,
      [e.target.name]:e.target.value
    }
    handleInputChange(obj);
  }
  return(
    <div className={styles["problemdesc-box"]}>
      <div className={styles["problemtitle-box"]}>
        {title}
      </div>
      <div className={styles["problemstatement-box"]}>
        {description}
      </div>
      <div className={styles["problemio-box"]}>
        <div className={styles["probleminput-box"]}>
          <p>input</p>
          <textarea value={sampleinput} onChange={handleChange} name="sampleinput"></textarea>
        </div>
        <div className={styles["problemoutput-box"]}>
          <p>output</p>
          <textarea value={sampleoutput} name="sampleoutput"></textarea>
        </div>
      </div>
    </div>

  );
}
export default Problembox;