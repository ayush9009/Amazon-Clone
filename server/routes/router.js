const express = require("express");
const router = new express.Router();
const Products = require("../models/productsSchema");//ab yaha vo bhi require kar liya product/model
const USER = require("../models/userSchema");
const bcrypt = require("bcryptjs");
// const express = require("express");
const athenticate=require("../middleware/authenticate");


//is router ki madath se hum apni sari api ko karenge call//aap database se jo data le rai us sey dynamically lena to is get method se hum data get kar rai
//ye sari values hume find karni hume humare database kai andar ki 

// get products data api
router.get("/getproducts", async (req, res) => {
    try {
        const productsdata = await Products.find();
        console.log("console the data" + productsdata);
        res.status(201).json(productsdata);
    } catch (error) {
        console.log("error" + error.message);
    }
});
// pahle humne api create kari phir use check kara using postman
// jiase front end mai id vala scene kara tha vaise hi backend mai kar rai taki

router.get("/getproductsone/:id", async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const individuadata = await Products.findOne({ id: id });
        //findOne kuki ek particular id ka data use karna  
        // console.log(individuadata+"individual data");

        res.status(201).json(individuadata);
    } catch (error) {
        res.status(400).json(individuadata);
        console.log("error" + error.message);
    }
});


// register data
// get to the data from the server /api and post rrequrest to send to the server
router.post("/register", async (req, res) => {
    // console.log(req.body);  //postman se data bejenge aur dekenge data mil bhi ra ya ni

    // hum yaah user ka data jo vo form mai likha vo hum lenge in api bna denge database mai store karad denge

    const { fname, email, mobile, password, cpassword } = req.body;  //mgtlb ye data humne from login page le lieyea

    if (!fname || !email || !mobile || !password || !cpassword) //agr userne koi bhi field empty chod di to user error mil janai chaiue
    {
        res.status(422).json({ error: "fill all the data" }) //ye humarea response hai
        console.log("not data available");
    };
    try {
        const preuser = await USER.findOne({ email: email });

        if (preuser) {
            res.status(422).json({ error: "this user is already present" })
        } else if (password !== cpassword) {
            res.status(422).json({ error: "Your password is not matching" })
        } else {
            const finalUser = new USER({
                fname, email, mobile, password, cpassword
            });

            const storedata = await finalUser.save();
            console.log(storedata);

            res.status(201).json(storedata);
        }
    } catch (error) {
        console.log("error the bhai catch ma for registratoin time" + error.message);
        res.status(422).send(error);
    }
});

// login user
// login data
router.post("/login", async (req, res) => {
    // console.log(req.body);
    const { email, password } = req.body;

    if (!email || !password) {              
        res.status(400).json({ error: "fill all the data" });
    };

    try {
        const userlogin = await USER.findOne({ email: email });  //iska mtbl hum yaha check kar rai ki kya koi bnda is email vala humare dataabse mai store hai ya nhi agr hai to pphir hum uska passowrd bhi match karengevo login hojfa else not
        console.log(userlogin);
        if (userlogin) {
            const isMatch = await bcrypt.compare(password, userlogin.password);
            console.log(isMatch);

           

            if (!isMatch) {
                res.status(400).json({ error: "invalid details" });
                // res.status(400).json(userlogin);
            } else {
                // res.status(400).json({error:"password match"})
                //token generate
            const token=await userlogin.generateAuthtokenn();
            console.log(token);

            res.cookie("Amazonweb",token,{
                expire:new Date(Date.now()+ 2589000),
                httpOnly:true
            });
                res.status(201).json(userlogin);
                // res.status(201).json(userlogin);
            }
        }
         else {
            res.status(400).json({ error: "user not exist" });
        }

    } catch (error) {
        res.status(400).json({ error: "invalid details" });
        // console.log("error the bhai catch ma for login time" + error.message);
    }
});

//adding data into cart

 //jab add to cart karogey to ye api router.post call hogi uki madath se hume ek id milegey us id ko hum middleware ka ek function uski madath se vo id match karenge agr id match  ho ja to procut find karenge
 router.post("/addcart/:id",athenticate,  async (req, res) => {

    try {
        // authenicate,
        // console.log("perfect 6");
        const { id } = req.params;
        const cart = await Products.findOne({ id: id });
        console.log(cart + "cart milta hain");

        const Usercontact = await USER.findOne({ _id: req.userID });
        console.log(Usercontact + "user milta hain");


        if (Usercontact) {
            const cartData = await Usercontact.addcartdata(cart);

            await Usercontact.save();
            console.log(cartData + " thse save wait kr");
            console.log(Usercontact + "userjode save");
            res.status(201).json(Usercontact);
        }else{
            res.status(401).json({error:"invalid user"});
        }
    } catch (error) {
        console.log(error);
    }
});
// get data into the cart
router.get("/cartdetails", athenticate, async (req, res) => {
    try {
        const buyuser = await USER.findOne({ _id: req.userID });
        console.log(buyuser + "user hain buy pr");
        res.status(201).json(buyuser);
    } catch (error) {
        console.log(error + "error for buy now");
    }
});
// get validd user
router.get("/validuser", athenticate, async (req, res) => {
    try {
        const validuserone = await USER.findOne({_id: req.userID });
        console.log(validuserone + "user hain buy pr");
        res.status(201).json(validuserone);
    } catch (error) {
        console.log(error + "error for buy now");
    }
});

//remove item from cart
router.delete("/remove/:id",athenticate,async(req,res)=>{
    try{
        const {id}=req.params;

        req.rootUser.carts=req.rootUser.carts.filter((cruval)=>{  
            return cruval.id!=id;  //filer ek array return kare,humara jo data cart ka data tha aur jo user ne delete vale pai enter vo data,hum ye dono data match karenge (ya kahe id) jo match kar gya vo return kar do (kuki vo vohi jisey aap delete karna chah rai)
        });

        req.rootUser.save();
        res.status(201).json(req.rootUser);
        console.log("item remove");
        }catch(error){
            console.log("error" +error);
            res.status(400).json(req.rootUser);
        }
})

//token1 token2 token3 token4 ye puri array bn gi user jab jab enter kiya tg=o token generate hogya to jab user logout to vo token reutrn kar do jiski vlaue match na kare logout karega to tooken4 ki value match kar jagi lakin uske alava hume baki kai bacche huhe return kar dena token1 token2 token3 token4
// for userlogout

router.get("/lougout", athenticate, (req, res) => {
    try {
        req.rootUser.tokens = req.rootUser.tokens.filter((curelem) => {
            return curelem.token !== req.token //jo not equal hai unhe retun kar do
        });

        res.clearCookie("Amazonweb", { path: "/" });   //kuki jaise hi user logout ho use homepage pai paucha denge
        req.rootUser.save();
        res.status(201).json(req.rootUser.tokens);
        console.log("user logout");

    } catch (error) {
        console.log(error + "jwt provide then logout");
    }
});

module.exports = router;





















