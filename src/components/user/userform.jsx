import { Button, Flex, Input, notification, Modal } from "antd";
import { useState } from "react";
import { creatApi } from "../../services/api.service";


const UserForm = (props) => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const { loaduser } = props

    const [isModalOpen, setisModalOpen] = useState(false)

    const handleClickBtn = async () => {
        const res = await creatApi(fullName, email, password, phone);
        if (res.data)
            notification.success({
                message: "Creat user",
                description: "Tao moi thanh cong"

            })
        else {
            notification.error({
                message: "Not Creat user",
                description: JSON.stringify(res.message)
            })
        }
        setisModalOpen(false)
        resetModelandclone();
        await loaduser()
    }
    const resetModelandclone = () => {
        setisModalOpen(false)
        setEmail("")
        setFullName("")
        setPassword("")
        setPhone("")
    }

    return (
        <div className="user-form" style={{ margin: "20px 0" }}>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>User Table</h3>
                <Button
                    // onClick={() => handleClickBtn()}
                    onClick={() => { setisModalOpen(true) }}
                    type="primary"> Create User </Button>
            </div>
            <div>
                <Modal title="Basic Modal"
                    open={isModalOpen}
                    onOk={() => handleClickBtn()}
                    onCancel={() => { resetModelandclone() }}
                    okText="Creat User"

                >
                    <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                        <div>
                            <span>Full Name</span>
                            <Input
                                value={fullName}
                                onChange={(event) => { setFullName(event.target.value) }}
                            />
                        </div>
                        <div>
                            <span>Email</span>
                            <Input
                                value={email}
                                onChange={(event) => { setEmail(event.target.value) }}
                            />
                        </div>
                        <div>
                            <span>Password</span>
                            <Input.Password
                                value={password}
                                onChange={(event) => { setPassword(event.target.value) }}
                            />
                        </div>
                        <div>
                            <span>Phone number</span>
                            <Input
                                value={phone}
                                onChange={(event) => { setPhone(event.target.value) }}
                            />
                        </div>
                    </div>
                </Modal>

            </div>
        </div>

    )
}

export default UserForm;