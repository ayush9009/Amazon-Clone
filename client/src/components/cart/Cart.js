import { Divider } from '@mui/material';   //jo divider ata hai vo is ki madath se hi ata hai
import React, { useEffect, useState ,useContext} from 'react';
import { LoginContext } from '../context/ContextProvider';
import CircularProgress from '@mui/material/CircularProgress';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// to elimintate the side effect of using class based components.
// useEffect -to elimintate the effects of using class based components
// useState allows us to tract state in a function
// state -data or property that need to be tracked in an application
// when we want to use the parmamters of current route then params hook into existence.

import {  useParams, useNavigate} from 'react-router';

// useHistory-it lets you access the history instance used by react routers
import "./cart.css";

const Cart = () => {

    const { id } = useParams("");
    // console.log(id);
    const history=useNavigate("");
    // const history=u();
    const {account,setAccount}=useContext(LoginContext);

    const [inddata, setInddata] = useState("");
    // with the help of useState ,reflectiong the update state
    console.log(inddata);

    const getinddata = async () => {
        const res = await fetch(`/getproductsone/${id}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },

             credentials: "include"
        });

        const data = await res.json();
        console.log(data);

        if (res.status !== 201) {
            alert("no data available")
        } else {
            // console.log("ind mila hain");
            setInddata(data);
        }
    }
    useEffect(() => {
        setTimeout(getinddata,1000)  //ye time out karne se ekssecond bad data load hogA,mtlb ue getindata fnction ek seond bad call hoga hello aayush sharma where are you from  i am from dehradun  where are you from
    }, [id]);

    //add cart funtionc
    const addtocart=async(id)=>{
        const checkres=await fetch(`/addcart/${id}`,{
            method:"POST",
            headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
            },
            body:JSON.stringify({
                inddata
            }),
            credentials:"include" //jaise hi hum addtocart karenge frontend se backend mai jo cookie thi use send karna hoga,backedn mai jayenfde phir secretkey kai sath match hogi,ilisye hum acceot aur creadential lika padta hai kuki json ki fomr mai hi data milta hai
        });
        const data1=await checkres.json();
        console.log(data1);

        if(checkres.status===401 || !data1){
            console.log("user invalid");
            alert("user invalid");
        }else{
            toast.success("Item Added Successfully 😃!", {
                position: "top-center"
            });
            // history.push("/buynow");
            history("/buynow");
            setAccount(data1)
           
        }
    }
    
    return (
        <div className="cart_section">
            {
                inddata && Object.keys(inddata).length &&
                <div className="cart_container">
                    <div className="left_cart">
                        {/* <img src={inddata.detailUrl} alt="cart" /> */}
                        <img src={inddata.url} alt="cart"/>
                        {/* <img src="https://n3.sdlcdn.com/imgs/j/t/q/Single-Toning-Tube-Resistance-Tube-SDL326749576-1-4f6bf.jpg" alt="cart" /> */}
                        {/* <div className="cart_btn">
                            <button className="cart_btn1" onClick={() => addtocart(inddata.id)}>Add to Cart</button>
                            <button className="cart_btn2">Buy Now</button>
                        </div> */}
                        <div className='cart_btn'>
                            <button className='cart_btn1' onClick={()=>addtocart(inddata.id)}>Add to Cart</button>
                            <button className='cart_btn2'>Buy Now</button>
                        </div>

                    </div>
                    <div className="right_cart">
                        <h3>{inddata.title.shortTitle}</h3>
                        <h4>{inddata.title.longTitle}</h4>
                        <Divider />
                        <p className="mrp">M.R.P. : <del>₹{inddata.price.mrp}</del></p>
                        <p>Deal of the Day : <span style={{ color: "#B12704" }}>₹{inddata.price.cost}.00</span></p>
                        <p>You save : <span style={{ color: "#B12704" }}> ₹{inddata.price.mrp - inddata.price.cost} ({inddata.price.discount}) </span></p>

                        <div className="discount_box">
                            <h5 >Discount : <span style={{ color: "#111" }}>{inddata.discount}</span> </h5>
                            <h4>FREE Delivery : <span style={{ color: "#111", fontWeight: "600" }}>Oct 8 - 21</span> Details</h4>
                            <p style={{ color: "#111" }}>Fastest delivery: <span style={{ color: "#111", fontWeight: "600" }}> Tomorrow 11AM</span></p>
                        </div>
                        <p className="description">About the Item : <span style={{ color: "#565959", fontSize: "14px", fontWeight: "500", letterSpacing: "0.4px" }}>{inddata.description}</span></p>
                    </div>
                </div>
            }

{/* agr data nhi aya abhi tak,kuki load hone mai time lagta hai  */}
        {!inddata ? <div className='circle'>
            <CircularProgress color="secondary" />
            <h2>Loading...</h2>
          </div>:""}
          {/* hoga kya jab data na ho to ye animation chl jaye */}

        </div>

    )
}


export default Cart
























