import { Link } from "react-router-dom";
import styles from "./UserSubmission.module.css";
function UserSubmissions({obj})
{
  // console.log(obj);
  const {_id,title,rating,verdict,language}=obj;
  console.log(language);
  return (
    <Link className={styles["submission-box"]} to={`/submission/${_id}`}>
      <li className={`${styles["submission-box__verdict"]} ${verdict==='accepted'?styles["acpt"]:styles["nacpt"]}`}>
        {verdict}</li>
        <li className={`${styles["submission-box__language"]}`}>
        {language}</li>
      <li className={styles["submission-box__title"]}>{title}</li>
      <li className={styles["submission-box__rating"]}>{rating}</li>
   </Link>
  );
}
export default UserSubmissions;