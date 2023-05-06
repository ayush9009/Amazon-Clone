const mongoose=require("mongoose");
const validator=require("validator");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken")
const secretKey=process.env.KEY;

const userSchema=new mongoose.Schema({
    fname:{
        type:String,
        required:true,
        trim:true 
     }, //left aur right se jo space hogi use remove kar dega
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("not valid email address")
            }
        }
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
        maxlength:10
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    cpassword:{
        type:String,
        required:true,
        minlength:6
    },
    tokens:[                 //ye token isliye create kiya tha kyki isi kai andar hum token ki value store karengery
        {
            token:{
                type:String,
                required:true,
            }
        }
    ],
    carts:Array
});


//jab data user enter kar de database mai data store hone se pahle ye middleware function chl ja
userSchema.pre("save",async function(next){
    if(this.isModified("password")){  //iska mtlb agr passowrd modify ho to hi hum use yaha update karenge else not
    this.password=await bcrypt.hash(this.password,12);//ye hashing kar di password taki ,agr kisi kai kisi kai password ko track na kar sake
    this.cpassword=await bcrypt.hash(this.cpassword,12);
    }

    next();
})
// ye hashing kar na password ka bht jarori ,kuki ise karne ek meaningless thing create jo ki us user ko smj ni ayegi jo aapka passowrd chori karna chahra lakin ab use pssrd hi smj ni ane ka ki aapne kya likha



//token generate 
userSchema.methods.generateAuthtokenn=async function(){
    try{
        let token=jwt.sign({_id:this._id},secretKey)
        this.tokens=this.tokens.concat({token:token})

        await this.save();
        return token;
    }catch(error){
        // res.status(201).json(userlogin);
        console.log(error);
    }
}
//cart me item store karane kai liye
//add to carta data
userSchema.methods.addcartdata = async function(cart){
    try {
        this.carts = this.carts.concat(cart);   //jo hume cart mai data mile vo humne carts mai store kara liya aur use return kar diya
        await this.save();
        return this.carts;
    } catch (error) {
        console.log(error + "bhai cart add time aai error");
    }
}

const USER=new mongoose.model("USER",userSchema);



  //jitna yaha likenge utna time lage create hone mai
// jab user ne data enter to use se pahle uske passowrd ko yaha hash karenge
module.exports=USER;

