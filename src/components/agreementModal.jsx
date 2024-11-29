import React from 'react';
import { Modal, Button } from 'antd';

const AgreementModal = ({ open, onClose, agreementData }) => {
    return (
        <Modal width={600} title="Agreement Details" open={open} onCancel={onClose} footer={[
            <Button key="ok" type="primary" onClick={onClose}>
                Ok
            </Button>
        ]}>
            <p style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                {JSON.stringify(agreementData, null, 2)}
            </p>
        </Modal>
    );
};

export default AgreementModal;
