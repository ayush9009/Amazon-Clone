const mongoose=require("mongoose");

// const DB=process.env.DATABASE;
const DB="mongodb+srv://aayush:ohmygod@cluster0.uu2wpyb.mongodb.net/mern?retryWrites=true&w=majority"
// const DB="process.env.DATABASE"


mongoose.connect(DB).then(()=>console.log("data base connected")).catch((error)=>console.log("error"+error.message))








