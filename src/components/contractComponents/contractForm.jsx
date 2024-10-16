import React, {useState} from 'react';
import { Modal, Form, Input, Button, Divider, Select } from 'antd';
import { SendOutlined } from '@ant-design/icons';

const RequestModal = ({ isModalOpen, handleOk, handleCancel }) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }

    const selectBefore = (
        <Select defaultValue="http://">
            <Option value="http://">http://</Option>
            <Option value="https://">https://</Option>
        </Select>
    );

    return (
        <Modal width={1000} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
            footer={[
                <div key="footer" style={{ display: 'flex', justifyContent: 'space-evenly', padding: 10 }}>
                    <Button style={{ width: '20%' }} key="request" type="primary" size="large" icon={<SendOutlined />} iconPosition='end' onClick={handleOk}>
                        Request
                    </Button>
                    <Button style={{ width: '20%' }} key="cancel" type="primary" size="large" onClick={handleCancel}>
                        Cancel
                    </Button>
                </div>
            ]}
        >
            <h2>Contract Form</h2>
            <Form className='formRequest' name='requestEndPoint' labelCol={{ span: 9 }} wrapperCol={{ span: 24 }} style={{ maxWidth: 800 }} initialValues={{ remember: true }}>
                <Form.Item
                    label="Provider's Endpoint : "
                    name="ProvidersEp"
                    rules={[{ required: true, message: 'Insert your URL endpoint' }]}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Input addonBefore={selectBefore} value={inputValue} onChange={handleInputChange} />
                        <Button type="primary" disabled={!inputValue} style={{ marginLeft: '10px' }}>Self-Description</Button>
                    </div>
                </Form.Item>
                <Divider style={{ borderColor: '#1e4792' }} />
                <div style={{ width: '35%', margin: 'auto', textAlign: 'center' }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Minus, quam expedita ipsam quibusdam dignissimos aperiam accusamus architecto! Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt eligendi beatae laboriosam fugiat laborum culpa officia sequi atque, ex minima officiis. Dolorum vero ipsam atque perferendis minus voluptatem odit? Itaque! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur hic aliquid culpa optio cupiditate nisi unde eaque, recusandae rem amet, ab maxime ipsam? Sit nostrum, quidem ducimus quas beatae eaque!
                </div>
                <Divider style={{ borderColor: '#1e4792' }} />
                <Form.Item label="Offer ID :" name="OfferId" rules={[{ required: true, message: 'Provide a valid UUID' }]}>
                    <Input style={{ width: '80%' }} />
                </Form.Item>
            </Form>
        </Modal>
    );
};


export default RequestModal;