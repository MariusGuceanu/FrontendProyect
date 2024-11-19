import React, { useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import Notification from '../notifications';
import { SendOutlined } from '@ant-design/icons';
import axios from 'axios';
import ContractNegotiations from '../../pages/contractNegotiations';
import config from '../../config';

const AgreeModal = ({ isAgreeModalOpen, handleAgreeOk, handleAgreeCancel, negotiationId }) => {
    const [offerId, setOfferId] = useState('');
    const [loading, setLoading] = useState(false);
    const { openNotification, contextHolder } = Notification();

    const handleOfferIdChange = (e) => {
        setOfferId(e.target.value);
    };

    const handleAgree = async () => {
        setLoading(true);
        console.log('Process ID:', negotiationId);
        console.log('Offer ID:', offerId);

        try {
            const response = await axios.post(`${config.providerEndpoint}/api/gateway/agree-contract`, {
                offerId: offerId,
                ContractNegotiationId: negotiationId,
            });

            if (response.status === 200) {
                console.log('Agreement successful:', response.data);
                openNotification('success', 'Agreement Successful', 'Contract agreement completed successfully');
                handleAgreeOk();
            } else {
                console.error('Unexpected response:', response);
                openNotification('error', 'Unexpected Response', 'An unexpected response was received.');
            }
        } catch (error) {
            console.error('Error in agreement request:', error);
            openNotification('error', 'Error in Agreement', 'An error occurred while attempting the agreement.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {contextHolder}
            <Modal title="Agree on Contract" open={isAgreeModalOpen} onCancel={handleAgreeCancel}
                footer={[
                    <div key="footer" style={{ display: 'flex', justifyContent: 'space-evenly', padding: 10 }}>
                        <Button style={{ width: '30%' }} key="agree" type="primary" icon={<SendOutlined />} iconPosition='end'  loading={loading} disabled={!offerId} onClick={handleAgree}>
                            Agree
                        </Button>
                        <Button style={{ width: '30%' }} key="cancel" onClick={handleAgreeCancel}>
                            Cancel
                        </Button>
                    </div>
                ]}
            >
                <Form layout="vertical">
                    <Form.Item label="Offer ID:" required>
                        <Input placeholder="Enter Offer ID" value={offerId} onChange={handleOfferIdChange} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default AgreeModal;
