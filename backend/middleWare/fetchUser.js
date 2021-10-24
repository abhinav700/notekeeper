const jwt=require("jsonwebtoken");
 
const JWT_SECRET = "haisdaf$huehuehue";
const fetchUser=(req,res,next)=>{
    const token=req.header("auth-token");
    if(!token){
        res.status(401).send({erorr:"Invalid token"})
    }
    try {
        const data=jwt.verify(token,JWT_SECRET);
        req.user=data.user;
        next();
    } catch (error) {
        res.status(401).send({erorr:"Invalid token"})
        
    }
 
}
module.exports=fetchUser;