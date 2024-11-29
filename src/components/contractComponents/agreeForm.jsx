import React, { useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import Notification from '../notifications';
import { SendOutlined } from '@ant-design/icons';
import axios from 'axios';
import config from '../../config';

const AgreeModal = ({ isAgreeModalOpen, handleAgreeOk, handleAgreeCancel, negotiationId }) => {
    const [offerId, setOfferId] = useState('');
    const [loading, setLoading] = useState(false);
    const { openNotification, contextHolder } = Notification();

    const handleOfferIdChange = (e) => {
        setOfferId(e.target.value);
    };

    // Main function to agree a contract/offer by sending a request
    const handleAgree = async () => {
        setLoading(true);
        try {

            // Sends the request
            const response = await axios.post(`${config.url}${config.provider}${config.gatewayPath}/agree-contract`, {
                offerId: offerId,
                ContractNegotiationId: negotiationId,
            });
            if (response.status === 200) {
                const contractAgreementId = response.data.contractAgreementId;
                openNotification('success', 'Agreement Successful', `Contract agreement ID: ${contractAgreementId}`);
                handleAgreeOk();
            } else {
                openNotification('error', 'Unexpected Response', 'An unexpected response was received.');
            }
        }
        catch (error) {
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
            <Modal open={isAgreeModalOpen} onCancel={handleAgreeCancel}
                footer={[
                    <div key="footer" style={{ display: 'flex', justifyContent: 'space-evenly', padding: 10 }}>
                        <Button style={{ width: '30%' }} key="agree" type="primary" icon={<SendOutlined />} iconPosition='end' loading={loading} disabled={!offerId} onClick={handleAgree}>
                            Agree
                        </Button>
                        <Button style={{ width: '30%' }} key="cancel" onClick={handleAgreeCancel}>
                            Cancel
                        </Button>
                    </div>
                ]}
            >
                <h2>Agree offer</h2>
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
