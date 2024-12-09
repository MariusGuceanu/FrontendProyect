import React, { useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import axios from 'axios';
import { negotiationEndpoints } from '../endpoints';
import Notification from '../notifications';

const OfferModal = ({ isModalOpen, handleOk, handleCancel }) => {
    const [consumerAddr, setconsumerAddr] = useState('');
    const [offerId, setOfferId] = useState('');
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const { openNotification, contextHolder } = Notification();

    // Input data managment
    const handleconsumerAddrChange = (e) => {
        setconsumerAddr(e.target.value);
    };
    const handleOfferIdChange = (e) => {
        setOfferId(e.target.value);
    };

    // Main function to request an offer for a contract by sending a request
    const handleOffer = async () => {
        setLoading(true);
        try {
            // Sends the request
            await axios.post(`${negotiationEndpoints.offerEndpoint}`, {
                offerId: offerId.trim(),
                consumerEndpoint: consumerAddr.trim(),
            });
            openNotification('success', 'Offer sent', 'Offer sent succesfully');
            // Resets the input fields to leave them blank
            form.resetFields();
            setconsumerAddr('');
            setOfferId('');
            handleOk();
        }
        catch (error) {
            openNotification('error', 'Error', 'The offer could not be send.');
        }
        finally {
            setLoading(false);
        }
    };

    // Modal display
    return (
        <>
            {contextHolder}
            <Modal width={1000} open={isModalOpen} onOk={handleOffer} onCancel={handleCancel}
                footer={[
                    <div key="footer" style={{ display: 'flex', justifyContent: 'space-evenly', padding: 10 }}>
                        <Button style={{ width: '20%' }} key="offer" type="primary" size="large" disabled={!offerId} icon={<SendOutlined />} iconPosition='end' onClick={handleOffer} loading={loading}>
                            Send Offer
                        </Button>
                        <Button style={{ width: '20%' }} key="cancel" type="primary" size="large" onClick={handleCancel}>
                            Cancel
                        </Button>
                    </div>,
                ]}>
                <h2>Offer a contract</h2>
                <Form form={form} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} style={{ marginLeft: '-5%', margin: '5% 4% 2% 3%' }} layout='horizontal'>
                    <Form.Item style={{ paddingBottom: '1.5%' }} label="Consumer's Address:" required>
                        <Input value={consumerAddr} onChange={handleconsumerAddrChange} style={{ width: '64%' }} />
                    </Form.Item>
                    <Form.Item style={{ paddingBottom: '1.5%' }} label="Offer Id:" required>
                        <Input value={offerId} onChange={handleOfferIdChange} style={{ width: '64%' }} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default OfferModal;
