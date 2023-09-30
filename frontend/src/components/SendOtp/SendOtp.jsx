import React from 'react'
import './style.css'
import { Link } from 'react-router-dom'

const SendOtp = ({ msg, HandleAction, color }) => {

    const msgStyle = {
        color:color
    }
    return (
        <div className='otp-container'>
            <form className="otp-Form">
                <span className="mainHeading">SEND OTP</span>
                <p className="otpSubheading" style={msgStyle}>{msg}</p>
                <button className="verifyButton" onClick={HandleAction}>Send</button>
            <p className='update'> <Link to={'/update'}> want to change credentials? </Link>  </p>
            </form>
        </div>
    )
}

export default SendOtp