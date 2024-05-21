import { Link } from "react-router-dom";
import styles from "./Problem.module.css";
function UserSubmissions({obj})
{
  // console.log(obj);
  const {_id,title,rating,verdict,}=obj;
  return (
    <Link className={styles["problem-box"]} to={`/submission/${_id}`}>
      <li className={`${styles["problem-box__sr"]} ${verdict==='accepted'?styles["acpt"]:styles["nacpt"]}`}>
        {verdict}</li>
      <li className={styles["problem-box__title"]}>{title}</li>
      <li className={styles["problem-box__rating"]}>{rating}</li>
   </Link>
  );
}
export default UserSubmissions;