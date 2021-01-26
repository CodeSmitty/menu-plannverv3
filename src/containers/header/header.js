import React from 'react';
import "./header.styles.scss";
import NavBar from '../nav/navBar';

const Header = ()=>{
    return(<div className='header-container'>
        <div className="title-container"><p className='title-text'>Ivan's  Meal  Plan</p></div>
        <div className="nav-wrapper"><NavBar /></div>
    </div>)
}

export default Header;