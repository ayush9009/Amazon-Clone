import React, { useState, useContext } from 'react'
import { NavLink } from 'react-router-dom';
import "./signup.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginContext } from '../context/ContextProvider';

const Sign_in = () => {

    const [logdata, setData] = useState({
        email: "",
        password: ""
    })  //use state ki madath se hum form ka data get karte hai ,usestate(ye initial value hai) logdata hai humara current data ,aur set data jo hum set kardenge
    //ab agr useState(0) console.log karogey to zero print hojaga yani useState ki madath se hume data mil jaga ,ab form mai itna sara data uske liye hmne object bnaya
    console.log(logdata);

    const { account, setAccount } = useContext(LoginContext);

    const adddata = (e) => {
        const { name, value } = e.target;

        setData((pre) => {
            return {
                ...pre,
                [name]: value
            }
        })
    };

    const senddata = async (e) => {
        e.preventDefault();

        const { email, password } = logdata;
        try {
            const res = await fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email, password
                })
            });
            const data = await res.json();
            console.log(data);

            if (res.status === 400 || !data) {
                console.log("invalid details");
                toast.error("Invalid Details 👎!", {
                    position: "top-center"
                });
            } else {
                console.log("Data valid");
                setAccount(data);
                setData({ ...logdata, email: "", password: "" });
                toast.success("Login Successfully done 😃!", {
                    position: "top-center"
                });
            }
        } catch (error) {
            console.log("login page ka error" + error.message);
        }

    }
    //jaise hi adddata function call hoga 
    return (
        <section>
            <div className='sign_container'>
                <div className='sign_header'>
                    <img src="https://raw.githubusercontent.com/harsh17112000/E-commerceapp/main/client/public/blacklogoamazon.png" alt="amazonlogo" />
                </div>
                <div className='sign_form'>
                    <form method='POST'>
                        <h1>Sign-In</h1>
                        <div className="form_data">
                            <label htmlFor='email'>Email</label>
                            <input type="email" name="email"
                                onChange={adddata}
                                value={logdata.email}
                                id="email" />
                        </div>
                        <div className="form_data">
                            <label htmlFor='passoword'>Password</label>
                            <input type="password" name="password"
                                onChange={adddata}
                                value={logdata.password}
                                id="password" placeholder="At least 6 characters"  />
                        </div>
                        <button type="submit" className='signin_btn' onClick={senddata}>Continue</button>
                    </form>
                    <ToastContainer />
                </div>

                <div className='create_accountinfo '>
                    <p>New To Amazon?</p>
                    <button>  <NavLink to="/register">Create Your Amazon Account</NavLink></button>
                </div>
            </div>

        </section>

    )
}

export default Sign_in

// //kuki upr ka same hi to 80% lega container ,aur ye header image kai liiye banauya hai
// 
