import React, { useState } from 'react';
import { Modal, Form, Input, Button, Select } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import config from '../../config';
import axios from 'axios';
import Notification from '../notifications';

const StartModal = ({ isStartModalOpen, handleStartOk, handleStartCancel, transferProcessId, provider }) => {
    const [sourceEndpoint, setSourceEndpoint] = useState('');
    const [loading, setLoading] = useState(false);
    const { openNotification, contextHolder } = Notification();

    const handleStart = async () => {
        setLoading(true);

        try {
            const providerValue = Boolean(provider);

            const response = await axios.post(`${config.providerEndpoint}/api/gateway/transfer/start`, {
                provider: providerValue,
                transferProcessId: transferProcessId,
                sourceEndpoint: sourceEndpoint,
            });

            if (response.status === 200) {
                console.log('Start successful:', response.data);
                openNotification('success', 'Start Successful', 'Transfer started successfully');
                handleStartOk();
            } else {
                console.error('Unexpected response:', response);
                openNotification('error', 'Unexpected Response', 'An unexpected response was received.');
            }
        } catch (error) {
            console.error('Error in started request:', error);
            openNotification('error', 'Error trying to Start', 'An error occurred while attempting to start.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {contextHolder}
            <Modal title="Start a Data-Plane Transfer" open={isStartModalOpen} onCancel={handleStartCancel}
                footer={[
                    <div key="footer" style={{ display: 'flex', justifyContent: 'space-evenly', padding: 10 }}>
                        <Button style={{ width: '30%' }} key="agree" type="primary" icon={<SendOutlined />} loading={loading} onClick={handleStart}>
                            Start
                        </Button>
                        <Button style={{ width: '30%' }} key="cancel" onClick={handleStartCancel}>
                            Cancel
                        </Button>
                    </div>
                ]}
            >
                <Form layout="vertical">
                    <Form.Item label="sourceEndpoint" required>
                        <Input placeholder="Enter sourceEndpoint" value={sourceEndpoint} onChange={(e) => setSourceEndpoint(e.target.value)}/>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default StartModal;
