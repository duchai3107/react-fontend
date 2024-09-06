import { Drawer, notification } from "antd";
import { useState } from "react";
import { handleupdatefile, Updateuserimage } from "../../services/api.service";

const Viewuser = (props) => {
    const {
        dataview,
        setdataview,
        viewopen,
        setviewopen,
        loaduser
    } = props
    const [dataimage, setdataimage] = useState(null)
    const [preview, setpreview] = useState(null)

    const Imageopen = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setdataimage(null)
            setpreview(null)
            return;
        }
        const file = event.target.files[0];
        if (file) {
            setdataimage(file)
            setpreview(URL.createObjectURL(file))
        }
    }
    const handleupdateavatar = async () => {
        const resUload = await handleupdatefile(dataimage, "avatar")
        if (resUload.data) {
            const newavatar = resUload.data.fileUploaded;
            const resupdateavatar = Updateuserimage(newavatar, dataview._id, dataview.fullName, dataview.phone)
            if (resupdateavatar) {
                setviewopen(false)
                setdataimage(null)
                setpreview(null)
                await loaduser()
                notification.success({
                    message: "Update User avatar",
                    description: "cap nhap thanh cong"
                })
            } else {
                notification.error({
                    message: "Error upload file",
                    description: JSON.stringify(resUload.message)
                })
            }
        }
        else {
            notification.error({
                message: "Error upload file",
                description: JSON.stringify(resUload.message)
            })
        }

    }
    return (
        <Drawer title="Basic Drawer"
            onClose={() => {
                setdataview(null)
                setviewopen(false)
            }}
            open={viewopen}>
            {dataview ? <>
                <p>Name:{dataview.fullName}</p>
                <p>ID:{dataview._id}</p>
                <p>Email:{dataview.email}</p>
                <p>Phone:{dataview.phone}</p>
                <p>Avatar</p>
                <div style={{ marginTop: '20px', border: "2px solid #ccc", marginBottom: '20px', width: '150px', height: '150px' }}>
                    <img width={150} height={150} src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataview.avatar}`} />
                </div>
                <div>
                    <label htmlFor='btnImage'
                        style={{
                            borderBlock: '10px',
                            backgroundColor: 'yellow',
                            color: 'black',
                            padding: '5px',
                        }}
                    >Doi Avatar </label>
                    <input type='file' hidden id='btnImage' onChange={(event) => Imageopen(event)} />
                </div>
                {preview &&
                    <>
                        <div style={{ marginTop: '20px', border: "2px solid #ccc", marginBottom: '20px', width: '150px', height: '150px' }}>
                            <img width={150} height={150}
                                src={preview} />
                        </div>
                        <button style={{
                            backgroundColor: 'yellow',
                            color: 'black',
                            padding: '5px',
                        }}
                            onClick={() => handleupdateavatar()}
                        >Save</button>
                    </>
                }
            </>
                :
                <>
                    <p>Khong co du lieu</p>
                </>
            }
        </Drawer>
    )
}

export default Viewuser;