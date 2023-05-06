const Products=require("./models/productsSchema");
const productsdata=require("./constant/productsdata");

const DefaultData=async()=>{
    try{
        await Products.deleteMany({});
        const storeData=await Products.insertMany(productsdata);
        console.log(storeData);
        // ek bar humne data add kar diya uske bad file save kar rai to data hota rahega,is sey bachne kai liye await Products.deleteMany({}) use karenge,ye extra data ko remove kar dega
    }catch(error){
        console.log("error"+error.message);
    }
};

module.exports=DefaultData;