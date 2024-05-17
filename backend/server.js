const express=require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const path=require('path');
const { type } = require('os');

const app=express();
dotenv.config();

const PORT=process.env.PORT || 7000;
const MONGODB_STRING=process.env.MONGODB_STRING;
const MONGODB_USER=process.env.MONGODB_USER;
const MONGODB_PASSWORD=process.env.MONGODB_PASSWORD;


mongoose.connect(MONGODB_STRING.replace('<user>',MONGODB_USER).replace('<password>',MONGODB_PASSWORD)).
then(conn=>{
  console.log("connected to mongoDB"); 
})




app.listen(PORT,()=>{
  console.log(`server started on port ${PORT}`);
})