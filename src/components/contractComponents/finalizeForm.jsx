import React, { useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import Notification from '../notifications';
import { SendOutlined } from '@ant-design/icons';
import axios from 'axios';
import ContractNegotiations from '../../pages/contractNegotiations';
import config from '../../config';

const FinalizeModal = ({ isFinalizeModalOpen, handleFinalizeOk, handleFinalizeCancel, providerPid }) => {
    const [loading, setLoading] = useState(false);
    const { openNotification, contextHolder } = Notification();

    const handleFinalize = async () => {
        setLoading(true);
        try {
            const response = await axios.post(`${config.providerEndpoint}/api/gateway/finalize-contract/${encodeURIComponent(providerPid)}`, {
                providerPid: providerPid,
            });

            if (response.status === 200) {
                console.log('Contract finalized', response.data);
                openNotification('success', 'Contract finalized', 'Contract is finalized');
                handleFinalizeOk();
            } else {
                console.error('Unexpected response:', response);
                openNotification('error', 'Unexpected Response', 'An unexpected response was received.');
            }
        } catch (error) {
            console.error('Error in finalizing request:', error);
            openNotification('error', 'Error while finalizing', 'An error occurred while attempting to finalize.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {contextHolder}
            <Modal title="Finalize contract" open={isFinalizeModalOpen} onCancel={handleFinalizeCancel}
                footer={[
                    <div key="footer" style={{ display: 'flex', justifyContent: 'space-evenly', padding: 10 }}>
                        <Button style={{ width: '30%' }} key="finalize" type="primary" icon={<SendOutlined />} iconPosition='end'  loading={loading} onClick={handleFinalize}>
                            Finalize
                        </Button>
                        <Button style={{ width: '30%' }} key="cancel" onClick={handleFinalizeCancel}>
                            Cancel
                        </Button>
                    </div>
                ]}
            >
                <Form layout="vertical">
                    <Form.Item label="Are you sure do you want to Finalize this contract?">
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default FinalizeModal;
