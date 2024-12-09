import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Space, Typography } from 'antd';
import Notification from '../components/notifications';
import axios from 'axios';
import { managmentEndpoints } from '../components/endpoints';
const { TextArea } = Input;

const Organizations = () => {
    // Initial example data showed on the inputs
    const initialData = {
        agentId: "",
        participantId: "",
        title: "",
        description:
            "",
    };

    // Defining states
    const [form] = Form.useForm();
    const [formData, setFormData] = useState(initialData);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false)
    const { openNotification, contextHolder } = Notification();

    // First request to get the organization details from the endpoint
    useEffect(() => {
        const GetData = async () => {
            setLoading(true);
            const getUrl = managmentEndpoints.getOrganization
            try {
                const response = await axios.get(getUrl);
                setFormData(response.data);
                form.setFieldsValue(response.data);
            } catch (error) {
                console.error("Fetch error:", error);
            } finally {
                setLoading(false);
            }
        };
        GetData();
    }, [form]);

    // Sets the inputs to be editable
    const handleEdit = () => {
        setIsEditing(true);
    };

    // Takes the new data of the inputs, sets it and saves the new form
    const handleSave = async () => {
        try {
            const values = await form.validateFields();
            setLoading(true);
            const postUrl = managmentEndpoints.postOrganization

            const response = await axios.post(postUrl, values);
            if (response.status === 200) {
                setFormData(values);
                setIsEditing(false);
                openNotification('success', 'Organization updated', 'The details of the organizations were updated successfully');
            } else {
                openNotification('error', 'Unexpected Response', 'An unexpected response was received.');
            }
        } catch (error) {
            openNotification('error', 'Error in organization', error.response?.data?.message || 'An error occurred while attempting the update');
        } finally {
            setLoading(false);
        }
    };

    // Closes the edition and leaves the form as it was
    const handleCancel = () => {
        form.setFieldsValue(formData);
        setIsEditing(false);
        setLoading(false)
    };
    // Content display
    return (
        <>
            {contextHolder}
            <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
                <fieldset
                    style={{
                        border: "1.5px solid #1e4792", borderRadius: "8px", padding: "20px", backgroundColor: "#fff", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", position: "relative",
                    }}>
                    <legend
                        style={{
                            fontSize: "18px", fontWeight: "bold", color: "#1a2b4d", padding: "0 10px",
                        }}>
                        <h2>Organization Details</h2>
                    </legend>
                    <Form form={form} layout="vertical" labelAlign="center" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
                        <Form.Item
                            label={<Typography.Text strong style={{ fontSize: "16px", textAlign: "center" }}>Agent ID</Typography.Text>} name="agentId"
                            rules={[{ required: true, message: "Please input the Agent Id" }]}
                        >
                            <Input size="large" disabled={!isEditing} />
                        </Form.Item>

                        <Form.Item
                            label={<Typography.Text strong style={{ fontSize: "16px", textAlign: "center" }}>Participant ID</Typography.Text>} name="participantId"
                            rules={[{ required: true, message: "Please input the Participant Id" }]}
                        >
                            <Input size="large" disabled={!isEditing} />
                        </Form.Item>

                        <Form.Item
                            label={<Typography.Text strong style={{ fontSize: "16px", textAlign: "center" }}>Title</Typography.Text>} name="title"
                            rules={[{ required: true, message: "Please input the title" }]}
                        >
                            <Input size="large" disabled={!isEditing} />
                        </Form.Item>

                        <Form.Item
                            label={<Typography.Text strong style={{ fontSize: "16px", textAlign: "center" }}>Description</Typography.Text>} name="description"
                            rules={[{ required: true, message: "Please input a description" }]}
                        >
                            <TextArea rows={4} size="large" disabled={!isEditing} />
                        </Form.Item>

                        <Form.Item wrapperCol={{ span: 24 }} style={{ display: 'flex', justifyContent: 'center', marginTop: "20px" }}>
                            <Space style={{ display: 'flex', justifyContent: 'space-between' }}>
                                {isEditing ? (
                                    <Space>
                                        <Button type="primary" size="large" loading={loading} onClick={handleSave}>
                                            Save
                                        </Button>
                                        <Button danger size="large" onClick={handleCancel}>
                                            Cancel
                                        </Button>
                                    </Space>
                                ) : (
                                    <Button type="primary" size="large" onClick={handleEdit}>
                                        Edit
                                    </Button>
                                )}
                            </Space>
                        </Form.Item>
                    </Form>
                </fieldset>
            </div>
        </>
    );
};

export default Organizations;
