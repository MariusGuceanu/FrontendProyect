import React, { useState } from 'react';
import { Modal, Form, Button, Input } from 'antd';
import { SendOutlined, PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import Notification from '../notifications';
import config from '../../config';

const TerminateTransferModal = ({ isTerminateTModalOpen, handleTerminateTOk, handleTerminateTCancel, transferProcessId, provider, endpoint }) => {
    const [loading, setLoading] = useState(false);
    const [code, setCode] = useState('');
    const [constraints, setConstraints] = useState([{ name: '', value: '' }]);
    const { openNotification, contextHolder } = Notification();

    // Add, remove and handle constraints functions
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

    // Main function to terminate a transfer process
    const handleTerminateT = async () => {
        setLoading(true);
        try {
            const reasons = constraints
                .filter((constraint) => constraint.name && constraint.value)
                .map((constraint) => constraint.value);

            // Const to distinct between provider and consumer
            const validProvider = provider === 'true';

            // Sends the request
            const response = await axios.post(`${config.url}${endpoint}${config.gatewayPath}/transfer/terminate`, {
                provider: validProvider,
                transferProcessId: transferProcessId,
                code: code || undefined,
                reasons: reasons.length > 0 ? reasons : undefined,
            });

            if (response.status === 200) {
                openNotification('success', 'Terminated', 'Transfer terminated successfully');
                handleTerminateTOk();
            } else {
                openNotification('error', 'Unexpected Response', 'An unexpected response was received.');
            }
        }
        catch (error) {
            openNotification('error', 'Error trying to Terminate', 'An error occurred while attempting to terminate.');
        }
        finally {
            setLoading(false);
        }
    };

    // Modal display
    return (
        <>
            {contextHolder}
            <Modal width={800} open={isTerminateTModalOpen} onCancel={handleTerminateTCancel}
                footer={[
                    <div key="footer" style={{ display: 'flex', justifyContent: 'space-evenly', padding: 10 }}>
                        <Button style={{ width: '30%' }} key="terminate" size='large' type="primary" icon={<SendOutlined />} iconPosition='end' loading={loading} onClick={handleTerminateT}> Terminate Transfer
                        </Button>
                        <Button style={{ width: '30%' }} key="cancel" size='large' onClick={handleTerminateTCancel}>
                            Cancel
                        </Button>
                    </div>
                ]}>
                <h2>Terminate a Data-Plane Transfer</h2>
                <Form layout="vertical">
                    <Form.Item label="Code (optional)">
                        <Input placeholder="Enter termination code" value={code} onChange={(e) => setCode(e.target.value)}
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
                        <Button style={{ width: '100%', marginTop: '2%' }} type="dashed" onClick={addConstraint} icon={<PlusOutlined />}>
                            Add Reason
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default TerminateTransferModal;

