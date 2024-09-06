import { useEffect, useState } from "react";
import { DatabookAPI, DeleteBook } from "../services/api.service";
import { Button, Modal, notification, Popconfirm, Table } from 'antd';
import Bookform from "../book/book.from";
import ViewBook from "../book/view.book";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import UppdateBook from "../book/uppdate.book";


const BookPage = () => {
    const [databook, setdatabook] = useState("")
    const [open, setOpen] = useState(false);
    const [dataview, setdataview] = useState(null)
    const [current, setcurrent] = useState(1)
    const [pageSize, setpageSize] = useState(10)
    const [total, settotal] = useState(0)
    const [dataupdatebook, setdataupdatebook] = useState(null)
    const [dataupdateopen, setdataupdateopen] = useState(false)


    useEffect(() => {
        Loadbook();
    }, [current, pageSize])
    const Loadbook = async () => {
        const res = await DatabookAPI(current, pageSize);
        setdatabook(res.data.result)
        if (res.data) {
            setcurrent(res.data.meta.current)
            setpageSize(res.data.meta.pageSize)
            settotal(res.data.meta.total)
        }
    }

    const onChange = (pagination, filters, sorter) => {
        if (pagination.current !== current) {
            setcurrent(pagination.current)
        }
        if (pagination.pageSize !== pageSize) {
            setpageSize(pagination.pageSize)
        }
    }


    const columns = [
        {
            title: 'STT',
            render: (_, record, index) => {
                return (
                    <>
                        {(index + 1) + (current - 1) * pageSize}

                    </>
                )
            },
        },
        {
            title: 'ID',
            dataIndex: '_id',
            render: (_, record) => <a
                href="#"
                onClick={() => {
                    setOpen(true);
                    setdataview(record)
                }}
            >{record._id}
            </a>,

        },
        {
            title: 'Tiêu Đề',
            dataIndex: 'mainText',

        },
        {
            title: 'Giá Tiền',
            dataIndex: 'price',
            render: (text, record, index, action) => {
                if (text)
                    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(text);
            }

        },
        {
            title: 'Số Lượng',
            dataIndex: 'quantity',


        },
        {
            title: 'Tác Giả',
            dataIndex: 'author',

        },
        {
            title: 'Action',
            dataIndex: 'address',
            render: (_, record) => (
                <div style={{ display: "flex", gap: "20px" }}>
                    <EditOutlined style={{ cursor: "pointer", color: "orange" }}
                        onClick={() => {
                            setdataupdatebook(record)
                            setdataupdateopen(true)
                        }}
                    />
                    <Popconfirm
                        title="Delete the task"
                        description="Ban muon xoa nguoi dung nay"
                        onConfirm={() => handledelete(record._id)}
                        okText="Yes"
                        cancelText="No"
                        placement='left'
                    >
                        <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
                    </Popconfirm>
                </div>
            ),
        },
    ];
    const handledelete = async (id) => {
        const res = await DeleteBook(id);
        if (res.data) {
            notification.success({
                message: "Delete book",
                description: "Xoa nguoi dung thanh cong"
            })
            await Loadbook();
        }
        else {
            notification.success({
                message: "Delete book",
                description: JSON.stringify(res.message)
            })
        }
    }
    return (
        <>
            <Bookform Loadbook={Loadbook} />
            <Table dataSource={databook} columns={columns} rowKey={"_id"} pagination={
                {
                    current: current,
                    pageSize: pageSize,
                    showSizeChanger: true,
                    total: total,
                    showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>) }
                }}
                onChange={onChange} />
            <ViewBook open={open} setOpen={setOpen} dataview={dataview} setdataview={setdataview} />
            <UppdateBook dataupdatebook={dataupdatebook}
                dataupdateopen={dataupdateopen}
                setdataupdatebook={setdataupdatebook}
                setdataupdateopen={setdataupdateopen}
                Loadbook={Loadbook}
            />
        </>
    )
};
export default BookPage;