import { getItem } from "../../../localStorage/getItem";
import Signup from "../../pages/Signup/Signup";


export const HomeAuth = ({ children }) => {
    const data = getItem('user');
    let nav = false;

    if (data && data.verified) {
        return children
    } else {
        nav = true;
    }

    return (
        <div>
            {nav && <Signup />}
        </div>
    )
}