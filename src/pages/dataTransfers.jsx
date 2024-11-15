import React, { useState, useEffect } from 'react';
import { Table, Button, Row, Col } from 'antd';
import '../styles/table-styles.css';
import SorterC from '../components/contractComponents/sortMenu';
import FilterC from '../components/contractComponents/filterMenu';
import RequestTransferModal from '../components/transferComponents/requestTransferForm';

import Searcher from '../components/contractComponents/searcher';
import dtStateMachine from '../components/stateMachines/dtStateMachine';
import { useWebSocket } from '../WebSocketProvider';


// Table columns
const columns = [
    { title: 'Transfer ID', dataIndex: 'transferId', width: '22.5%' },
    { title: 'Agreement ID', dataIndex: 'agreementId', width: '22.5%' },
    { title: 'Title', dataIndex: 'title', width: '10%' },
    { title: 'Provider', dataIndex: 'provider', width: '10%' },
    { title: 'Current state', dataIndex: 'currentState', width: '15%' },
    { title: 'Initiated date', dataIndex: 'initiatedDate', width: '20%' },
];

const DataTransfers = () => {
    const ws = useWebSocket();
    const [isRequestTransferModalOpen, setIsRequestTransferModalOpen] = useState(false);
    const selectionType = useState('checkbox');
    const [selectedRow, setSelectedRow] = useState(null);
    const [filteredData, setFilteredData] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('TransfersData') || '[]');
        setData(storedData);
        setFilteredData(storedData);
    }, []);

    useEffect(() => {
        if (!ws) return;

        ws.onmessage = (event) => {
            const newTransfer = JSON.parse(event.data);
            console.log('WebSocket message: ', newTransfer);
            const formattedData = {
                key: newTransfer.id,
                transferId: newTransfer.id,
                agreementId: newTransfer.params?.agreement_id || 'N/A',
                title: newTransfer.title || 'Title',
                provider: newTransfer.provider ? 'true' : 'false',
                currentState: newTransfer.state.replace('dspace:', ''),
                initiatedDate: new Date().toLocaleString(),
            };

            const existingData = JSON.parse(localStorage.getItem('TransfersData')) || [];
            const existingIndex = existingData.findIndex(item => item.transferId === formattedData.transferId);

            let updatedData;
            if (existingIndex !== -1) {
                existingData[existingIndex].currentState = formattedData.currentState;
                updatedData = [...existingData];
            } else {
                updatedData = [...existingData, formattedData];
            }

            setData(updatedData);
            setFilteredData(updatedData);
            localStorage.setItem('TransfersData', JSON.stringify(updatedData));
        };

        ws.onclose = () => console.log('WebSocket connection closed');
        ws.onerror = (error) => console.error('WebSocket error:', error);
    }, [ws]);

    const rowSelection = {
        onChange: (_, selectedRows) => setSelectedRow(selectedRows[0]),
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            name: record.name,
        }),
    };

    const showRequestTransferModal = () => setIsRequestTransferModalOpen(true);
    const handleRequestTransferOk = () => setIsRequestTransferModalOpen(false);
    const handleRequestTransferCancel = () => setIsRequestTransferModalOpen(false);

    const onSearch = (value) => {
        const filtered = data.filter(item =>
            item.transferId.toLowerCase().includes(value.toLowerCase()) ||
            item.title.toLowerCase().includes(value.toLowerCase()) ||
            item.provider.toLowerCase().includes(value.toLowerCase()) ||
            item.currentState.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredData(filtered);
    };

    const stateMachine = () => {
        if (!selectedRow) return [];
        const state = selectedRow.currentState;
        const stateTransitions = dtStateMachine[state]?.transitions || {};

        return Object.keys(stateTransitions);
    };

    const changeActionButtons = () => {
        if (!selectedRow) return null;
        const transitions = stateMachine();
        const provider = selectedRow.provider;
        console.log("Provider:", provider, "Transitions:", transitions);

        return (
            <>
                {provider == 'true' && transitions.includes('STARTED') && (
                    <Button className='action-buttons' style={{ width: '20%' }} size='large' type="primary">Start</Button>
                )}
                {transitions.includes('SUSPENDED') && (
                    <Button className='action-buttons' style={{ width: '20%' }} size='large' type="primary">Suspend</Button>
                )}
                {transitions.includes('STARTED2') && (
                    <Button className='action-buttons' style={{ width: '20%' }} size='large' type="primary">Start</Button>
                )}
                {transitions.includes('COMPLETED') && (
                    <Button className='action-buttons' style={{ width: '20%' }} size='large' type="primary">Complete</Button>
                )}
                {transitions.includes('TERMINATED') && (
                    <Button className='action-buttons' style={{ width: '20%' }} size='large' type="primary">Terminate</Button>
                )}
            </>
        )
    }

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '3%' }}>
                <Button className="large-buttons" type="primary">Ongoing Transfers</Button>
                <Button className="large-buttons" type="primary">History</Button>
            </div>

            <div style={{ width: '100%', margin: 'auto', border: 'solid', borderRadius: 6 }}>
                <Row gutter={16} />
                <Col span={24} className="button-grid" style={{ padding: '2%' }}>
                    <Button onClick={showRequestTransferModal} className='large-button' size='large' type='primary'>Request transfer</Button>
                    <RequestTransferModal isRequestTransferModalOpen={isRequestTransferModalOpen} handleRequestTransferOk={handleRequestTransferOk} handleRequestTransferCancel={handleRequestTransferCancel} />
                    <FilterC className="action-buttons" setFilteredData={setFilteredData} initialData={data} />
                    <SorterC className="action-buttons" filteredData={filteredData} setFilteredData={setFilteredData} />
                    <Searcher onSearch={onSearch} />
                </Col>

                <Row gutter={16}>
                    <Col span={24}>
                        <Table style={{ padding: '2%', overflowX: 'auto' }} className="table-contracts"
                            rowClassName={(record) => (record.provider === 'false' ? 'provider-false' : '')}
                            rowSelection={{
                                type: selectionType,
                                ...rowSelection,
                            }} columns={columns} dataSource={filteredData} pagination={{ pageSize: 10 }}
                            scroll={{ y: 55 * 6 }}
                        />
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col style={{ width: '95%', margin: 'auto', display: 'flex', justifyContent: 'space-evenly', gap: '10px', paddingBottom: '2%' }}>
                        {changeActionButtons()}
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default DataTransfers;
