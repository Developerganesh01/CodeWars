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


app.use(cookieparser());
app.use(cors({
  origin:'http://localhost:3000',
  credentials: true
}));
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



app.use('/auth',authRouter);
app.use('/user',authMiddleware,userRouter);
app.use('/problem',authMiddleware,problemRouter);
app.use('/testcase',authMiddleware,testcaseRouter);



app.listen(PORT,()=>{
  console.log(`server started on port ${PORT}`);
})