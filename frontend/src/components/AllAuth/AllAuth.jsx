import { getItem } from "../../../localStorage/getItem";
import Home from "../../pages/Home/Home";


export const AllAuth = ({ children }) => {
    const data = getItem('user');
    let nav = false;

    if (data) {
        if (data.verified) {
            nav = true;
        } else {
            return children;
        }
    }

    return (
        <div>
            {nav && <Home />}
        </div>
    )
}