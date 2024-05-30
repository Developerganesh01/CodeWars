const router=require('express').Router();
const path=require("path");

const {getAll,getDescription,create}=require(path.join(__dirname,"..","controllers","problemController.js"))

router.get("/getall",getAll);
router.post("/create",create);
router.get("/:id",getDescription);

module.exports=router;