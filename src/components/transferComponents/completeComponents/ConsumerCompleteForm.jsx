import React, { useState } from 'react';
import { Modal, Form, Button, Divider } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import axios from 'axios';
import Notification from '../../notifications';
import config from '../../../config';

const ConsumerCompleteModal = ({ isCompleteModalOpen, handleCompleteOk, handleCompleteCancel, transferProcessId }) => {
    const [loading, setLoading] = useState(false);
    const { openNotification, contextHolder } = Notification();

    const handleComplete = async () => {
        setLoading(true);

        try {
            const response = await axios.post(`${config.consumerEndpoint}/api/gateway/transfer/complete`, {
                provider: false,
                transferProcessId: transferProcessId,
            });

            if (response.status === 200) {
                console.log('Transfer complete successful:', response.data);
                openNotification('success', 'Completed', 'Transfer completed successfully');
                handleCompleteOk();
            } else {
                console.error('Unexpected response:', response);
                openNotification('error', 'Unexpected Response', 'An unexpected response was received.');
            }
        } catch (error) {
            console.error('Error trying to complete request:', error);
            openNotification('error', 'Error trying to Complete', 'An error occurred while attempting to complete.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {contextHolder}
            <Modal open={isCompleteModalOpen} onCancel={handleCompleteCancel}
                footer={[
                    <div key="footer" style={{ display: 'flex', justifyContent: 'space-evenly', padding: 10 }}>
                        <Button style={{width:'30%'}} key="agree" size='large' type="primary" icon={<SendOutlined />} iconPosition='end'  loading={loading} onClick={handleComplete}>
                            Complete
                        </Button>
                        <Button style={{width:'30%'}} key="cancel" size='large' onClick={handleCompleteCancel}>
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

export default ConsumerCompleteModal;
