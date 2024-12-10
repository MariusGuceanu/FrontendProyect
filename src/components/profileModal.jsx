import React, { useState } from "react";
import { Modal, Tabs, Form, Input, Button, Select } from "antd";
import { UserOutlined, SettingOutlined, LockOutlined } from "@ant-design/icons";
import Organizations from "../pages/organization";

const { TabPane } = Tabs;

const ProfileModal = ({ onopen, onOk, onCancel, activeTab }) => {

    return (
        <>
            <Modal visible={onopen} onOk={onOk} onCancel={onCancel} width={800}
                footer={null}>
                <h2 style={{ textAlign: 'center' }}>Profile settings</h2>
                <Tabs centered defaultActiveKey="1" type="card" activeKey={activeTab}>
                    <TabPane
                        tab={
                            <span>
                                <UserOutlined /> Organization
                            </span>
                        }
                        key="1">
                        <Organizations />
                    </TabPane>

                    <TabPane
                        tab={
                            <span>
                                <SettingOutlined /> Settings
                            </span>
                        }
                        key="2">
                        <Form layout="vertical">
                            <Form.Item label="Current Password" name="currentPassword">
                                <Input.Password placeholder="Enter current password" />
                            </Form.Item>
                            <Form.Item label="New Password" name="newPassword">
                                <Input.Password placeholder="Enter new password" />
                            </Form.Item>
                            <Form.Item label="Confirm Password" name="confirmPassword">
                                <Input.Password placeholder="Confirm new password" />
                            </Form.Item>
                            <Button onClick={onOk} type="primary" block>
                                Update Settings
                            </Button>
                        </Form>

                    </TabPane>

                    <TabPane
                        tab={
                            <span>
                                <LockOutlined /> Users
                            </span>
                        }
                        key="3">
                        <Form layout="vertical">
                            <Form.Item label="Current user" name="currentUser">
                                <Input placeholder="Admin1" />
                            </Form.Item>
                            <Form.Item label="Users" name="users">
                                <Select placeholder="Select a User">
                                    <Option value="Admin">Admin</Option>
                                    <Option value="Employee">Employee</Option>
                                    <Option value="Developer">Developer</Option>
                                </Select>                            </Form.Item>
                            <Button onClick={onOk} type="primary" block>
                                Save Settings
                            </Button>
                        </Form>
                    </TabPane>
                </Tabs>
            </Modal>
        </>
    );
};

export default ProfileModal;
