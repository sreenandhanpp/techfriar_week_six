import { Navigate, useNavigate } from "react-router-dom";
import { getItem } from "../../../localStorage/getItem";
import Signup from "../../pages/Signup/Signup";
import { useEffect, useState } from "react";


export const EmailAuth = ({ children }) => {
    const data = getItem('user');
    const navigate = useNavigate();
    let nav = false;
    
    // useEffect(()=>{
        if (data) {
            if (!data.sendEmail) {
                    return children
            }else{
                nav = true;
            }
        }
    // },[])
    return (
        <div>
            {nav?
            <Navigate to={'/verify-email'} />
            :
            <Signup />}
        </div>
    )
}