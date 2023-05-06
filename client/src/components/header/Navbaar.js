import { React, useContext, useEffect, useState } from "react";
import "./navbaar.css";
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import Rightheader from "./Rightheader";
import { NavLink, useNavigate } from "react-router-dom";
import { LoginContext } from "../context/ContextProvider";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import LogoutIcon from '@mui/icons-material/Logout';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from "react-redux"


//navlink anchor ki trah hi kam kare lakin firk ye hai jab aap kis button par clik karogey to us page par paochagoey bina page kai reload huve

const Navbar = () => {
  const { account, setAccount } = useContext(LoginContext);

  const history = useNavigate();

  console.log(account);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [text, setText] = useState("");
  console.log(text);
  const [liopen, setLiopen] = useState(true);                         //liopen yani jo bhi hum open karenge vo hum list mai show karenge
  const { products } = useSelector(state => state.getproductsdata);

  const [dropen, setDroper] = useState(false)

  const getdetailvaliduser = async () => {
    const res = await fetch("/validuser", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
    const data = await res.json();
    // console.log(data);

    if (res.status !== 201) {
      console.log("error");
    } else {
      console.log("data valid");
      setAccount(data);
    }
  };
  const handleopen = () => {
    setDroper(true)
  }
  const handledrclose = () => {
    setDroper(false);
  }


  const logoutuser = async () => {
    const res2 = await fetch("/lougout", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
    const data2 = await res2.json();
    console.log(data2);

    if (!res2.status == 201) {
      console.log("error");
    } else {
      console.log("data valid");
      // alert("user logout");
      toast.success("User Logout Successfully 😃!", {
        position: "top-center"
      });

      setAccount(false);
      history("/");
    }

  };

  const getText = (iteams) => {
    setText(iteams);
    setLiopen(false)
  }


  useEffect(() => {
    getdetailvaliduser()
  }, [])
  return (
    <header>
      <nav>
        <div className="left">

          <IconButton className='hamburgur' onClick={handleopen}>
            <MenuIcon style={{ color: "#fff" }} />
          </IconButton>

          <Drawer open={dropen} onClose={handledrclose}>
            <Rightheader userlog={logoutuser} logclose={handledrclose} logoutuser={logoutuser}/>
          </Drawer>
          <div className="navlogo">
            <NavLink to='/'><img src="https://raw.githubusercontent.com/harsh17112000/E-commerceapp/main/client/public/amazon_PNG25.png" alt="" /></NavLink>
          </div>
          <div className="nav_searchbaar">
            <input type="text" name=""
              onChange={(e) => getText(e.target.value)}
              placeholder="Search your products"
              id="" />

            <div className="search_icon">
              <SearchIcon id="search" />
            </div>

            {/* search filter */}

            {
              text &&
              <List className="extrasearch" hidden={liopen}>
                {/* user ek value search karega use hum apni list mai match karenge agr vo value milgi to hum usse show kar denfe */}
                {
                  products.filter(product => product.title.longTitle.toLowerCase().includes(text.toLowerCase())).map(product => (

                    <ListItem>
                      <NavLink to={`/getproductsone/${product.id}`} onClick={() => setLiopen(true)}>
                        {/* jis bhi id pai user click us id pai navlink redirct kar de,routerjs mai humne sari api rakrakiyakahe bna raki ,loginapi,refisterapiprodcitapietc  */}
                        {/* ye humne backtik ki madath se navlink dekrai vo konsa item uski kya id aur phir hum usi page par paoch jayenge */}
                        {product.title.longTitle}
                      </NavLink>
                      {/* includes vala ye dek ra agr vo data hai humare product mai to use hum sath listItem mai add kar diya aur show kar diya */}
                    </ListItem>
                  ))
                }
              </List>
            }

          </div>

        </div>
        <div className="right">
          <div className="nav_btn">
            < NavLink to="/login">Sign in </NavLink>
          </div>

          {
            account ? <NavLink to="/buynow">
              <div className="cart_btn">
                <Badge badgeContent={account.carts.length} color="primary">
                  <ShoppingCartIcon id="icon" />
                  {/* deko bhai agr user login huha va to jaha sare cart add hokai store vaha display hojagey,else login page pai bej dege taki login karne kai bad aye vo yaha */}
                </Badge>
                <p>Cart</p>
              </div>
            </NavLink> : <NavLink to="/login">
              <div className="cart_btn">
                <Badge badgeContent={0} color="primary">
                  <ShoppingCartIcon id="icon" />

                </Badge>
                <p>Cart</p>
              </div>
            </NavLink>
          }
          {/* jab bhi koi buy now vale icon pai click karega vo buynow vale pai redirect hojaga,ye tab karna jab user login huha ho */}

          {/* {account.carts.length} */}
          <ToastContainer />



          {
            account ? <Avatar className="avtar2"
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick} title={account.fname.toUpperCase()}>{account.fname[0].toUpperCase()}</Avatar> : <Avatar className="avtar"
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              ></Avatar>

          }

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClose} style={{ margin: 10 }}>My account</MenuItem>
            {
              account ? <MenuItem onClick={handleClose} style={{ margin: 10 }} onClick={logoutuser}> <LogoutIcon style={{ fontSize: 16, marginRight: 3 }} />   Logout</MenuItem> : ""
            }
            {/* <MenuItem onClick={handleClose}>My account</MenuItem>
            {
              account ? <MenuItem onClick={handleClose} onClick={logoutuser} ><LogoutIcon style={{ fontSize: 16, marginRight: 3 }} />Logout</MenuItem> : ""
            } */}
            {/* onClick={logoutuser} */}
          </Menu>
          {/* jab userlogin page kam karne lage to A ki jaga {account.fname[0].toUpperCase()} */}

        </div>
      </nav>
    </header>
  );
};

// account.carts.length ye denote karega ki kitna data hai account mai ie.kya kya cart mai add kara uski notfication like kitne values add kari vo show kardega
export default Navbar;











