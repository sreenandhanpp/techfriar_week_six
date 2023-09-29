import { Navigate, useNavigate } from "react-router-dom";
import { getItem } from "../../../localStorage/getItem";
import Signup from "../../pages/Signup/Signup";


export const PhoneAuth = ({ children }) => {
    const data = getItem('user');
    let nav = false;

    // useEffect(()=>{
    if (data) {
        if (!data.sendPhone) {
            return children
        } else {
            nav = true;
        }
    }
    // },[])
    return (
        <div>
            {nav ?
                <Navigate to={'/verify-phone'} />
                :
                <Signup />}
        </div>
    )
}