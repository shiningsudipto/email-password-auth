import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import "./Layout.css"

const Layout = () => {
    return (
        <nav className=''>
            <Link className='navLink' to="/">Home</Link>
            <Link className='navLink' to="/login">Login</Link>
            <Link className='navLink' to="/registration">Registration</Link>
            <Outlet></Outlet>
        </nav>
    );
};

export default Layout;