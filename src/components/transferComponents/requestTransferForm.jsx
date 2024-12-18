import React, { useState } from 'react';
import { Modal, Form, Input, Button, Select } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import axios from 'axios';
import Notification from '../notifications';
import { transferEndpoints } from '../endpoints';

const { Option } = Select;

const RequestTransferModal = ({ isRequestTransferModalOpen, handleRequestTransferOk, handleRequestTransferCancel }) => {
    const { openNotification, contextHolder } = Notification();
    const [loading, setLoading] = useState(false);
    const [providerEndpoint, setProviderEndpoint] = useState();
    const [form] = Form.useForm();
    const [transferFormat, setTransferFormat] = useState('');

    const handleProviderEpChange = (e) => {
        setProviderEndpoint(e.target.value);
    };

    // Main function to make the request for a transfer process
    const handleRequestTransfer = async () => {
        try {
            setLoading(true);
            const values = await form.validateFields();
            const payload = {
                transferFormat: values.transferFormat,
                agreementId: values.agreementId,
                providerEndpoint: values.providerEndpoint,
            };

            if (values.transferFormat === 'HTTP_PUSH') {
                // Adds sinkEndpoint only for HTTP_PUSH
                payload.sinkEndpoint = values.sinkEndpoint;
            }
            const url = transferEndpoints.requestTransferEndpoint
            // Send the request
            await axios.post(url, payload);
            openNotification('success', 'Transfer requested', 'Transfer request sent successfully');
            form.resetFields();
            handleRequestTransferOk();
        }
        catch (error) {
            console.error(error);
            openNotification('error', 'Failed to send transfer request. Please try again.');
        }
        finally {
            setLoading(false);
        }
    };

    // Modal display
    return (
        <>
            {contextHolder}
            <Modal width={1000} open={isRequestTransferModalOpen} onOk={handleRequestTransferOk} onCancel={handleRequestTransferCancel}
                footer={[
                    <div key="footer" style={{ display: 'flex', justifyContent: 'space-evenly', padding: 10 }}>
                        <Button style={{ width: '20%' }} key="offer" type="primary" size="large" disabled={!providerEndpoint} icon={<SendOutlined />} iconPosition='end' onClick={handleRequestTransfer} loading={loading}>
                            Send Request
                        </Button>
                        <Button style={{ width: '20%' }} key="cancel" type="default" size="large" onClick={handleRequestTransferCancel}>
                            Cancel
                        </Button>
                    </div>
                ]}>
                <h2>Request a data-plane transfer</h2>
                <Form className='formRequest' form={form} preserve={false} autoComplete='off' labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} style={{ maxWidth: 800, marginLeft: '5%', margin: '5% 4% 5% 3%' }} layout='horizontal'>
                    <Form.Item style={{ paddingBottom: '1.5%' }} label="Transfer Format" name="transferFormat" rules={[{ required: true, message: 'Please select a transfer format' }]}>
                        <Select style={{ width: '75%' }} value={transferFormat} onChange={(value) => setTransferFormat(value)}>
                            <Option value="HTTP_PUSH">HTTP_PUSH</Option>
                            <Option value="HTTP_PULL">HTTP_PULL</Option>
                        </Select>

                    </Form.Item>
                    {transferFormat === 'HTTP_PUSH' && (
                        <Form.Item style={{ paddingBottom: '1.5%' }} label="Sink Endpoint" name="sinkEndpoint" rules={[{ required: true, message: 'Please provide the Sink Endpoint' }]}>
                            <Input style={{ width: '75%' }} />
                        </Form.Item>
                    )}
                    <Form.Item style={{ paddingBottom: '1.5%' }} label="Agreement Id" name="agreementId" rules={[{ required: true, message: 'Please provide an Agreement ID' }]}                    >
                        <Input style={{ width: '75%' }} />
                    </Form.Item>
                    <Form.Item style={{ paddingBottom: '1.5%' }} label="Provider Endpoint" name="providerEndpoint" rules={[{ required: true, message: 'Please provide the Provider Endpoint' }]}>
                        <Input value={providerEndpoint} onChange={handleProviderEpChange} style={{ width: '75%' }} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default RequestTransferModal;
