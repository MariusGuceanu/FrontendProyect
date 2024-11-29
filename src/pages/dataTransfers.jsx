import React, { useState, useEffect } from 'react';
import { Table, Button, Row, Col } from 'antd';
import '../styles/table-styles.css';
import SorterC from '../components/contractComponents/sortMenu';
import FilterC from '../components/contractComponents/filterMenu';
import RequestTransferModal from '../components/transferComponents/requestTransferForm';
import StartModal from '../components/transferComponents/startForm';
import CompleteModal from '../components/transferComponents/completeForm';
import SuspendModal from '../components/transferComponents/suspendForm';
import Searcher from '../components/contractComponents/searcher';
import dtStateMachine from '../components/stateMachines/dtStateMachine';
import config from '../config';
import { useWebSocket } from '../WebSocketProvider';
import TerminateTransferModal from '../components/transferComponents/terminateTransferForm';


const DataTransfers = () => {
    // Ws connection
    const ws = useWebSocket();
    // Modal states
    const [isRequestTransferModalOpen, setIsRequestTransferModalOpen] = useState(false);
    const [isStartModalOpen, setIsStartModalOpen] = useState(false)
    const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false)
    const [isSuspendModalOpen, setIsSuspendModalOpen] = useState(false)
    const [isTerminateTModalOpen, setIsTerminateTModalOpen] = useState(false)
    // Selection states
    const selectionType = useState('checkbox');
    const [selectedRow, setSelectedRow] = useState(null);
    // Data states  
    const [filteredData, setFilteredData] = useState([]);
    const [data, setData] = useState([]);
    // History table states
    const [historyTransferData, setHistoryTransferData] = useState([])
    const [showHistory, setShowHistory] = useState(false);

    // Table columns
    const columns = [
        { title: 'Transfer ID', dataIndex: 'transferId', width: '20%' },
        { title: 'Agreement ID', dataIndex: 'agreementId', width: '20%' },
        { title: 'Transfer Format', dataIndex: 'transferFormat', width: '12.5%' },
        { title: 'Title', dataIndex: 'title', width: '8.75%' },
        { title: 'Provider', dataIndex: 'provider', width: '8.75%' },
        { title: 'Current state', dataIndex: 'currentState', width: '12.5%' },
        { title: 'Initiated date', dataIndex: 'initiatedDate', width: '17.5%' },
    ];

    // Gets the data of the table to keep it stored (reloading purposes)
    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('TransfersData') || '[]');
        const storedHistory = JSON.parse(localStorage.getItem('HistoryTransferData') || '[]');
        setData(storedData);
        setFilteredData(storedData);
        setHistoryTransferData(storedHistory);
    }, []);

    // Updates the data from the table every request through websocket connection
    useEffect(() => {
        if (!ws) return;

        // Recieves a message with the data
        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);

            // If the recieved message isn't a transfer, is not accepted
            if (message.type !== 'transfer process') {
                return;
            }
            const newTransfer = JSON.parse(event.data);
            console.log('WebSocket message: ', message);
            const formattedData = {
                key: newTransfer.id,
                transferId: newTransfer.id,
                agreementId: newTransfer.params?.agreementId || 'N/A',
                transferFormat: newTransfer.params?.transferFormat,
                title: newTransfer.title || 'Title',
                provider: newTransfer.provider ? 'true' : 'false',
                currentState: newTransfer.state.replace('dspace:', ''),
                initiatedDate: new Date().toLocaleString(),
            };

            // Retrieve the existing data
            const existingData = JSON.parse(localStorage.getItem('TransfersData')) || [];

            // Check if the transferId already exists
            const existingIndex = existingData.findIndex(item => item.transferId === formattedData.transferId);
            let updatedData;
            if (existingIndex !== -1) {

                // If transferId exists, update the state of the existing row
                existingData[existingIndex].currentState = formattedData.currentState;

                // If state is COMPLETED OR TERMINATED the data is setted in History data
                if (['COMPLETED', 'TERMINATED'].includes(formattedData.currentState.toUpperCase())) {
                    const updatedHistory = [...historyTransferData, existingData[existingIndex]];

                    // If the terminated process doesn't exist, adds a new one to the history table
                    const uniqueHistory = updatedHistory.filter((item, index, self) =>
                        index === self.findIndex((t) => t.transferId === item.transferId)
                    );

                    setHistoryTransferData(uniqueHistory);
                    localStorage.setItem('HistoryTransferData', JSON.stringify(uniqueHistory));
                    existingData.splice(existingIndex, 1);
                }

                updatedData = [...existingData];
            } else {

                // If transferId doesn't exist, add the new row               
                updatedData = [...existingData, formattedData];
            }

            // Updates the data of the table and saves it locally
            setData(updatedData);
            setFilteredData(updatedData);
            localStorage.setItem('TransfersData', JSON.stringify(updatedData));
        };

        // close and error ws functions
        ws.onclose = () => {
            console.log('WebSocket connection closed')
        };
        ws.onerror = (error) => console.error('WebSocket error:', error);
    }, [ws, historyTransferData]);

    // Row selection logic
    const rowSelection = {
        onChange: (_, selectedRows) => setSelectedRow(selectedRows[0]),
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            name: record.name,
        }),
        selectedRowKeys: selectedRow ? [selectedRow.key] : [],

    };

    // Request-transfer modal functions
    const showRequestTransferModal = () => setIsRequestTransferModalOpen(true);
    const handleRequestTransferOk = () => {
        setIsRequestTransferModalOpen(false)
        setSelectedRow(false);
    };
    const handleRequestTransferCancel = () => setIsRequestTransferModalOpen(false);

    // Start transfer modal fucntions
    const showStartModal = () => setIsStartModalOpen(true);
    const handleStartOk = () => {
        setIsStartModalOpen(false)
        setSelectedRow(false);
    };
    const handleStartCancel = () => setIsStartModalOpen(false);

    // Complete transfer modal functions
    const showCompleteModal = () => setIsCompleteModalOpen(true);
    const handleCompleteOk = () => {
        setIsCompleteModalOpen(false)
        setSelectedRow(false);
    };
    const handleCompleteCancel = () => setIsCompleteModalOpen(false);

    // Suspend transfer modal functions
    const showSuspendModal = () => setIsSuspendModalOpen(true);
    const handleSuspendOk = () => {
        setIsSuspendModalOpen(false)
        setSelectedRow(false);
    };
    const handleSuspendCancel = () => setIsSuspendModalOpen(false);

    // Terminate transfer modal functions
    const showTerminateTModal = () => setIsTerminateTModalOpen(true);
    const handleTerminateTOk = () => {
        setIsTerminateTModalOpen(false)
        setSelectedRow(false);
    };
    const handleTerminateTCancel = () => setIsTerminateTModalOpen(false);

    // Searcher function logic
    const onSearch = (value) => {
        const filtered = data.filter(item =>
            item.transferId.toLowerCase().includes(value.toLowerCase()) ||
            item.agreementId.toLowerCase().includes(value.toLowerCase()) ||
            item.transferFormat.toLowecase().includes(value.toLowerCase()) ||
            item.title.toLowerCase().includes(value.toLowerCase()) ||
            item.provider.toLowerCase().includes(value.toLowerCase()) ||
            item.currentState.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredData(filtered);
    };

    // State machine for action-buttons of the selected rowf
    const stateMachine = () => {
        if (!selectedRow) return [];
        const state = selectedRow.currentState;
        const stateTransitions = dtStateMachine[state]?.transitions || {};

        return Object.keys(stateTransitions);
    };

    // Gets the endpoint and send it to the forms in order to distinct between provider and consumer
    const getEndpoint = () => {
        if (!selectedRow) return null;
        return selectedRow.provider === 'true' ? config.providerEndpoint : config.consumerEndpoint;
    };

    // Renders buttons depending selected current state
    const changeActionButtons = () => {
        if (!selectedRow) return null;
        const transitions = stateMachine();
        const provider = selectedRow.provider === 'true';
        const state = selectedRow.currentState;

        // Renders each state button with its modal
        return (
            <>
                {provider && transitions.includes('STARTED') && state === 'REQUESTED' && (
                    <>
                        <Button onClick={showStartModal} className='action-buttons' style={{ width: '20%' }} size='large' type="primary">Start</Button>
                        {selectedRow && (
                            <StartModal isStartModalOpen={isStartModalOpen} handleStartOk={handleStartOk} handleStartCancel={handleStartCancel}
                                provider={selectedRow.provider}
                                transferProcessId={selectedRow.transferId}
                                transferFormat={selectedRow.transferFormat}
                                endpoint={getEndpoint()}
                            />
                        )}
                    </>
                )}
                {transitions.includes('SUSPENDED') && state === 'STARTED' && (
                    <>
                        <Button onClick={showSuspendModal} className='action-buttons' style={{ width: '20%' }} size='large' type="primary">Suspend</Button>
                        {selectedRow && (
                            <SuspendModal isSuspendModalOpen={isSuspendModalOpen} handleSuspendOk={handleSuspendOk} handleSuspendCancel={handleSuspendCancel}
                                provider={selectedRow.provider}
                                transferProcessId={selectedRow.transferId}
                                endpoint={getEndpoint()}
                            />
                        )}
                    </>
                )}
                {transitions.includes('STARTED') && state === 'SUSPENDED' && (
                    <>
                        <Button onClick={showStartModal} className='action-buttons' style={{ width: '20%' }} size='large' type="primary">Start</Button>
                        {selectedRow && (
                            <StartModal isStartModalOpen={isStartModalOpen} handleStartOk={handleStartOk} handleStartCancel={handleStartCancel}
                                provider={selectedRow.provider}
                                transferProcessId={selectedRow.transferId}
                                endpoint={getEndpoint()}
                            />
                        )}
                    </>
                )}
                {transitions.includes('COMPLETED') && (
                    <>
                        <Button onClick={showCompleteModal} className='action-buttons' style={{ width: '20%' }} size='large' type="primary">Complete</Button>
                        {selectedRow && (
                            <CompleteModal isCompleteModalOpen={isCompleteModalOpen} handleCompleteOk={handleCompleteOk} handleCompleteCancel={handleCompleteCancel}
                                provider={selectedRow.provider}
                                transferProcessId={selectedRow.transferId}
                                endpoint={getEndpoint()}
                            />
                        )}
                    </>
                )}
                {transitions.includes('TERMINATED') && (
                    <>
                        <Button onClick={showTerminateTModal} className='action-buttons' style={{ width: '20%' }} size='large' type="primary">Terminate</Button>
                        {selectedRow && (
                            <TerminateTransferModal isTerminateTModalOpen={isTerminateTModalOpen} handleTerminateTOk={handleTerminateTOk} handleTerminateTCancel={handleTerminateTCancel}
                                provider={selectedRow.provider}
                                transferProcessId={selectedRow.transferId}
                                endpoint={getEndpoint()}
                            />
                        )}
                    </>
                )}
            </>
        );
    };

    // Content display
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '3%' }}>
                <Button className="large-buttons" type="primary" onClick={() => setShowHistory(false)}>Ongoing Transfers</Button>
                <Button className="large-buttons" type="primary" onClick={() => setShowHistory(true)}>History</Button>
            </div>

            <div style={{ width: '100%', margin: 'auto', border: 'solid', borderRadius: 6 }}>
                <Row gutter={16} />
                <Col span={24} className="button-gridT" style={{ padding: '2%' }}>
                    <Button onClick={showRequestTransferModal} className='large-button' size='large' type='primary'>Request transfer</Button>
                    <RequestTransferModal isRequestTransferModalOpen={isRequestTransferModalOpen} handleRequestTransferOk={handleRequestTransferOk} handleRequestTransferCancel={handleRequestTransferCancel} />
                    <FilterC className="action-buttons" setFilteredData={setFilteredData} initialData={data} />
                    <SorterC className="action-buttons" filteredData={filteredData} setFilteredData={setFilteredData} />
                    <Searcher onSearch={onSearch} />
                </Col>

                {/* Ongoing and History tables */}
                <Row gutter={16}>
                    <Col span={24}>
                        {/*  Iterates between tables */}
                        {!showHistory ? (
                            <Table style={{ padding: '2%', overflowX: 'auto' }} className="table-contracts"
                                rowClassName={(record) => (record.provider === 'false' ? 'provider-false' : '')}
                                rowSelection={{
                                    type: selectionType,
                                    ...rowSelection,
                                }} columns={columns} dataSource={filteredData}
                                pagination={{ pageSize: 10 }}
                                scroll={{ y: 55 * 6 }} />
                        ) : (
                            <Table style={{ padding: '2%', overflowX: 'auto' }} className="table-contracts"
                                rowClassName={(record) => (record.provider === 'false' ? 'provider-false' : '')}
                                columns={columns}
                                dataSource={historyTransferData}
                                pagination={{ pageSize: 10 }}
                                scroll={{ y: 55 * 6 }} />
                        )}
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
