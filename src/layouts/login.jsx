import React from 'react';
import { Button, Form, Input, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();
    const onFinish = () => {
        navigate('/home');
    };

    return (
        <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', background: '#f8f8f8' }}>
            <div style={{ width: 300, padding: 24, background: '#fff', border: 'solid black 1px', borderRadius: 8, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', marginTop: '12%', marginBottom: '18%', }}>
                <Typography.Title level={3} style={{ textAlign: 'center' }}>
                    Sign in
                </Typography.Title>
                <Form name="login" onFinish={onFinish} layout="vertical">
                    <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                        <Input.Password />
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
