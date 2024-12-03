import React, { useState } from 'react';
import { Form, Input, Button, Space, Typography } from 'antd';

const { TextArea } = Input;

const OrganizationDetails = () => {
    // Initial example data showed on the inputs
    const initialData = {
        participant_id: "org1",
        agent_id: "connector1",
        title: "Ceit Centro Tecnológico",
        description:
            "Ceit is a non-profit research centre created by the University of Navarra in 1982. The main objective of the centre is to carry out applied industrial research projects through close collaboration with the R&D departments.",
        url: "https://www.ceit.es/",
    };

    // Defining states
    const [form] = Form.useForm();
    const [formData, setFormData] = useState(initialData);
    const [isEditing, setIsEditing] = useState(false);

    // Set the inputs to be editable
    const handleEdit = () => {
        setIsEditing(true);
    };

    // Takes the new data of the inputs, sets it and saves the new form
    const handleSave = async () => {
        try {
            const values = await form.validateFields();
            setFormData(values);
            setIsEditing(false);
        } catch (error) {
            console.error("Validation Failed:", error);
        }
    };

    // Closes the edition and leaves the form as it was
    const handleCancel = () => {
        form.setFieldsValue(formData);
        setIsEditing(false);
    };

    React.useEffect(() => {
        form.setFieldsValue(formData);
    }, [formData, form]);

    // Content display
    return (
        <div style={{ padding: "20px", maxWidth: "900px", margin: "auto" }}>
            <fieldset
                style={{
                    border: "1.5px solid #1a2b4d",
                    borderRadius: "8px",
                    padding: "20px",
                    backgroundColor: "#eee",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    position: "relative",
                }}>
                <legend
                    style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        color: "#1a2b4d",
                        padding: "0 10px",
                    }}>
                    <h2>Organization Details</h2>
                </legend>
                <Form form={form} layout="horizontal" labelCol={{ span: 5 }} wrapperCol={{ span: 16 }}
                >
                    <Form.Item
                        label={<Typography.Text strong style={{ fontSize: "16px" }}>Participant ID</Typography.Text>} name="participant_id"
                        rules={[{ required: true, message: "Please input the Participant" }]}
                    >
                        <Input style={{ color: '#727272' }} size="large" disabled={!isEditing} />
                    </Form.Item>

                    <Form.Item
                        label={<Typography.Text strong style={{ fontSize: "16px" }}>Agent ID</Typography.Text>} name="agent_id"
                        rules={[{ required: true, message: "Please input the Agent Id" }]}
                    >
                        <Input style={{ color: '#727272' }} size="large" disabled={!isEditing} />
                    </Form.Item>

                    <Form.Item
                        label={<Typography.Text strong style={{ fontSize: "16px" }}>Title</Typography.Text>} name="title"
                        rules={[{ required: true, message: "Please input the title" }]}
                    >
                        <Input style={{ color: '#727272' }} size="large" disabled={!isEditing} />
                    </Form.Item>

                    <Form.Item
                        label={<Typography.Text strong style={{ fontSize: "16px" }}>Description</Typography.Text>} name="description">
                        <TextArea style={{ color: '#727272' }} rows={4} size="large" disabled={!isEditing} />
                    </Form.Item>

                    <Form.Item
                        label={<Typography.Text strong style={{ fontSize: "16px" }}>URL</Typography.Text>} name="url"
                        rules={[{ type: "url", message: "Please input a valid URL!" }]}
                    >
                        <Input style={{ color: '#727272' }} size="large" disabled={!isEditing} />
                    </Form.Item>

                    <Form.Item wrapperCol={{ span: 24 }} style={{ display: 'flex', justifyContent: 'center', marginTop: "20px" }}>
                        <Space style={{ display: 'flex', justifyContent: 'space-between' }}>
                            {isEditing ? (
                                <Space>
                                    <Button type="primary" size="large" onClick={handleSave}>
                                        Save
                                    </Button>
                                    <Button size="large" onClick={handleCancel}>
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
    );
};

export default OrganizationDetails;
