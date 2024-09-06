import { Button, Col, Divider, Form, Input, message, notification, Row } from "antd"
import { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ArrowRightOutlined } from "@ant-design/icons";
import { loginAPI } from "../services/api.service";
import { Authcontext } from "../components/context/auth.context";

const LoginPage = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false)
    const { setUser } = useContext(Authcontext)

    const onFinish = async (values) => {
        setLoading(true)
        const res = await loginAPI(values.email, values.password);
        if (res.data) {
            message.success("Dang nhap thanh cong")
            localStorage.setItem("access_token", res.data.access_token)
            setUser(res.data.user)
            navigate("/")
        } else {
            notification.error({
                message: "Error Login",
                description: JSON.stringify(res.message)
            })
        }
        setLoading(false)
    }
    const onKeyDown = (event) => {
        if (event.key === 'Enter') {
            form.submit();
        }
    }
    return (
        <Row justify={"center"} style={{ marginTop: '30px' }}>
            <Col xs={24} md={16} lg={8}>
                <fieldset style={{
                    padding: '15px',
                    margin: '5px',
                    border: '1px solid #ccc',
                    borderRadius: '5px'
                }}>
                    <legend>Dang Nhap</legend>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}

                    // onFinishFailed={onFinishFailed}
                    >

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Email khong duoc de trong',
                                },
                                {
                                    type: "email",
                                    message: "Email khong dung dinh dang"
                                }
                            ]}

                        >
                            <Input />
                        </Form.Item>
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
                            <Input.Password onKeyDown={onKeyDown} />
                        </Form.Item>
                        <Form.Item>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'

                            }}>
                                <Button style={{ marginTop: '20px' }} loading={loading} onClick={() => form.submit()}
                                    type="primary"> Login </Button>
                                <Link to="/">Go to the homepage<ArrowRightOutlined /></Link>
                            </div>
                        </Form.Item>
                    </Form >
                    <Divider />
                    <div style={{ textAlign: 'center' }}>Chua co tai khoan<Link to="/register">Dang ki tai day</Link></div>
                </fieldset>

            </Col>
        </Row>






    )
}

export default LoginPage;