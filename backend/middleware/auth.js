const jwt=require("jsonwebtoken");
function verifyJwtToken(req,res,next)
{
  const {token}=req.cookies;
  const secretKey=process.env.SECRET_KEY;
  try{
    const payload=jwt.verify(token,secretKey);
    const {username,role}=payload;
    req.username=username;
    // console.log("role in middleware"+role);
    req.role=role;
  }catch(err)
  {
    return res.status(401).json({
      status:"failed",
      msg:"token verification failed !!!"
    });
  }
  next();
}
module.exports=verifyJwtToken;