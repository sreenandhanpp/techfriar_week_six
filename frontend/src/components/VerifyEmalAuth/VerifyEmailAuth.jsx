import { Navigate, useNavigate } from "react-router-dom";
import { getItem } from "../../../localStorage/getItem";
import Signup from "../../pages/Signup/Signup";
import { useEffect, useState } from "react";


export const VerifyEmailAuth = ({ children }) => {
    const data = getItem('user');
    let nav = false;

    if (data) {
        if (data.sendEmail) {
            return children
        } else {
            nav = true;
        }
    }
    return (
        <div>
            {nav ?
                <Navigate to={'/send-email'} />
                :
                <Signup />}
        </div>
    )
}