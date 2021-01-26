import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import "./navbar.style.scss";

const NavBar = () =>{


    return(<div className='nav-container'>
        <ul className="ul-container">
            <li className="nav-li"><NavLink className="active-links" exact  to="/" >Home</NavLink></li>
            <li className="nav-li"><NavLink className="active-links" exact  to="about" >About</NavLink></li>
        </ul>
    </div>)
};


export default NavBar;