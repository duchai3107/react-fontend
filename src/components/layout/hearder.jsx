import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AppstoreOutlined, AuditOutlined, LoginOutlined, LogoutOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu, message } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { Authcontext } from '../context/auth.context';
import { LogoutAPI } from '../../services/api.service';
const Header = () => {
    const [current, setCurrent] = useState('');
    const { User } = useContext(Authcontext)
    const { setUser } = useContext(Authcontext)
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location && location.pathname) {
            const Diachi = ["user", "book"];
            const duongdan = Diachi.find(item => `/${item}` === location.pathname);
            if (duongdan) {
                setCurrent(duongdan);
            }
            else {
                setCurrent("home");
            }
        }
    }, [location])

    const onClick = (e) => {
        setCurrent(e.key);
    };
    const handlelogout = async () => {
        const res = await LogoutAPI()
        if (res.data) {
            localStorage.removeItem("access_token")
            setUser({
                id: "",
                email: "",
                phone: "",
                fullName: "",
                role: "",
                avatar: ""
            })
        }
        message.success("Logout Thanh cong")
        navigate("/")
    }
    const items = [
        {
            label: <Link to={"/"}>Home</Link>,
            key: 'home',
            icon: <MailOutlined />,
        },
        {
            label: <Link to={"/user"}>User</Link>,
            key: 'user',
            icon: <AppstoreOutlined />,
        },
        {
            label: <Link to={"/book"}>Book</Link>,
            key: 'book',
            icon: <AuditOutlined />,
        },
        (!User.id ? {
            label: <Link to={"/login"}>Đăng nhập</Link>,
            key: 'login',
            icon: <LoginOutlined />
        } : {}),

        (User.id ? {
            label: `Wellcome ${User.fullName} `,
            key: 'setting',
            icon: <LogoutOutlined />,
            children: [
                {
                    label: <span onClick={() => handlelogout()}>Đăng xuất</span>,
                    key: 'logout',
                },
            ],
        } : {}),
    ];
    return (
        <Menu onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items} />
    )
}
export default Header;