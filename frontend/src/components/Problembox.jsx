import styles from "./Problembox.module.css";
function Problembox({obj})
{
  const{title,description,sampleinput,sampleoutput,inputformat,outputformat}=obj;
  return(
    <div className={styles["problemdesc-box"]}>
      <div className={styles["problemtitle-box"]}>
        {title}
      </div>
      <div className={styles["problemstatement-box"]}>
        {description}
      </div>
      <div className={styles["probleminputformat-box"]}>
        <h5>input :</h5>
        <p>
        {inputformat}
        </p>
      </div>
      <div className={styles["problemoutputformat-box"]}>
        <h5>
          output:
        </h5>
        <p>
        {outputformat}
        </p>
      </div>
      <div className={styles["problemio-box"]}>
        <div className={styles["probleminput-box"]}>
          <p>Example input</p>
          <textarea value={sampleinput}  name="sampleinput"></textarea>
        </div>
        <div className={styles["problemoutput-box"]}>
          <p> Example output</p>
          <textarea value={sampleoutput} name="sampleoutput"></textarea>
        </div>
      </div>
    </div>

  );
}
export default Problembox;