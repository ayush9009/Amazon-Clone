// import React,{useState} from 'react'
// import { NavLink } from 'react-router-dom';

// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import "./signup.css";


// const SignUp = () => {

//     const [udata,setUdata]=useState({
//         fname:"",
//         email:"",
//         mobile:"",
//         password:"",
//         cpassword:""
//     })
//     console.log(udata);

//     const senddata=async(e)=>{
//         e.preventDefault();  //iska mtlb btn kai click pai login page ko load nhi karega
//         const {fname,email,mobile,password,cpassword}=udata; //jaise hi user sara data enter kar dega ,to vo data userdata mai ajayga,aur userdata se hum sara le lenge

        // if(fname===""){
        //     toast.warn("Please provide  name 👎!", {
        //         position: "top-center",
        //     });
        // } else if(email===""){
        //     toast.warn("Please provide email 👎!", {
        //         position: "top-center",
        //     });
        // } else if(mobile===""){
        //     toast.warn("Please provide phone number 👎!", {
        //         position: "top-center",
        //     });
        // }else if(password===""){
        //     toast.warn("Please provide password 👎!", {
        //         position: "top-center",
        //     });
        // }
        // else if(cpassword===""){
        //     toast.warn("Please provide confirm password 👎!", {
        //         position: "top-center",
        //     });
        // }
       
       
        
//         const res=await fetch("register",{
//             method:"POST",
//             header:{
//                 "Content-Type":"application/json"
//             },
//             body:JSON.stringify({
//                 fname,email,mobile,password,cpassword
//             })
//         });
//         const data=await res.json();
//         console.log(data);

//         // if (res.status === 422 || !data) {
//         //     toast.warn("Invalid Details 👎!", {
//         //         position: "top-center",
//         //     });
//         // } else {
//         //     setUdata({
//         //         ...udata, fname: "", email: "",
//         //         mobile: "", password: "", cpassword: ""
//         //     });
//         //     toast.success("Registration Successfully done 😃!", {
//         //         position: "top-center"
//         //     });
//         // }
//     }
//     return (
//         <section>
//             <div className='sign_container'>
//                 <div className='sign_header'>
//                     <img src="https://raw.githubusercontent.com/harsh17112000/E-commerceapp/main/client/public/blacklogoamazon.png" alt="amazonlogo" />
//                 </div>

//                 <div className='sign_form'>
//                     <form method="POST">
//                         <h1>Sign-Up</h1>
//                         <div className="form_data">
//                             <label htmlFor='fname'>Your name</label>
//                             <input type="text"
//                             onChange={(e)=>setUdata({...udata,fname:e.target.value})}
//                             value={udata.fname}
//                             name="fname"
//                             id="email" />
//                         </div>
//                         <div className="form_data">
//                             <label htmlFor='email'>Email</label>
//                             <input type="text"
//                             onChange={(e)=>setUdata({...udata,email:e.target.value})}
//                             value={udata.email}
//                             name="email"
//                             id="email" />
//                         </div>
//                         <div className="form_data">
//                             <label htmlFor='number'>Mobile Number</label>
//                             <input type="text"
//                             onChange={(e)=>setUdata({...udata,mobile:e.target.value})}
//                             value={udata.mobile}
//                             name="mobile"
//                             id="mobile" />
//                         </div>
//                         <div className="form_data">
//                             <label htmlFor='password'>Password</label>
//                             <input type="password"
//                             onChange={(e)=>setUdata({...udata,password:e.target.value})}
//                             value={udata.password}
//                             name="password"
//                             placeholder="At least 6 characters" id="password" />
//                         </div>
//                         <div className="form_data">
//                             <label htmlFor='cpassword'>Confirm Password</label>
//                             <input type="password"
//                             onChange={(e)=>setUdata({...udata,cpassword:e.target.value})}
//                             value={udata.cpassword}
//                             name="cpassword"
//                             id="cpassword" />
//                         </div>
//                         <button className='signin_btn' onClick={senddata}>Continue</button>
//                         <div className='signin_info'>
//                             <p>Already have an account?</p>
//                             <NavLink to='/login'>Signin</NavLink>
//                         </div>
//                     </form>
//                 </div>
//                 <ToastContainer />
//             </div>

//         </section>
//     )
// }

// export default SignUp
import { Divider } from '@mui/material';
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import "./signup.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {

    const [udata, setUdata] = useState({
        fname: "",
        email: "",
        mobile: "",
        password: "",
        cpassword: ""
    });

    // console.log(udata);

    const adddata = (e) => {
        const { name, value } = e.target;
        // console.log(name,value);

        setUdata((pre) => {
            return {
                ...pre,
                [name]: value
            }
        })
    };

    const senddata = async (e) => {
        e.preventDefault();

        const { fname, email, mobile, password, cpassword } = udata;
        try {
            const res = await fetch("/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fname, email, mobile, password, cpassword
                })
            });

            const data = await res.json();
            // console.log(data);

            if (res.status === 422 || !data) {
                toast.error("Invalid Details 👎!", {
                    position: "top-center"
                });
            } else {
                setUdata({  //iska mtlb abhi to data hoga lakin jaise hi user data ek bar sare likh de ,continue pai click kar de uspe bad sari field phir se khali ho ja uske spread operator use kiya humne yaha par triple dot ...
                    ...udata, fname: "", email: "",
                    mobile: "", password: "", cpassword: ""
                });
                toast.success("Registration Successfully done 😃!", { //jab aap submit karne pai registration successful ara fo toast ki madath se hora ,
                    position: "top-center"
                });
            }
        } catch (error) {
            console.log("front end ka catch error hai" + error.message);
        }
    }

    return (
        <section>
            <div className="sign_container">
                <div className="sign_header">
                    <img src="https://raw.githubusercontent.com/harsh17112000/E-commerceapp/main/client/public/blacklogoamazon.png"  alt="signupimg" />
                </div>
                <div className="sign_form">
                    <form method="POST">
                        <h1>Create account</h1>
                        <div className="form_data">
                            <label htmlFor="name">Your name</label>
                            <input type="text" name="fname"
                                onChange={adddata}
                                value={udata.fname}
                                id="name" />
                        </div>
                        <div className="form_data">
                            <label htmlFor="email">email</label>
                            <input type="email" name="email"
                                onChange={adddata}
                                value={udata.email}
                                id="email" />
                        </div>
                        <div className="form_data">
                            <label htmlFor="mobile">Mobile number</label>
                            <input type="number" name="mobile"
                                onChange={adddata}
                                value={udata.mobile}
                                id="mobile" />
                        </div>
                        <div className="form_data">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password"
                                onChange={adddata}
                                value={udata.password}
                                id="password" placeholder="At least 6 characters" />
                        </div>
                        <div className="form_data">
                            <label htmlFor="passwordg">Confirm Password</label>
                            <input type="password" name="cpassword"
                                onChange={adddata}
                                value={udata.cpassword}
                                id="passwordg" />
                        </div>
                        <button type="submit" className="signin_btn" onClick={senddata}>Continue</button>

                        <Divider />

                        <div className="signin_info">
                            <p>Already have an account?</p>
                            <NavLink to="/login">Sign in</NavLink>
                        </div>
                    </form>
                </div>
                <ToastContainer />
            </div>
        </section>
    )
}

export default Signup;
