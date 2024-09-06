import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
const ViewBook = (props) => {
    const { open, setOpen, dataview, setdataview } = props

    const onClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Drawer title="Chi Tiet sach" onClose={onClose} open={open}>
                {dataview ? <>
                    <p>Tác Giả:{dataview.author}</p>
                    <p>Thể Loại:{dataview.category}</p>
                    <p>Tên Sách:{dataview.mainText}</p>
                    <p> Giá Tiền:{dataview.price}</p>
                    <p>Số Lượng:{dataview.quantity}</p>
                    <p>Ảnh Sách:</p>
                    <div style={{ marginTop: '20px', border: "2px solid #ccc", marginBottom: '20px', width: '150px', height: '150px' }}>
                        <img width={150} height={150} src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataview.thumbnail}`} />
                    </div>
                </>
                    : <>
                        <p>Không có gia trị</p>
                    </>
                }
            </Drawer>
        </>
    );
};
export default ViewBook