import React from 'react'
import './Navbar.css';
import logo from '../Assests/logo.png'


const Navbar = () => {
    return (
        <div className="navbar">
           <img src={logo} alt="" className='nav-logo'/>
           <div className="nav-profile">Admin Profile Panel</div>
        </div>
    )
}

export default Navbar;