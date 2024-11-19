import React, { useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import Notification from '../notifications';
import { SendOutlined } from '@ant-design/icons';
import axios from 'axios';
import ContractNegotiations from '../../pages/contractNegotiations';
import config from '../../config';

const AcceptModal = ({ isAcceptModalOpen, handleAcceptOk, handleAcceptCancel, consumerPid }) => {
    const [loading, setLoading] = useState(false);
    const { openNotification, contextHolder } = Notification();

    const handleAccept = async () => {
        setLoading(true);
        try {
            const response = await axios.post(`${config.consumerEndpoint}/api/gateway/accept-offer/${encodeURIComponent(consumerPid)}`, {
                consumerPid: consumerPid,
            });

            if (response.status === 200) {
                console.log('Offer accepted succesfully', response.data);
                openNotification('success', 'Accepted', 'Contract offer is accepted');
                handleAcceptOk();
            } else {
                console.error('Unexpected response:', response);
                openNotification('error', 'Unexpected Response', 'An unexpected response was received.');
            }
        } catch (error) {
            console.error('Error in agreement request:', error);
            openNotification('error', 'Error accepting', 'An error occurred while attempting to accept.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {contextHolder}
            <Modal title="Accept offer" open={isAcceptModalOpen} onCancel={handleAcceptCancel}
                footer={[
                    <div key="footer" style={{ display: 'flex', justifyContent: 'space-evenly', padding: 10 }}>
                        <Button style={{ width: '30%' }} key="accept" type="primary" icon={<SendOutlined />} iconPosition='end'  loading={loading} onClick={handleAccept}>
                            Accept offer
                        </Button>
                        <Button style={{ width: '30%' }} key="cancel" onClick={handleAcceptCancel}>
                            Cancel
                        </Button>
                    </div>
                ]}
            >
                <Form layout="vertical">
                    <Form.Item label="Are you sure do you want to accept this offer?">
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
};

export default AcceptModal;
