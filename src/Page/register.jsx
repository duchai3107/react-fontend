import { Button, Col, Divider, Form, Input, message, notification, Row } from "antd"
import { useState } from "react";
import { registeruserApi } from "../services/api.service"
import { Link, Navigate, useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const onFinish = async (values) => {
        const res = await registeruserApi(
            values.fullName,
            values.email,
            values.password,
            values.phone
        )
        if (res.data) {
            notification.success({
                message: "Register User",
                description: "Dang ki User thanh cong"
            })
            navigate("/login")
        } else {
            notification.error({
                message: "Register User error",
                description: JSON.stringify(res.message)
            })
        }
    }
    return (

        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            style={{ margin: '30px' }}
        // onFinishFailed={onFinishFailed}
        >
            <h3 style={{ textAlign: "center" }}>Dang ki tai khoan</h3>
            <Row justify={"center"}>
                <Col xs={24} md={8}>
                    <Form.Item
                        label="Full Name"
                        name="fullName"
                        rules={[
                            {
                                required: true,
                                message: 'Ten khong duoc de trong',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify={"center"}>
                <Col xs={24} md={8}>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Email khong duoc de trong',
                            },
                        ]}

                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify={"center"}>
                <Col xs={24} md={8}>
                    <Form.Item
                        label="PassWord"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Mat khau khong duoc de trong',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                </Col>
            </Row>

            <Row justify={"center"}>
                <Col xs={24} md={8}>
                    <Form.Item
                        label="Phone Number"
                        name="phone"
                        rules={[
                            {
                                required: true,
                                pattern: new RegExp(/\d+/g),
                                message: "Chi nhap chi so"
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify={"center"}>
                <Col xs={24} md={8}>
                    <Button style={{ marginTop: '20px' }} onClick={() => form.submit()}
                        type="primary"> Create Register </Button>
                    <Divider />
                    <div>Da co tai khoan <Link to="/login">Dang Nhap Tai Day</Link></div>
                </Col>
            </Row>

        </Form >





    )
}

export default RegisterPage;