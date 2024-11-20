import React, { useState } from 'react';
import { Modal, Form, Button } from 'antd';
import Notification from '../notifications';
import { SendOutlined } from '@ant-design/icons';
import axios from 'axios';
import config from '../../config';

const VerifyModal = ({ isVerifyModalOpen, handleVerifyOk, handleVerifyCancel, consumerPid }) => {
    const [loading, setLoading] = useState(false);
    const { openNotification, contextHolder } = Notification();

    // Main function to verify a contract by sending a request
    const handleVerify = async () => {
        setLoading(true);
        try {
            // Sends the request
            const response = await axios.post(`${config.consumerEndpoint}/api/gateway/verify-agreement/${encodeURIComponent(consumerPid)}`, {
                consumerPid: consumerPid,
            });
            if (response.status === 200) {
                console.log('Contract agreement is verified', response.data);
                openNotification('success', 'Verified', 'Contract agreement is verified');
                handleVerifyOk();
            } else {
                console.error('Unexpected response:', response);
                openNotification('error', 'Unexpected Response', 'An unexpected response was received.');
            }
        } 
        catch (error) {
            console.error('Error in agreement request:', error);
            openNotification('error', 'Error in Agreement', 'An error occurred while attempting the agreement.');
        } 
        finally {
            setLoading(false);
        }
    };

    // Modal display
    return (
        <>
            {contextHolder}
            <Modal open={isVerifyModalOpen} onCancel={handleVerifyCancel}
                footer={[
                    <div key="footer" style={{ display: 'flex', justifyContent: 'space-evenly', padding: 10 }}>
                        <Button style={{ width: '30%' }} key="verify" type="primary" icon={<SendOutlined />} iconPosition='end' loading={loading} onClick={handleVerify}>
                            Verify
                        </Button>
                        <Button style={{ width: '30%' }} key="cancel" onClick={handleVerifyCancel}>
                            Cancel
                        </Button>
                    </div>
                ]}>
                <h2> Verify contract</h2>
                <Form layout="vertical">
                    <Form.Item label="Are you sure do you want to verify this agreement?">
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
};

export default VerifyModal;
