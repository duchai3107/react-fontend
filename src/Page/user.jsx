import UserTable from "../components/user/user.table";
import UserForm from "../components/user/userform";
import { useEffect, useState } from 'react';
import { fecthAlluserapi } from '../services/api.service';
const UserPage = () => {
    const [datauser, setdatauser] = useState([])
    const [current, setcurrent] = useState(1)
    const [pageSize, setpageSize] = useState(10)
    const [total, settotal] = useState(0)



    useEffect(() => {
        loaduser();
    }, [current, pageSize])
    const loaduser = async () => {
        const res = await fecthAlluserapi(current, pageSize)
        if (res.data) {
            setdatauser(res.data.result)
            setcurrent(res.data.meta.current)
            setpageSize(res.data.meta.pageSize)
            settotal(res.data.meta.total)
        }
    }
    return (
        <div>
            <UserForm loaduser={loaduser} />
            <UserTable datauser={datauser}
                loaduser={loaduser}
                current={current}
                pageSize={pageSize}
                total={total}
                setcurrent={setcurrent}
                setpageSize={setpageSize}
            />
        </div>

    )
}
export default UserPage;