const express=require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const cookieparser=require('cookie-parser');
const cors=require('cors');
const path=require('path');

/*===================== importing routers========================================*/
const authRouter=require(path.join(__dirname,'routes','authRoutes.js'));
const userRouter=require(path.join(__dirname,'routes','userSubmissionRoutes.js'));
const problemRouter=require(path.join(__dirname,'routes','problemRoutes.js'));
const testcaseRouter=require(path.join(__dirname,'routes','testcaseRoutes.js'));


/*========================importing middlewares========================================*/
const authMiddleware=require(path.join(__dirname,'middleware','auth.js'));


const app=express();
dotenv.config();

app.use(cors({
  origin:process.env.ORIGIN,
  credentials:true
}));
app.use(cookieparser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));



const PORT=process.env.PORT || 4000;
const MONGODB_STRING=process.env.MONGODB_STRING;
const MONGODB_USER=process.env.MONGODB_USER;
const MONGODB_PASSWORD=process.env.MONGODB_PASSWORD;


mongoose.connect(MONGODB_STRING.replace('<user>',MONGODB_USER).replace('<password>',MONGODB_PASSWORD)).
then(conn=>{
  console.log("connected to mongoDB"); 
})

//testing without sending toke cookie
app.get("/test",(req,res)=>{
  res.status(200).send("works fine")
})

app.use('/api/auth',authRouter);
app.use('/api/user',authMiddleware,userRouter);
app.use('/api/problem',authMiddleware,problemRouter);
app.use('/api/testcase',authMiddleware,testcaseRouter);



app.listen(PORT,()=>{
  console.log(`server started on port ${PORT}`);
})