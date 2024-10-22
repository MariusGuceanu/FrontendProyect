import React, { useState } from 'react';
import { Modal, Form, Input, Button, Divider, Select } from 'antd';
import { SendOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';

const RequestModal = ({ isModalOpen, handleOk, handleCancel }) => {
    const [inputValue, setInputValue] = useState('');
    const [offerId, setOfferId] = useState('');
    const [constraints, setConstraints] = useState([{ name: '', value: '' }]);

    // Input data managment
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }
    const handleOfferIdChange = (e) => {
        setOfferId(e.target.value);
    };
    const addConstraint = () => {
        setConstraints([...constraints, { name: '', value: '' }])
    }
    const handleConstraints = (index, field, value) => {
        const newConstraints = [...constraints];
        newConstraints[index][field] = value;
        setConstraints(newConstraints);
    }

    // main function to make request and receive responses
    const handleRequest = async () => {
        const requestData = {
            offerId: offerId,
            providerEndpoint: inputValue.trim(),
            constraints: constraints.reduce((acc, curr) => {
                if (curr.name && curr.value) {
                    acc[curr.name] = curr.value;
                }
                return acc;
            }, {}),
        };
        console.log('Request Data:', requestData);
        // Errors managment
        try {
            const response = await axios.post('http://localhost:9081/gateway/request-contract', requestData);
            if (response.status === 200) {
                console.log('Response:', response.data);
                handleOk();
            } else {
                console.error('Unexpected response status:', response.status);
            }
        } catch (error) {
            if (error.response) {
                const { status, data } = error.response;
                switch (status) {
                    case 400:
                        alert(`Error 400: ${data.message} (Code: ${data.code})`);
                        console.error('Detailed error:', data);
                        break;
                    case 500:
                        alert(`Error 500: ${data.message} (Code: ${data.code})`);
                        if (data.params && data.params.response) {
                            console.error('Server response:', data.params.response);
                        }
                        break;
                    default:
                        alert(`Error ${status}: ${error.message}`);
                        break;
                }
            } else {
                alert(`Error: ${error.message}`);
            }
        }
    }
    // Modal display 
    return (
        <Modal destroyOnClose={true} width={1000} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
            footer={[
                <div key="footer" style={{ display: 'flex', justifyContent: 'space-evenly', padding: 10 }}>
                    <Button style={{ width: '20%' }} key="request" type="primary" size="large" icon={<SendOutlined />} iconPosition='end' onClick={handleRequest}>
                        Request
                    </Button>
                    <Button style={{ width: '20%' }} key="cancel" type="primary" size="large" onClick={handleCancel}>
                        Cancel
                    </Button>
                </div>
            ]}
        >
            <h2>Contract Form</h2>
            <Form className='formRequest' preserve={false} name='requestEndPoint' labelCol={{ span: 9 }} wrapperCol={{ span: 24 }} style={{ maxWidth: 800 }} initialValues={{ remember: true }}>
                <Form.Item
                    label="Provider's Endpoint : "
                    name="ProvidersEp"
                    rules={[{ required: true, message: 'Insert your URL endpoint' }]}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Input value={inputValue} onChange={handleInputChange} />
                        <Button type="primary" disabled={!inputValue} style={{ marginLeft: '10px' }}>Self-Description</Button>
                    </div>
                </Form.Item>
                <Divider style={{ borderColor: '#1e4792' }} />
                <div style={{ width: '35%', margin: 'auto', textAlign: 'center' }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Minus, quam expedita ipsam quibusdam dignissimos aperiam accusamus architecto! Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt eligendi beatae laboriosam fugiat laborum culpa officia sequi atque, ex minima officiis. Dolorum vero ipsam atque perferendis minus
                </div>
                <Divider style={{ borderColor: '#1e4792' }} />
                {constraints.map((constraint, index) => (
                    <div key={index} style={{ marginLeft: '13%', display: 'flex', justifyContent: 'center', marginBottom: '1%' }}>
                        <Form.Item
                            label={`Constraint Name:  `}
                            rules={[{ required: true, message: 'Please input a constraint name!' }]}
                        >
                            <Input
                                style={{ width: '100%' }}
                                value={constraint.name}
                                onChange={(e) => handleConstraints(index, 'name', e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item
                            label={`Value:  `}
                            rules={[{ required: true, message: 'Please input a value!' }]}
                        >
                            <Input
                                style={{ width: '100%' }}
                                value={constraint.value}
                                onChange={(e) => handleConstraints(index, 'value', e.target.value)}
                            />
                        </Form.Item>
                    </div>
                ))}
                <Button type="dashed" onClick={addConstraint} icon={<PlusOutlined />} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2%' }}>
                    Add Constraint
                </Button>
                <Form.Item label="Offer ID :" name="OfferId" rules={[{ required: true, message: 'Provide a valid UUID' }]}>
                    <Input style={{ width: '80%' }} value={offerId} onChange={handleOfferIdChange} />
                </Form.Item>
            </Form>
        </Modal>
    );
};


export default RequestModal;