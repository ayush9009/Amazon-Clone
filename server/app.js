// DotEnv is a lightweight npm package that automatically loads environment variables from a . env file into the process. env object. 
require("dotenv").config();
const express=require("express");
const app=express();
const mongoose=require("mongoose");
// const port = process.env.PORT || 8005;
require("./db/conn");
const cookieParser=require("cookie-parser");

const Products=require("./models/productsSchema");
const DefaultData=require("./defaultdata");
const cors=require("cors");
const router=require("./routes/router");

app.use(express.json()); //kuki humara jo bhi data vo json kai format mai jayga
// humne cors module bhi install kiya kuki 8005 and 3000 differnet isliye cors nan ki error ave vo nave isliye we install cors
app.use(cookieParser(""));
app.use(cors());
app.use(router);
// const port=8005;

//for deployment
const port=process.env.PORT || 8005    //jab hum apni device pai run karenge to 8005 pai run hoga jab koi aur device to heroku apna vala port number provide karega

if(process.env.NODE_ENV==="production"){
    app.use(express.static("client/build"))  //front end ko backend se jodne kai liye kara ye
}

if(process.env.NODE_ENV === "production"){
    app.use(express.static("client/build"));
}

app.listen(port,()=>{
    console.log(`server is running on port number ${port}`);
})

DefaultData();
