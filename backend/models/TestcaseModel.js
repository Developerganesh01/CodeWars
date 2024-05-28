const { default: mongoose } = require('mongoose');
const express=require('mongoose');
const TestCaseSchema=new mongoose.Schema({
  input:{
    type:String
  },
  output:{
    type:String,
    required:true
  },
  problemId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'ProblemModel'
  }
  
});


const TestCaseModel=mongoose.model('TestCaseModel',TestCaseSchema);
module.exports=TestCaseModel;