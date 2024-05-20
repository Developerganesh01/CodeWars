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
    type:String
  },
  problemId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'ProblemModel'
  },
  username:{
    type:String
  }
});
const SubmissionModel=mongoose.model('SubmissionModel',SubmissionSchema);
module.exports=SubmissionModel;