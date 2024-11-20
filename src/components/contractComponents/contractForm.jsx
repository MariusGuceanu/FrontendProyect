import React, { useState } from 'react';
import { Modal, Form, Input, Button, Divider } from 'antd';
import { SendOutlined, PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import Notification from '../notifications';
import config from '../../config';
import axios from 'axios';

const RequestModal = ({ isModalOpen, handleOk, handleCancel }) => {
    // Self-description states
    const [inputValue, setInputValue] = useState('');
    const [form] = Form.useForm();
    const [selfDescription, setSelfDescription] = useState(null);
    const [loading, setLoading] = useState(false);

    // General states
    const [offerId, setOfferId] = useState('');
    const [constraints, setConstraints] = useState([{ name: '', value: '' }]);
    const { openNotification, contextHolder } = Notification();

    // Input data managment
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }
    const handleOfferIdChange = (e) => {
        setOfferId(e.target.value);
    };

    // Add, remove and handle constraints
    const addConstraint = () => {
        setConstraints([...constraints, { name: '', value: '' }])
    }
    const removeConstraint = (index) => {
        const newConstraints = constraints.filter((_, i) => i !== index);
        setConstraints(newConstraints);
    }
    const handleConstraints = (index, field, value) => {
        const newConstraints = [...constraints];
        newConstraints[index][field] = value;
        setConstraints(newConstraints);
    }

    // Get Self description function
    const getSelfDescription = async () => {
        setLoading(true)
        try {
            const response = await axios.get(inputValue.trim());
            setSelfDescription(response.data);
        } catch (error) {
            openNotification('error', 'Error getting Self-description', 'Could not retrieve self-description from provider.');
        } finally {
            setLoading(false)
        }
    };

    // Main function to make the contract negotiation requests and receive responses
    const handleRequest = async (openNotification) => {
        // Data from the form
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
        try {
            const response = await axios.post(`${config.consumerEndpoint}/api/gateway/request-contract`, requestData);
            if (response.status === 200) {
                openNotification('success', 'Request Successful', `Contract Negotiation ID: ${response.data.contractNegotiationId}`);
                // Resets the input fields to leave them blank
                form.resetFields();
                setInputValue('');
                setOfferId('');
                setConstraints([{ name: '', value: '' }]);
                handleOk();
            } else {
            }
            // Error management
        } catch (error) {
            if (error.response) {
                const { status, data } = error.response;
                if (status === 400) {
                    openNotification('error', 'Error 400', data.message);
                } else if (status === 500) {
                    openNotification('error', 'Error 500', data.message);
                } else {
                    openNotification('error', 'Error', 'Unexpected error occurred');
                }
            } else {
                openNotification('error', 'Error', error.message);
            }
        }
    };
    // Modal display 
    return (
        <>
            {contextHolder}
            {/* Modal logic */}
            <Modal destroyOnClose={true} width={1000} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
                footer={[
                    <div key="footer" style={{ display: 'flex', justifyContent: 'space-evenly', padding: 10 }}>
                        <Button style={{ width: '20%' }} disabled={!inputValue || !offerId} key="request" type="primary" size="large" icon={<SendOutlined />} iconPosition='end' onClick={() => handleRequest(openNotification)}>
                            Request
                        </Button>
                        <Button style={{ width: '20%' }} key="cancel" type="primary" size="large" onClick={handleCancel}>
                            Cancel
                        </Button>
                    </div>
                ]}>
                <h2>Request a contract</h2>
                {/* Modal content display */}
                <Form form={form} className='formRequest' preserve={false} autoComplete='off' name='requestEndPoint' labelCol={{ span: 9 }} wrapperCol={{ span: 24 }} style={{ maxWidth: 800, marginLeft: '5%' }}>
                    <Form.Item style={{ marginLeft: '-2%', marginTop: '4%' }} label="Provider's Endpoint : " name="ProvidersEp" rules={[{ required: true, message: 'Insert your URL endpoint' }]}>
                        <div style={{ display: 'flex', }}>
                            <Input value={inputValue} onChange={handleInputChange} />
                            <Button type="primary" disabled={!inputValue} style={{ marginLeft: '3%' }}
                                onClick={getSelfDescription} loading={loading}>Self-Description</Button>
                        </div>
                    </Form.Item>

                    <div style={{ width: '70%', margin: 'auto', textAlign: 'center', overflow: 'auto', maxHeight: '300px' }}>
                        <Divider style={{ borderColor: '#1e4792', marginTop: '2%' }} />
                        {selfDescription ? (
                            <pre>
                                <div style={{ width: '100%', textAlign: 'start' }}>
                                    {JSON.stringify(selfDescription, null, 2)} {/* Endpoint's self-description */}
                                </div>
                            </pre>
                        ) : (
                            'Click "Self-Description" to view provider information.'
                        )}
                        <Divider style={{ borderColor: '#1e4792', marginBottom: '6%' }} />
                    </div>

                    {constraints.map((constraint, index) => (
                        <div key={index} style={{ marginLeft: '14%', display: 'flex', justifyContent: 'center', marginBottom: '1.5%' }}>
                            <Form.Item label={`Constraint Name:  `} rules={[{ required: true, message: 'Please input a constraint name' }]}>
                                <Input style={{ width: '100%', marginLeft: '2%' }} value={constraint.name} onChange={(e) => handleConstraints(index, 'name', e.target.value)} />
                            </Form.Item>
                            <Form.Item label={`Value:  `} rules={[{ required: true, message: 'Please input a value' }]}>
                                <Input style={{ width: '100%', marginLeft: '2%' }} value={constraint.value} onChange={(e) => handleConstraints(index, 'value', e.target.value)} />
                            </Form.Item>
                            <Button type="danger" icon={<MinusCircleOutlined />} onClick={() => removeConstraint(index)} style={{ marginLeft: '10px' }}>
                            </Button>
                        </div>
                    ))}
                    <Button type="dashed" onClick={addConstraint} icon={<PlusOutlined />} style={{ display: 'flex', marginBottom: '5%', marginLeft: '15%', width: '73%' }}>
                        Add Constraint
                    </Button>
                    <Form.Item label="Offer ID :" name="OfferId" style={{ marginLeft: '-3%' }} rules={[{ required: true, message: 'Provide a valid UUID' }]}>
                        <Input style={{ width: '82%' }} value={offerId} onChange={handleOfferIdChange} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};


export default RequestModal;