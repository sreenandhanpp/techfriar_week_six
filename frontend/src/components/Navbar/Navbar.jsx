import React from 'react'
import './style.css'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
         <nav className="navbar">
        <div className="navbar-container navbar-wrapper">
            <input type="checkbox" name="" id="" />
            <div className="hamburger-lines">
                <span className="line line1"></span>
                <span className="line line2"></span>
                <span className="line line3"></span>
            </div>
            <ul className="menu-items">
                <li><Link href="#">Home</Link></li>
                <li><Link href="#">Signup</Link></li>
                <li><Link href="#">Login</Link></li>
                <li><Link href="#">Username</Link></li>
            </ul>
            <h1 className="logo">Hi,</h1>
        </div>
    </nav>
    </div>
  )
}

export default Navbar