import { Link } from "react-router-dom";
import styles from "./Problem.module.css";
function Problem({obj})
{
  // console.log(obj);
  const {_id,title,rating,ct}=obj;
  return (
    <Link className={styles["problem-box"]} to={`/problem/${_id}`}>
      <li className={styles["problem-box__sr"]}>{ct}</li>
      <li className={styles["problem-box__title"]}>{title}</li>
      <li className={styles["problem-box__rating"]}>{rating}</li>
   </Link>
  );
}
export default Problem;