import React, { useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import axios from 'axios';
import config from '../../config';
import Notification from '../notifications';

const OfferModal = ({ isModalOpen, handleOk, handleCancel }) => {
    const [consumerAddr, setconsumerAddr] = useState('');
    const [offerId, setOfferId] = useState('');
    const [loading, setLoading] = useState(false);
    const { openNotification, contextHolder } = Notification();

    const handleconsumerAddrChange = (e) => {
        setconsumerAddr(e.target.value);
    };
    const handleOfferIdChange = (e) => {
        setOfferId(e.target.value);
    };

    const handleOffer = async () => {
        setLoading(true);
        const requestData = {
            consumerAddr: consumerAddr.trim(),
            offerId: offerId.trim(),
        };
        try {
            await axios.post(`${config.providerEndpoint}/api/gateway/offer-contract`, requestData);
            openNotification('success', 'Offer sent', 'Offer sent succesfully');
            handleOk();
        } catch (error) {
            console.error('Error sending the offer:', error);
            openNotification('error', 'Error', 'The offer could not be send.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {contextHolder}
            <Modal width={1000} open={isModalOpen} onOk={handleOffer} onCancel={handleCancel}
                footer={[
                    <div key="footer" style={{ display: 'flex', justifyContent: 'space-evenly', padding: 10 }}>
                        <Button style={{ width: '20%' }} key="offer" type="primary" size="large" disabled={!offerId} icon={<SendOutlined />} onClick={handleOffer} loading={loading}>
                            Send Offer
                        </Button>
                        <Button style={{ width: '20%' }} key="cancel" type="primary" size="large" onClick={handleCancel}>
                            Cancel
                        </Button>
                    </div>,
                ]}>
                <Form labelCol={{ span: 9 }} wrapperCol={{ span: 24 }} layout="vertical">
                    <h2>Offer a contract</h2>
                    <Form.Item label="Consumer's Address:" required>
                        <Input value={consumerAddr} onChange={handleconsumerAddrChange} />
                    </Form.Item>
                    <Form.Item label="Offer Id:" required>
                        <Input value={offerId} onChange={handleOfferIdChange} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default OfferModal;
