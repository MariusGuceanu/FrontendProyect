import React, { useState } from 'react';
import { Modal, Form, Button } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import axios from 'axios';
import Notification from '../notifications';
import config from '../../config';

const CompleteModal = ({ isCompleteModalOpen, handleCompleteOk, handleCompleteCancel, transferId, provider, endpoint }) => {
    const [loading, setLoading] = useState(false);
    const { openNotification, contextHolder } = Notification();

    // Main function to complete a transfer-request 
    const handleComplete = async () => {
        console.log(provider, transferId, endpoint)
        setLoading(true);
        try {

            // const to distinct between provider and consumer
            const providerValue = provider === 'true';

            // Sends the request
            const response = await axios.post(`${config.url}${endpoint}${config.gatewayTransfersPath}/${encodeURIComponent(transferId)}/completion`, {
                isProvider: providerValue,
            });
            console.log(providerValue)
            if (response.status === 200) {
                openNotification('success', 'Completed', 'Transfer completed successfully');
                handleCompleteOk();
            } else {
                openNotification('error', 'Unexpected Response', 'An unexpected response was received.');
            }

        }
        catch (error) {
            openNotification('error', 'Error trying to Complete', 'An error occurred while attempting to complete.');
        }
        finally {
            setLoading(false);
        }
    };

    // Modal display
    return (
        <>
            {contextHolder}
            <Modal open={isCompleteModalOpen} onCancel={handleCompleteCancel}
                footer={[
                    <div key="footer" style={{ display: 'flex', justifyContent: 'space-evenly', padding: 10 }}>
                        <Button style={{ width: '30%' }} key="agree" size='large' type="primary" icon={<SendOutlined />} iconPosition='end' loading={loading} onClick={handleComplete}>
                            Complete
                        </Button>
                        <Button style={{ width: '30%' }} key="cancel" size='large' onClick={handleCompleteCancel}>
                            Cancel
                        </Button>
                    </div>
                ]}>
                <h2>Complete a Data-Plane Transfer</h2>
                <Form layout="vertical">
                    <Form.Item label="Are you sure you want to Complete this transfer?" required>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default CompleteModal;