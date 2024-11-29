import React, { useState } from "react";
import { Modal, Form, Input, Button, Select } from "antd";
import { GatewayOutlined, SendOutlined } from "@ant-design/icons";
import axios from "axios";
import config from "../../config";
import Notification from '../notifications';

const { Option } = Select;

const CatalogModal = ({ isModalOpen, handleCatalogCancel, handleCatalogOk, addRowToTable }) => {
    const [form] = Form.useForm();
    const { openNotification, contextHolder } = Notification();
    const [loading, setLoading] = useState(false);

    // Main function to create a dataset catalog by sending a request
    const handleCreateDataset = async () => {
        try {
            setLoading(true);
            const values = await form.validateFields();
            // Sends the request
            const response = await axios.post(`${config.url}${config.provider}${config.gatewayPath}/create-dataset`, {
                title: values.title,
                description: [values.description],
                endpoints: [values.endpoint],
                offerIds: [values.offerId],
                keywords: values.keywords.split(",").map((keyword) => keyword.trim()),
                format: values.format
            });
            if (response.status === 200) {
                const { datasetId } = response.data;
                openNotification('success', 'Dataset created successfully', `Dataset ID: ${datasetId}`);
                form.resetFields();
                addRowToTable(datasetId, values.title, values.description, values.endpoint, values.offerId, values.keywords, values.format);
                handleCatalogOk();
            }
        } catch (error) {
            openNotification('error', 'Error', 'An error occurred while creating the dataset.');
        } finally {
            setLoading(false);
        }
    };

    // Modal display
    return (
        <>
            {contextHolder}
            <Modal width={700} open={isModalOpen} onCancel={handleCatalogCancel} footer={[
                <div key="footer" style={{ display: 'flex', justifyContent: 'space-evenly', padding: 25 }}>
                    <Button style={{ width: '30%' }} size="large" key="submit" type="primary" loading={loading} onClick={handleCreateDataset} icon={<SendOutlined />} >
                        Create Dataset
                    </Button>
                    <Button style={{ width: '30%' }} size="large" key="cancel" onClick={handleCatalogCancel}>Cancel</Button>
                </div>
            ]} >
                <h2>Create a new Dataset</h2>
                <Form form={form} layout="horizontal">
                    <Form.Item label="Title" name="title"  >
                        <Input />
                    </Form.Item>

                    <Form.Item label="Description" name="description"  >
                        <Input.TextArea rows={4}  />
                    </Form.Item>

                    <Form.Item label="Endpoints" name="endpoint" rules={[{ required: true, message: 'Please input the endpoint' }]} >
                        <Input />
                    </Form.Item>

                    <Form.Item label="Offer ID" name="offerId" rules={[{ required: true, message: 'Please input the offer ID' }]} >
                        <Input placeholder="Enter offer ID (e.g. urn:uuid:xxxx)" />
                    </Form.Item>

                    <Form.Item label="Keywords" name="keywords"  >
                        <Input />
                    </Form.Item>

                    <Form.Item label="Format" name="format" rules={[{ required: true, message: 'Please select the format' }]} >
                        <Select placeholder="Select format">
                            <Option value="HTTP_PULL">HTTP_PULL</Option>
                            <Option value="HTTP_PUSH">HTTP_PUSH</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default CatalogModal;
