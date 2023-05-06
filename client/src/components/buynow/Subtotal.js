import React, { useEffect,useState } from 'react'

const Subtotal = ({iteam}) => {

    const [price,setPrice]=useState(0);

    useEffect(()=>{
        totalAmount();  //jiase hi buynow ka page open ho to ye function call hojana chaiye
    },[iteam])
    const totalAmount=()=>{
        let price=0;
        iteam.map((item)=>{
            price+=item.price.cost  //ttaki total value ho sake initally lakin zero hi hai
        })
        setPrice(price);
    }
    return (
        <div className="sub_item">
            <h3>Subtotal ({iteam.length} items) :<strong style={{ fontWeight: 700, color: "#111" }}> ₹{price}</strong></h3>
        </div>
    )
}

export default Subtotal;