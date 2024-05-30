const jwt=require("jsonwebtoken");
function verifyJwtToken(req,res,next)
{
  const {token}=req.cookies;
  const secretKey=process.env.SECRET_KEY;
  try{
    const payload=jwt.verify(token,secretKey);
    const {username}=payload;
    req.username=username;
  }catch(err)
  {
    return res.status(401).send("Token verification failed");
  }
  next();
}
module.exports=verifyJwtToken;