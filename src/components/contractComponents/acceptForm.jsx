import React, { useState } from 'react';
import { Modal, Form, Button } from 'antd';
import Notification from '../notifications';
import { SendOutlined } from '@ant-design/icons';
import axios from 'axios';
import config from '../../config';

const AcceptModal = ({ isAcceptModalOpen, handleAcceptOk, handleAcceptCancel, consumerPid }) => {
    const [loading, setLoading] = useState(false);
    const { openNotification, contextHolder } = Notification();

    // Main function to accept the offer by sending a request
    const handleAccept = async () => {
        setLoading(true);
        try {
            // Sends the request
            const response = await axios.post(`${config.url}${config.consumer}${config.gatewayPath}/accept-offer/${encodeURIComponent(consumerPid)}`, {
                consumerPid: consumerPid,
            });

            if (response.status === 200) {
                openNotification('success', 'Accepted', 'Contract offer is accepted');
                handleAcceptOk();
            } else {
                openNotification('error', 'Unexpected Response', 'An unexpected response was received.');
            }
        }
        catch (error) {
            openNotification('error', 'Error accepting', 'An error occurred while attempting to accept.');
        }
        finally {
            setLoading(false);
        }
    };

    // Modal display
    return (
        <>
            {contextHolder}
            <Modal open={isAcceptModalOpen} onCancel={handleAcceptCancel}
                footer={[
                    <div key="footer" style={{ display: 'flex', justifyContent: 'space-evenly', padding: 10 }}>
                        <Button style={{ width: '30%' }} key="accept" type="primary" icon={<SendOutlined />} iconPosition='end' loading={loading} onClick={handleAccept}>
                            Accept offer
                        </Button>
                        <Button style={{ width: '30%' }} key="cancel" onClick={handleAcceptCancel}>
                            Cancel
                        </Button>
                    </div>
                ]}
            >
                <h2> Accept offer</h2>
                <Form layout="vertical">
                    <Form.Item label="Are you sure do you want to accept this offer?">
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
};

export default AcceptModal;
