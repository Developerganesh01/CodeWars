const mongoose=require('mongoose');
const SubmissionSchema=new mongoose.Schema({
  submissionTime:{
    type:Date,
    required:true
  },
  code:{
    type:String,
    required:true
  },
  verdict:{
    type:string
  }
});
const SubmissionModel=mongoose.model('SubmissionModel',SubmissionSchema);
module.exports=SubmissionModel;