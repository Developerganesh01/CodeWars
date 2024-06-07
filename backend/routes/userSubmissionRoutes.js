const router = require("express").Router();
const path=require("path");
const {getAllSubmissions,runCode,submitCode,getSubmission,getBarData,getPieData,logout}=require(path.join(__dirname,"..","controllers","userSubmissionController.js"));

router.get("/getsubmissions",getAllSubmissions);
router.get("/viewsubmission/:id",getSubmission);
router.post("/submit/:id",submitCode); 
router.post("/run/:id",runCode);
router.get("/getbardata",getBarData);
router.get("/getpiedata",getPieData);
router.post("/logout",logout)

module.exports = router;
