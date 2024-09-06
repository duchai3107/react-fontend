import { Input, InputNumber, Modal, notification, Select } from "antd"
import { useEffect, useState } from "react";
import { handleupdatefile, UppdateBookAPI } from "../services/api.service";


const UppdateBook = (props) => {
    const { dataupdatebook,
        dataupdateopen,
        setdataupdatebook,
        setdataupdateopen,
        Loadbook
    } = props
    const [mainText, setmainText] = useState("");
    const [price, setprice] = useState("");
    const [quantity, setquantity] = useState("");
    const [category, setcategory] = useState("");
    const [author, setauthor] = useState("")
    const [id, setid] = useState("")
    const [dataimage, setdataimage] = useState(null)
    const [preview, setpreview] = useState(null)


    useEffect(() => {
        if (dataupdatebook && dataupdatebook._id) {
            setauthor(dataupdatebook.author)
            setcategory(dataupdatebook.category)
            setid(dataupdatebook._id)
            setmainText(dataupdatebook.mainText)
            setprice(dataupdatebook.price)
            setquantity(dataupdatebook.quantity)
            setpreview(`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataupdatebook.thumbnail}`)

        }
    }, [dataupdatebook])

    const Updatebook = async (newthumbnail) => {
        const res = await UppdateBookAPI(id, newthumbnail, author, mainText, price, quantity, category);
        if (res.data) {
            resetModelandclone()
            await Loadbook();
            notification.success({
                message: "Update Book",
                description: "Update Sách Mới Thành Công"
            })
        } else {
            notification.error({
                message: "Error Update Book",
                description: JSON.stringify(res.message)
            })
        }
    }

    const handleClickBtn = async () => {
        if (!dataimage && !preview) {
            notification.error({
                message: "Error Update Book",
                description: "Vui lòng uppdate Hình Ảnh"
            })
            return;
        }
        let newthumbnail = "";
        if (!dataimage && preview) {
            newthumbnail = dataupdatebook.thumbnail;
        }
        else {
            const resUpload = await handleupdatefile(dataimage, "book");
            if (resUpload.data) {
                newthumbnail = resUpload.data.fileUploaded;
            }
            else {
                notification.error({
                    message: "Error Update Book",
                    description: JSON.stringify(resUpload.message)
                })
                return;
            }
        }
        await Updatebook(newthumbnail)
    }


    const resetModelandclone = () => {
        setauthor("")
        setcategory("")
        setmainText("")
        setprice("")
        setquantity("")
        setpreview(null)
        setdataimage(null)
        setid("")
        setdataupdatebook(null)
        setdataupdateopen(false)

    }
    const ImageOpen = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setdataimage(null)
            setpreview(null)
            return;
        }
        const file = event.target.files[0]
        if (file) {
            setdataimage(file);
            setpreview(URL.createObjectURL(file))
        }
    }

    return (
        <Modal title="Create User"
            open={dataupdateopen}
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
                    <span>Tác Giả</span>
                    <Input
                        value={author}
                        onChange={(event) => { setauthor(event.target.value) }}
                    />
                </div>
                <div>
                    <span>Tiêu Đề</span>
                    <Input
                        value={mainText}
                        onChange={(event) => { setmainText(event.target.value) }}
                    />
                </div>
                <div>
                    <span>Giá Tiền </span>
                    <InputNumber min={1} max={1000000000} onChange={(event) => { setprice(event) }} value={price} suffix="đ" style={{ width: '100%' }} />

                </div>
                <div>
                    <span>Số lượng</span>
                    <InputNumber min={1} max={1000000000} onChange={(event) => { setquantity(event) }} value={quantity} style={{ width: '100%' }} />
                </div>
                <div>
                    <span>Thể Loại</span>
                    <Select
                        style={{ width: '100%' }}
                        value={category}
                        onChange={(event) => { setcategory(event) }}
                        options={[
                            { value: 'Arts', label: 'Arts' },
                            { value: 'Business', label: 'Business' },
                            { value: 'Comics', label: 'Comics' },
                            { value: 'Cooking', label: 'Cooking' },
                            { value: 'Entertainment', label: 'Entertainment' },
                            { value: 'History', label: 'History' },
                            { value: 'Music', label: 'Music' },
                            { value: 'Sports', label: 'Sports' },
                            { value: 'Teen', label: 'Teen' },
                            { value: 'Travel', label: 'Travel' },
                        ]}
                    />

                </div>
                <div>
                    <label htmlFor="btn_image" style={{
                        borderBlock: '10px',
                        backgroundColor: 'yellow',
                        color: 'black',
                        padding: '5px',
                        fontSize: '15px',
                        borderBlockColor: "ButtonText",
                        cursor: 'pointer'
                    }}>Upload </label>
                    <input type='file' hidden id="btn_image" onChange={(event) => { ImageOpen(event) }} onClick={(event) => { event.target.value = null }} />
                </div>
                {preview &&
                    <div style={{ marginTop: '20px', border: "2px solid #ccc", marginBottom: '20px', width: '150px', height: '150px' }}>
                        <img width={150} height={150}
                            src={preview} />
                    </div>
                }
            </div>
        </Modal >
    )

}

export default UppdateBook;