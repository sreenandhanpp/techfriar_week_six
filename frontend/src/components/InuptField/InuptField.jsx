import React from 'react'

const InuptField = ({ label, placeholder, type, setData }) => {
    return (
        <div className="input-box">
            <label>{label}</label>
            <input
                required
                placeholder={placeholder}
                type={type}
                onChange={e => setData(e.target.value)}
            />
        </div>
    )
}

export default InuptField