import React from 'react'
import Alert from '../Alert/Alert'

const InuptField = ({ name, msg, label, HandleChange, placeholder, type, }) => {
    return (
        <div className="input-box">
            <label>{label}</label>
            <input
                required
                placeholder={placeholder}
                type={type}
                onChange={HandleChange}
                name={name}
            />

            {
                msg && <Alert msg={msg} />
            }

        </div>
    )
}

export default InuptField