const router=require('express').Router();
const path=require("path");
const {create}=require(path.join(__dirname,"..","controllers","testcaseController"));


router.post('/create',create);

module.exports=router;