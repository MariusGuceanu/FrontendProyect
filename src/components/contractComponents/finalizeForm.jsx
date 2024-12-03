import React, { useState } from 'react';
import { Modal, Form, Button } from 'antd';
import Notification from '../notifications';
import { SendOutlined } from '@ant-design/icons';
import axios from 'axios';
import config from '../../config';

const FinalizeModal = ({ isFinalizeModalOpen, handleFinalizeOk, handleFinalizeCancel, negotiationId }) => {
    const [loading, setLoading] = useState(false);
    const { openNotification, contextHolder } = Notification();

    // Main function to finalize a contract by sending a request
    const handleFinalize = async () => {
        setLoading(true);
        try {
            // Sends the request
            const response = await axios.post(`${config.url}${config.provider}${config.gatewayNegotiationsPath}/${encodeURIComponent(negotiationId)}/finalization`, {
            });
            if (response.status === 200) {
                openNotification('success', 'Contract finalized', 'Contract is finalized');
                handleFinalizeOk();
            } else {
                openNotification('error', 'Unexpected Response', 'An unexpected response was received.');
            }
        } 
        catch (error) {
            openNotification('error', 'Error while finalizing', 'An error occurred while attempting to finalize.');
        } 
        finally {
            setLoading(false);
        }
    };

    // Modal display
    return (
        <>
            {contextHolder}
            <Modal open={isFinalizeModalOpen} onCancel={handleFinalizeCancel}
                footer={[
                    <div key="footer" style={{ display: 'flex', justifyContent: 'space-evenly', padding: 10 }}>
                        <Button style={{ width: '30%' }} key="finalize" type="primary" icon={<SendOutlined />} iconPosition='end'  loading={loading} onClick={handleFinalize}>
                            Finalize
                        </Button>
                        <Button style={{ width: '30%' }} key="cancel" onClick={handleFinalizeCancel}>
                            Cancel
                        </Button>
                    </div>
                ]}
            >
                <h2>Finalize contract</h2>
                <Form layout="vertical">
                    <Form.Item label="Are you sure do you want to Finalize this contract?">
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default FinalizeModal;
