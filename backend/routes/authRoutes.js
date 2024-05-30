const path=require("path");
const express=require("express");
const router=express.Router();

/*=================importing Controllers============================*/
const {loginUser,signupUser}=require(path.join(__dirname,"..","controllers","authController.js"));

router.post("/login",loginUser);
router.post("/signup",signupUser);

module.exports=router;