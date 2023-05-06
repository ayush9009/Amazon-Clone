const jwt=require("jsonwebtoken");//kuki ya hum secret key aur cookie ki value ko verify karne vale hai
//jaise  hi veirfy hojaga hume id milegi aur us sey uuser find krlenge hum

const USER=require("../models/userSchema");
const secretKey=process.env.KEY;

//next keyword next process ko call karega
const athenticate=async(req,res,next)=>{
    try{
        const token=req.cookies.Amazonweb;          //cooki get karli

        const verifyToken=jwt.verify(token,secretKey);
        console.log(verifyToken);
// database mai jakr deko tokens kai andar token karke bhi hai ek cheez
        const rootUser=await USER.findOne({_id:verifyToken._id,"tokens.token":token});

        console.log(rootUser);

        if(!rootUser){throw new Error("user not found")};

        req.token=token
        req.rootUser=rootUser
        req.userID=rootUser._id

        next();
    }catch(error){
        res.status(401).send("unauthorized :No token provide")
        console.log(error);
    }
}

module.exports=athenticate;