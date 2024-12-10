import React from 'react';
import { Button, Form, Input, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const onFinish = (values) => {
        localStorage.setItem('username', values.username);
        navigate('/home/organizations');
    };

    return (
        <div
            style={{
                height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#eee',
            }}>
            <div
                style={{
                    width: 320, padding: 32, background: '#fff', borderRadius: 10, boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
                }}>
                <Typography.Title level={3} style={{ textAlign: 'center', color: '#1E4792', marginBottom: 20 }}>
                    Sign in
                </Typography.Title>
                <Form name="login" onFinish={onFinish} layout="vertical">
                    <Form.Item
                        label={<span style={{ fontWeight: 'bold' }}>Username</span>}
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]} >
                        <Input placeholder="Enter your username" />
                    </Form.Item>
                    <Form.Item
                        label={<span style={{ fontWeight: 'bold' }}>Password</span>}
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]} >
                        <Input.Password placeholder="Enter your password" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Login;
