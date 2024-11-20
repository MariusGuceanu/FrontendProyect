import React, { useState } from 'react';
import { Modal, Form, Input, Button, Select } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import axios from 'axios';
import Notification from '../notifications';

const StartModal = ({ isStartModalOpen, handleStartOk, handleStartCancel, transferProcessId, provider, endpoint }) => {
    const [sourceEndpoint, setSourceEndpoint] = useState('');
    const [loading, setLoading] = useState(false);
    const { openNotification, contextHolder } = Notification();

    const handleStart = async () => {
        setLoading(true);
        try {

            // const to distinct between provider and consumer
            const providerValue = provider === 'true';

            // Sends the request
            const response = await axios.post(`${endpoint}/api/gateway/transfer/start`, {
                provider: providerValue,
                transferProcessId: transferProcessId,
                sourceEndpoint: sourceEndpoint,
            });
            if (response.status === 200) {
                openNotification('success', 'Start Successful', 'Transfer started successfully');
                handleStartOk();
            } else {
                openNotification('error', 'Unexpected Response', 'An unexpected response was received.');
            }
        } 
        catch (error) {
            openNotification('error', 'Error trying to Start', 'An error occurred while attempting to start.');
        } 
        finally {
            setLoading(false);
        }
    };

    // Modal display
    return (
        <>
            {contextHolder}
            <Modal open={isStartModalOpen} onCancel={handleStartCancel}
                footer={[
                    <div key="footer" style={{ display: 'flex', justifyContent: 'space-evenly', padding: 10 }}>
                        <Button style={{ width: '30%' }} key="agree" size='large' type="primary" icon={<SendOutlined />} iconPosition='end' loading={loading} onClick={handleStart}>
                            Start
                        </Button>
                        <Button style={{ width: '30%' }} key="cancel" size='large' onClick={handleStartCancel}>
                            Cancel
                        </Button>
                    </div>
                ]}>
                <h2>Start a Data-Plane Transfer</h2>
                <Form layout="vertical">
                    <Form.Item label="Source Endpoint" required>
                        <Input placeholder="Enter sourceEndpoint" value={sourceEndpoint} onChange={(e) => setSourceEndpoint(e.target.value)} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default StartModal;
