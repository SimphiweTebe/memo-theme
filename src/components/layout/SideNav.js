import React from 'react'
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png'

function SideNav() {


    return (

        <section className="sidebar">
            <Link to="/" className="logo">
                <img src={logo} alt="" className="image" />
                <span className="text">memo</span>
            </Link>
            <nav className="nav">
                <ul className="nav__links">
                    <li><Link to="/course-list">Courses</Link></li>
                    <li><Link to="/payment" >Payment</Link></li>
                    <li><Link to="/chat" >Chat</Link></li>
                    <li><Link to="/groups" >Groups</Link></li>
                    <li><Link to="/students" >Students</Link></li>
                    <li><Link to="/support" >Support</Link></li>
                </ul>
                <ul className="user__menu">
                    <li><Link to="/account" >Account</Link></li>
                    <li><Link to="/settings" >Settings</Link></li>
                </ul>
            </nav>
        </section>
    )
}

export default SideNav
