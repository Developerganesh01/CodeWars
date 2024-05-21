import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import Loading from "../components/Loading";
function Submission() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(false);
  if (!loading && !auth) {
    navigate("/login");
    return;
  }

  return loading ? <Loading /> : <div></div>;
}
export default Submission;
