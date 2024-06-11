import styles from "./TestcaseResult.module.css"
function TestcaseResult({verdict}){
  return (
    <p className={verdict==="accepted"?styles["passed"]:styles["failed"]} >
      {verdict==="accepted"?"Testcase passed ✅":"Testcase failed"}
    </p>
  )
}
export default TestcaseResult;
