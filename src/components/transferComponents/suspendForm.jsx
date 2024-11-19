import React, { useState } from 'react';
import { Modal, Form, Button, Input } from 'antd';
import { SendOutlined, PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import Notification from '../notifications';
import config from '../../config';
const SuspendModal = ({ isSuspendModalOpen, handleSuspendOk, handleSuspendCancel, transferProcessId, provider }) => {
    const [loading, setLoading] = useState(false);
    const [code, setCode] = useState('');
    const [constraints, setConstraints] = useState([{ name: '', value: '' }]);
    const { openNotification, contextHolder } = Notification();

    const addConstraint = () => {
        setConstraints([...constraints, { name: '', value: '' }]);
    };
    const removeConstraint = (index) => {
        const newConstraints = constraints.filter((_, i) => i !== index);
        setConstraints(newConstraints);
    };
    const handleConstraints = (index, field, value) => {
        const newConstraints = [...constraints];
        newConstraints[index][field] = value;
        setConstraints(newConstraints);
    };

    const handleSuspend = async () => {
        setLoading(true);

        try {
            const providerEndpoint = provider ? config.providerEndpoint : config.consumerEndpoint;
            const reasons = constraints
                .filter((constraint) => constraint.name && constraint.value)
                .map((constraint) => constraint.value);

            const response = await axios.post(`${providerEndpoint}/api/gateway/transfer/suspend`, {
                provider: Boolean(provider),
                transferProcessId: transferProcessId,
                code: code || undefined,
                reasons: reasons.length > 0 ? reasons : undefined,
            });

            if (response.status === 200) {
                console.log('Suspend successful:', response.data);
                openNotification('success', 'Suspended', 'Transfer suspended successfully');
                handleSuspendOk();
            } else {
                console.error('Unexpected response:', response);
                openNotification('error', 'Unexpected Response', 'An unexpected response was received.');
            }
        } catch (error) {
            console.error('Error in suspend request:', error);
            openNotification('error', 'Error trying to Suspend', 'An error occurred while attempting to suspend.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {contextHolder}
            <Modal width={800} open={isSuspendModalOpen} onCancel={handleSuspendCancel}
                footer={[
                    <div key="footer" style={{ display: 'flex', justifyContent: 'space-evenly', padding: 10 }}>
                        <Button style={{ width: '30%' }} key="suspend" size='large' type="primary" icon={<SendOutlined />} iconPosition='end'  loading={loading} onClick={handleSuspend}> Suspend Transfer
                        </Button>,
                        <Button style={{ width: '30%' }} key="cancel" size='large' onClick={handleSuspendCancel}>
                            Cancel
                        </Button>
                    </div>
                ]}>
                <h2>Suspend a Data-Plane Transfer</h2>
                <Form layout="vertical">
                    <Form.Item label="Code (optional)">
                        <Input placeholder="Enter suspension code" value={code} onChange={(e) => setCode(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item label="Reasons (optional)">
                        {constraints.map((constraint, index) => (
                            <div key={index} style={{ display: 'flex', marginBottom: 8 }}>
                                <Input style={{ flex: 1, marginTop: 8, marginRight: 8 }} placeholder="Enter reason" value={constraint.value} onChange={(e) => handleConstraints(index, 'value', e.target.value)}
                                />
                                {constraints.length > 1 && (
                                    <MinusCircleOutlined type="danger" style={{ color: 'red', marginTop: 4 }} onClick={() => removeConstraint(index)} />
                                )}
                            </div>
                        ))}
                        <Button style={{ width: '100%', marginTop: '2%' }} type="dashed" onClick={addConstraint} icon={<PlusOutlined />}>                  Add Reason
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default SuspendModal;

