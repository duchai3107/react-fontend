import { Button, Checkbox, Descriptions, Form, Input, message, Modal, notification, Row, Col } from "antd";
import { useState } from "react";
import { creatbookApi, handleupdatefile } from "../services/api.service";
import { InputNumber } from 'antd';
import { Select, Space } from 'antd';

// const Bookform = (props) => {
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [mainText, setmainText] = useState("");
//     const [price, setprice] = useState("");
//     const [quantity, setquantity] = useState("");
//     const [category, setcategory] = useState("");
//     const [thumbnail, setthumbnail] = useState("");
//     const [author, setauthor] = useState("")
//     const { Loadbook } = props;
//     const [dataimage, setdataimage] = useState(null)
//     const [preview, setpreview] = useState(null)

//     const showModal = () => {
//         setIsModalOpen(true);
//     };

//     const handleOk = async () => {
//         if (!dataimage) {
//             notification.error({
//                 message: 'Error Creat Book',
//                 description: "Phải Có hình ảnh"
//             })
//             return;
//         }

//         const resUpload = await handleupdatefile(dataimage, "book");
//         if (resUpload.data) {
//             const newthumbnail = resUpload.data.fileUploaded;
//             const res = await creatbookApi(newthumbnail, author, mainText, price, quantity, category)

//             if (res.data) {
//                 handleCancel()
//                 notification.success({
//                     message: "Creat Book",
//                     Descriptions: "Tao Moi Thanh Cong"
//                 })
//             } else {
//                 notification.error({
//                     message: 'Error Creat Book',
//                     description: JSON.stringify(res.message)
//                 })
//             }
//         } else {
//             notification.error({
//                 message: 'Error Upload File',
//                 description: JSON.stringify(res.message)
//             })
//         }
//         setIsModalOpen(false);
//         await Loadbook();
//     };

//     const handleCancel = () => {
//         setauthor("")
//         setcategory("")
//         setmainText("")
//         setdataimage(null)
//         setprice("")
//         setquantity("")
//         setpreview(null)
//         setIsModalOpen(false);

//     };
//     const ImageOpen = (event) => {
//         if (!event.target.files || event.target.files.length === 0) {
//             setdataimage(null)
//             setpreview(null)
//         }
//         const file = event.target.files[0]
//         if (file) {
//             setdataimage(file);
//             setpreview(URL.createObjectURL(file))
//         }
//     };
//     return (
//         <>
//             <div style={{ display: 'flex', justifyContent: 'space-between', margin: '30px 10px' }}>
//                 <span>Table Book</span>
//                 <Button type="primary" onClick={showModal}>
//                     Creat Book
//                 </Button>
//             </div>
//             <Modal title="Basic Modal" open={isModalOpen} onOk={() => handleOk()} onCancel={handleCancel}>

//                 <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
//                     <div>
//                         <span>Tác Giả</span>
//                         <Input
//                             value={author}
//                             onChange={(event) => { setauthor(event.target.value) }}
//                         />
//                     </div>
//                     <div>
//                         <span>Tiêu Đề</span>
//                         <Input
//                             value={mainText}
//                             onChange={(event) => { setmainText(event.target.value) }}
//                         />
//                     </div>
//                     <div>
//                         <span>Giá Tiền </span>
//                         <InputNumber min={1} max={1000000000} onChange={(event) => { setprice(event) }} value={price} suffix="đ" style={{ width: '100%' }} />

//                     </div>
//                     <div>
//                         <span>Số lượng</span>
//                         <InputNumber min={1} max={1000000000} onChange={(event) => { setquantity(event) }} value={quantity} style={{ width: '100%' }} />
//                     </div>
//                     <div>
//                         <span>Thể Loại</span>
//                         <Select
//                             style={{ width: '100%' }}
//                             value={category}
//                             onChange={(event) => { setcategory(event) }}
//                             options={[
//                                 { value: 'Arts', label: 'Arts' },
//                                 { value: 'Business', label: 'Business' },
//                                 { value: 'Comics', label: 'Comics' },
//                                 { value: 'Cooking', label: 'Cooking' },
//                                 { value: 'Entertainment', label: 'Entertainment' },
//                                 { value: 'History', label: 'History' },
//                                 { value: 'Music', label: 'Music' },
//                                 { value: 'Sports', label: 'Sports' },
//                                 { value: 'Teen', label: 'Teen' },
//                                 { value: 'Travel', label: 'Travel' },
//                             ]}
//                         />

//                     </div>
//                     <div>
//                         <label htmlFor="btn_image" style={{
//                             borderBlock: '10px',
//                             backgroundColor: 'yellow',
//                             color: 'black',
//                             padding: '5px',
//                             fontSize: '15px',
//                             borderBlockColor: "ButtonText",
//                             cursor: 'pointer'
//                         }}>Upload </label>
//                         <input type='file' hidden id="btn_image" onChange={(event) => { ImageOpen(event) }} onClick={(event) => { event.target.value = null }} />
//                     </div>
//                     {preview &&
//                         <div style={{ marginTop: '20px', border: "2px solid #ccc", marginBottom: '20px', width: '150px', height: '150px' }}>
//                             <img width={150} height={150}
//                                 src={preview} />
//                         </div>
//                     }
//                 </div>
//             </Modal>
//         </>
//     )
// };

const Bookform = (props) => {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    // const [isModalcancel, setIsModalcancel] = useState(false);
    const [dataimage, setdataimage] = useState(null)
    const [preview, setpreview] = useState(null)
    const { Loadbook } = props;

    const onFinish = async (values) => {
        if (!dataimage) {
            notification.error({
                message: 'Error Creat Book',
                description: "Phải Có hình ảnh"
            })
            return;
        }

        const resUpload = await handleupdatefile(dataimage, "book");
        if (resUpload.data) {
            const newthumbnail = resUpload.data.fileUploaded;
            const { mainText, author, price, quantity, category } = values;
            const res = await creatbookApi(newthumbnail, author, mainText, price, quantity, category)
            if (res.data) {
                notification.success({
                    message: "Creat Book",
                    description: "Tạo Sách Mới Thành Công"
                })
            } else {
                notification.error({
                    message: "Error Creat Book",
                    description: JSON.stringify(res.message)
                })
            }
        } else {
            notification.error({
                message: "Error Image Book",
                description: JSON.stringify(res.message)
            })
        }
        oncancel();
        Loadbook();
    }
    const oncancel = () => {
        form.resetFields();
        setpreview(null)
        setdataimage(null)
        setIsModalOpen(false);
    }
    const ImageOpen = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setdataimage(null)
            setpreview(null)
        }
        const file = event.target.files[0]
        if (file) {
            setdataimage(file);
            setpreview(URL.createObjectURL(file))
        }
    }
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '30px 10px' }}>
                <span>Table Book</span>
                <Button type="primary" onClick={() => { setIsModalOpen(true) }}>
                    Creat Book
                </Button>
            </div>
            <Modal open={isModalOpen} title="Basic Modal" onOk={() => form.submit()} onCancel={oncancel}>
                <Form
                    form={form}
                    onFinish={onFinish}
                    style={{ maxWidth: '100%' }}
                    layout="vertical"
                >
                    <Form.Item
                        name="mainText"
                        label="Tiêu Đề"
                        rules={[{ required: true, message: "Tiêu Đề Không Được Để Trống" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="author"
                        label="Tác Giả"
                        rules={[{ required: true, message: "Tác Giả Không Được Để Trống" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="price"
                        label="Giá Tiền"
                        rules={[{ required: true, message: "Giá Tiền Không Được Để Trống" }]}>
                        <InputNumber min={1} max={1000000000} suffix="đ" style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                        name="quantity"
                        label="Số Lượng"
                        rules={[{ required: true, message: "Số Lượng Không Được Để Trống" }]}>
                        <InputNumber min={1} max={1000000000} style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                        name="category"
                        label="Loại Sách"
                        rules={[{ required: true, message: "Lọai Sách Không Được Để Trống" }]}>
                        <Select

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
                            ]} />

                    </Form.Item>
                    <Form.Item>
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
                            <input type='file' hidden id="btn_image" onChange={(event) => { ImageOpen(event) }} onClick={(event) => { event.target.value = null }} style={{ display: "none" }} />
                        </div>
                        {preview &&
                            <div style={{ marginTop: '20px', border: "2px solid #ccc", marginBottom: '20px', width: '150px', height: '150px' }}>
                                <img width={150} height={150}
                                    src={preview} />
                            </div>
                        }
                    </Form.Item>
                </Form>
            </Modal >
        </>
    )
}

export default Bookform
