import { useEffect, useState } from "react";
import { Button, Flex, Input, notification, Modal } from "antd";
import { uppDateapi } from "../../services/api.service";

const UpdateUserModel = (props) => {
    const [fullName, setFullName] = useState("");
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");

    const { Isdataupdateopen, setIsdataupdateopen, setdataupdate, dataupdate, loaduser } = props;

    useEffect(() => {
        if (dataupdate) {
            setId(dataupdate._id)
            setFullName(dataupdate.fullName)
            setPhone(dataupdate.phone)

        }
    }, dataupdate)

    const handleClickBtn = async () => {
        const res = await uppDateapi(id, fullName, phone);
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
        setIsdataupdateopen(false)
        resetModelandclone();
        await loaduser()
    }
    const resetModelandclone = () => {
        setIsdataupdateopen(false)
        setId("")
        setFullName("")
        setPhone("")
        setdataupdate(null)
    }

    return (
        <Modal title="Create User"
            open={Isdataupdateopen}
            onOk={() => handleClickBtn()}
            onCancel={() => { resetModelandclone() }}
            okText="SAVE"

        >
            <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                <div>
                    <span>ID</span>
                    <Input
                        value={id}
                        disabled
                    />
                </div>
                <div>
                    <span>Full Name</span>
                    <Input
                        value={fullName}
                        onChange={(event) => { setFullName(event.target.value) }}
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
    )
}
export default UpdateUserModel