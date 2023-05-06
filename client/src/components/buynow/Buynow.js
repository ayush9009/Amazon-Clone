// import { Divider } from '@mui/material';
// import React, { useEffect, useState } from 'react';
// import Option from './Option';
// import Right from "./Right";
// import Subtotal from './Subtotal';
// import "./buynow.css";
// import Empty from './Empty';

// const Buynow = () => {

//     const [cartdata, setCartdata] = useState("");
//     // console.log(cartdata.carts);
//     const getdatabuy = async () => {
//         const res = await fetch("/cartdetails", {
//             method: "GET",
//             headers: {
//                 Accept: "application/json",
//                 "Content-Type": "application/json"
//             },
//             credentials: "include"
//         });

//         const data = await res.json();

//         if (res.status !== 201) {
//             alert("no data available")
//             console.log("error");
//         } else {
//             setCartdata(data.carts);
//         }
//     };
//     useEffect(() => {
//         getdatabuy();
//     }, []);
//     return (
//         <>{
//             cartdata.length ? <div className="buynow_section">
//                 <div className="buynow_container">
//                     <div className="left_buy">
//                         <h1>Shopping Cart</h1>
//                         <p>Select all items</p>
//                         <span className="leftbuyprice">Price</span>
//                         <Divider />

//                         {
//                             cartdata.map((e, k) => {
//                                 return (
//                                     <>
//                                         <div className="item_containert" key={k}>
//                                             {/* <img src="https://rukminim1.flixcart.com/image/416/416/kll7bm80/smartwatch/c/1/n/43-mo-sw-sense-500-android-ios-molife-original-imagyzyycnpujyjh.jpeg?q=70" alt="imgitem" /> */}
//                                             <img src={e.url} alt="imgitem" />
//                                             <div className="item_details">
//                                                 {/* <h3>Molife Sense 500 SmartWatch (Black Strap, Freesize)</h3> */}
//                                                 <h3>{e.title.longTitle}</h3>
//                                                 {/* <h3>Smart Watches</h3> */}
//                                                 <h3>{e.title.shortTitle}</h3>
//                                                 <h3 className="differentprice">₹{e.price.cost}.00</h3>
//                                                 {/* <h3 className='differentprice'>₹4049.00</h3> */}
//                                                 {/* <h3 className="diffrentprice">₹.00</h3> */}
//                                                 <p className="unusuall">Usually dispatched in 8 days.</p>
//                                                 <p>Eligible for FREE Shipping</p>
//                                                 <img src="https://m.media-amazon.com/images/G/31/marketing/fba/fba-badge_18px-2x._CB485942108_.png" alt="logo" />
//                                                 <Option deletedata={e.id} get={getdatabuy} />
//                                                 {/* <Option deletedata={e.id}/> */}
//                                             </div>
//                                             <h3 className="item_price">₹{e.price.cost}.00</h3>
//                                             {/* <h3 className="item_price">₹{e.price.cost}</h3> */}
//                                         </div>
//                                         <Divider/>
//                                     </>
//                                 )
//                             })
//                         }

                        
//                         <Subtotal iteam={cartdata}/>
//                     </div>
//                     <Right iteam={cartdata}/>
//                 </div>
//             {/* </div> : "" */}
//             </div> : <Empty />
//         }

//         </>
//     )

// }

// export default Buynow


import { Divider } from '@mui/material';
import React, { useEffect, useState } from 'react'
import './buynow.css'
import Empty from './Empty';
import Option from './Option';
import Right from './Right';
import Subtotal from './Subtotal';

const Buynow = () => {

    const [cartdata, setCartdata] = useState("");
    // console.log(cartdata.length);

    const getdatabuy = async () => {
        const res = await fetch("/cartdetails", {
            method: "GET",
            headers: {
                Accept:"application/json",
                "Content-Type": "application/json"
            },
            credentials:"include"
        });

        const data = await res.json();
        // console.log(data.carts);

        if (res.status !== 201) {
            alert("no data available")
        } else {
            // console.log("data cart main hain");
            setCartdata(data.carts);
        }
    };



    useEffect(() => {
        getdatabuy();
    }, []);


    // const [price, setPrice] = useState(0);
    // const totalAmount = () => {
    //     let price = 0
    //     cartdata.map((e) => {
    //         price += e.price.cost
    //     })
    //     setPrice(price)
    // }

    // useEffect(() => {
    //     totalAmount();
    // }, [cartdata]);

    

    return (
        <>
            {cartdata.length ?
                <div className="buynow_section">
                    <div className="buynow_container">
                        <div className="left_buy">
                            <h1>Shopping Cart</h1>
                            <p>Select all items</p>
                            <span className="leftbuyprice">Price</span>
                            <Divider />

                            {
                                cartdata.map((e, ind) => {
                                    return (
                                        <>
                                            <div className="item_containert" key={ind}>
                                                <img src={e.url} alt="imgitem" />
                                                <div className="item_details">
                                                    <h3>{e.title.longTitle}</h3>
                                                    <h3>{e.title.shortTitle}</h3>
                                                    <h3 className="diffrentprice">₹{e.price.cost}.00</h3>
                                                    <p className="unusuall">Usually dispatched in 8 days.</p>
                                                    <p>Eligible for FREE Shipping</p>
                                                    <img src="https://m.media-amazon.com/images/G/31/marketing/fba/fba-badge_18px-2x._CB485942108_.png" alt="logo" />
                                                    <Option deletedata={e.id} get={getdatabuy} />
                                                </div>
                                                <h3 className="item_price">₹{e.price.cost}.00</h3>
                                            </div>
                                            <Divider />
                                        </>
                                    )
                                })
                            }
                         
                            <Subtotal iteam={cartdata} />
                        </div>
                        <Right iteam={cartdata} />
                    </div>
                </div> : <Empty />
            }
        </>
    )
}

export default Buynow;









