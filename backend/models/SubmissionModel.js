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
    type:String,
    required:true
  },
  language:{
    type:String,
    default:'CPP'
  }
});
const SubmissionModel=mongoose.model('SubmissionModel',SubmissionSchema);
module.exports=SubmissionModel;