import styles from "./Problembox.module.css";
function Problembox({obj})
{
  const{title,description,sampleinput,sampleoutput}=obj;
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
          <textarea placeholder={sampleinput}></textarea>
        </div>
        <div className={styles["problemoutput-box"]}>
          <p>output</p>
          <textarea placeholder={sampleoutput}></textarea>
        </div>
      </div>
    </div>

  );
}
export default Problembox;