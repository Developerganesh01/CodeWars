const mongoose=require('mongoose');
const UserSchema=new mongoose.Schema({
  username:{
    type:String,
    required:[true,"provide username"],
    unique:[true,"username already exists"]
  },
  email:{
    type:String,
    required:[true,"provide email"]
  },
  password:{
    type:String,
    required:[true,"provid password"]
  }
});

const UserModel=mongoose.model('UserModel',UserSchema);
module.exports=UserModel;