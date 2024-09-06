import { useContext } from "react";
import { Authcontext } from "../components/context/auth.context";
import { Button, Result } from "antd";
import { Link } from "react-router-dom";


const Privateround = (props) => {
    const { User } = useContext(Authcontext)
    if (User && User.id) {
        return (
            <>
                {props.children}
            </>
        )
    }
    return (
        <Result
            status="403"
            title="Opp!"
            subTitle={"Ban Can Dang Nhap"}
            extra={<Button type="primary" Link to="/">
                <Link to="/login" >
                    <span>Go Login</span>
                </Link>

            </Button>}
        />
    )
}
export default Privateround;
