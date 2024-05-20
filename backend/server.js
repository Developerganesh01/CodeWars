const express=require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const cookieparser=require('cookie-parser');
const path=require('path');
const { type } = require('os');
const authRoute=require(path.join(__dirname,'routes','authRoutes.js'));
const userRoute=require(path.join(__dirname,'routes','userRoutes.js'));
const problemRoute=require(path.join(__dirname,'routes','problemRoutes.js'));

const app=express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieparser());


const PORT=process.env.PORT || 7000;
const MONGODB_STRING=process.env.MONGODB_STRING;
const MONGODB_USER=process.env.MONGODB_USER;
const MONGODB_PASSWORD=process.env.MONGODB_PASSWORD;


mongoose.connect(MONGODB_STRING.replace('<user>',MONGODB_USER).replace('<password>',MONGODB_PASSWORD)).
then(conn=>{
  console.log("connected to mongoDB"); 
})



app.use('/auth',authRoute);
app.use('/user',userRoute);
app.use('/problem',problemRoute);



app.listen(PORT,()=>{
  console.log(`server started on port ${PORT}`);
})