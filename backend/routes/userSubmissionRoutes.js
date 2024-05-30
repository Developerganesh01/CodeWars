const router = require("express").Router();
const path=require("path");
const {getAllSubmissions,runCode,submitCode}=require(path.join(__dirname,"..","controllers","userSubmissionController.js"));

router.get("/getsubmissions",getAllSubmissions);
router.post("/submit/:id",submitCode); 
router.post("/run/:id",runCode);

module.exports = router;
