import { getItem } from "../../../localStorage/getItem";
import Signup from "../../pages/Signup/Signup";


export const UpdateAuth = ({ children }) => {
    const data = getItem('user');
    let nav = false;

    if (data) {
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