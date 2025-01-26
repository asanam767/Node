const jwt=require('jsonwebtoken');

const jwtAuthMiddleware=(req,res,next)=>{
    //check if the authorization header is present
    if(!req.headers.authorization){
        return res.status(401).json({error:"Token not found"});
    }


    //extract the token from the header
    const token=req.headers.authorization.split(" ")[1];
    //here 0 th index - bearer and 1st index - token
    if(!token){
        return res.status(401).json({error:"Unauthorized"});
    }
    try{
         //verify the JWT token
         const decoded=jwt.verify(token,process.env.JWT_SECRET);
         //add the user details to the request object
            req.user=decoded;
            next();
    }
    catch{
        console.error(err);
        return res.status(401).json({error:"Invalid token"});
    }
}

//Function to generate JWT token
const generateToken=(userData)=>{
    //Generate a new JWT token by passing the user data and the secret key
    return jwt.sign(userData,process.env.JWT_SECRET,{expiresIn:'30s'});
}

module.exports={jwtAuthMiddleware,generateToken};
