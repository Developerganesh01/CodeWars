const mongoose=require('mongoose');
const ProblemSchema=new mongoose.Schema({
  title:{
    type:String,
    required:[true,"problem must have a title"],
    unique:true
  },
  description:{
    type:String,
    required:[true,"problem dsescription required"]
  },
  sampleinput:{
    type:String,
    required:[true,"provide sample input"]
  },
  sampleoutput:{
    type:String,
    required:[true,"povide sample output"]
  },
  inputformat:{
    type:String,
    required:true
  },
  outputformat:{
    type:String,
    required:true
  },
  rating:{
    type:Number,
    required:[true,"poblem must have a rating"]
  }
})
const ProblemModel=mongoose.model('ProblemModel',ProblemSchema);
module.exports=ProblemModel;