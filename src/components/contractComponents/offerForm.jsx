import React, { useState } from 'react';
import { Modal, Form, Input, Button, Select } from 'antd';
import { SendOutlined } from '@ant-design/icons';

const OfferModal = ( {isModalOpen, handleOk, handleCancel}) => {

    const selectBefore = (
        <Select defaultValue="http://">
            <Select.Option value="http://">http://</Select.Option>
            <Select.Option value="https://">https://</Select.Option>
        </Select>
    );

    // Modal display
    return (
        <Modal width={1000} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
            footer={[
                <div key="footer" style={{ display: 'flex', justifyContent: 'space-evenly', padding: 10 }}>
                    <Button style={{ width: '20%' }} key="offer" type="primary" size="large" icon={<SendOutlined />} iconPosition='end' onClick={handleOk}>
                        Send Offer
                    </Button>
                    <Button style={{ width: '20%' }} key="cancel" type="primary" size="large" onClick={handleCancel}>
                        Cancel
                    </Button>
                </div>
            ]}
        >
            <Form labelCol={{ span: 9 }} wrapperCol={{ span: 24 }} style={{ maxWidth: 800 }}>
                <h2>Offer Form</h2>
                <Form.Item label="Consumer's Endpoint :" name="ConsumersEp" rules={[{ required: true, message: 'Provide a valid UUID' }]}>
                    <Input addonBefore={selectBefore} style={{ width: '80%' }} />
                </Form.Item>
                <Form.Item label="Offer ID :" name="OfferId" rules={[{ required: true, message: 'Provide a valid UUID' }]}>
                    <Input style={{ width: '80%' }} />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default OfferModal;