import React, { useState } from 'react';
import { Modal, Form, Button } from 'antd';
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
            <Modal title="Complete a Data-Plane Transfer" open={isCompleteModalOpen} onCancel={handleCompleteCancel}
                footer={[
                    <Button key="agree" type="primary" icon={<SendOutlined />} loading={loading} onClick={handleComplete}>
                        Complete
                    </Button>,
                    <Button key="cancel" onClick={handleCompleteCancel}>
                        Cancel
                    </Button>
                ]}
            >
                <Form layout="vertical">
                    <Form.Item label="Are you sure you want to Complete this transfer?" required>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default ConsumerCompleteModal;
