import React, { useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import axios from 'axios';
import config from '../../config';
import Notification from '../notifications';

const RequestTransferModal = ({ isRequestTransferModalOpen, handleRequestTransferOk, handleRequestTransferCancel }) => {
    const { openNotification, contextHolder } = Notification();
    const [loading, setLoading] = useState(false);

    const handleRequestTransfer = async () => {

    }
    return (
        <>
            {contextHolder}
            <Modal width={1000} open={isRequestTransferModalOpen} onOk={handleRequestTransferOk} onCancel={handleRequestTransferCancel}
                footer={[
                    <div key="footer" style={{ display: 'flex', justifyContent: 'space-evenly', padding: 10 }}>
                        <Button style={{ width: '20%' }} key="offer" type="primary" size="large" icon={<SendOutlined />} onClick={handleRequestTransfer} loading={loading}>
                            Send Offer
                        </Button>
                        <Button style={{ width: '20%' }} key="cancel" type="primary" size="large" onClick={handleRequestTransferCancel}>
                            Cancel
                        </Button>
                    </div>,
                ]}>
                <Form labelCol={{ span: 9 }} wrapperCol={{ span: 24 }} layout="vertical">
                    <h2>Offer a contract</h2>
                    <Form.Item label="Consumer's Address:" required>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Offer Id:" required>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default RequestTransferModal;