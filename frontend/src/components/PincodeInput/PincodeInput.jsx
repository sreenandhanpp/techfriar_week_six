import React from 'react'
import './style.css'

const PincodeInput = ({ HandleFetch ,setPincode }) => {
    return (
        <div className='signup-wrapper'>
            <div className='signup-form'>
                <label>
                    <input type="text" onChange={(e) => setPincode(e.target.value)} placeholder="Enter Pincode..." />
                    <button onClick={(e) => HandleFetch(e)}>GET</button>
                </label>
            </div>
        </div>
    )
}

export default PincodeInput