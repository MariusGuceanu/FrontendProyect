import React, { useState, useEffect } from 'react';
import { Table, Button, Row, Col } from 'antd';
import '../styles/table-styles.css';
import SorterC from '../components/contractComponents/sortMenu';
import FilterC from '../components/contractComponents/filterMenu';
import RequestModal from '../components/contractComponents/contractForm';
import OfferModal from '../components/contractComponents/offerForm';
import AcceptModal from '../components/contractComponents/acceptForm';
import AgreeModal from '../components/contractComponents/agreeForm';
import VerifyModal from '../components/contractComponents/verifyForm';
import FinalizeModal from '../components/contractComponents/finalizeForm';
import TerminateModal from '../components/contractComponents/terminateForm';
import Searcher from '../components/contractComponents/searcher';
import cnStateMachine from '../components/stateMachines/cnStateMachine';
import config from '../config';
import { useWebSocket } from '../WebSocketProvider';

// Table columns
const columns = [
    { title: 'Process ID', dataIndex: 'processId', width: '25%' },
    { title: 'Offer ID', dataIndex: 'offerId', width: '25%' },
    { title: 'Title', dataIndex: 'title', width: '10%' },
    { title: 'Provider', dataIndex: 'provider', width: '10%' },
    { title: 'Current state', dataIndex: 'currentState', width: '10%' },
    { title: 'Initiated date', dataIndex: 'initiatedDate', width: '20%' },
];

const ContractNegotiations = () => {
    // Ws connection
    const ws = useWebSocket();
    // Modal states
    const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
    const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
    const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false)
    const [isAgreeModalOpen, setIsAgreeModalOpen] = useState(false);
    const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
    const [isFinalizeModalOpen, setIsFinalizeModalOpen] = useState(false)
    const [isTerminateModalOpen, setIsTerminateModalOpen] = useState(false)
    // Selection states
    const selectionType = useState('checkbox');
    const [selectedRow, setSelectedRow] = useState(null);
    // Data states
    const [filteredData, setFilteredData] = useState([]);
    const [data, setData] = useState([]);
    // History table states
    const [historyData, setHistoryData] = useState([])
    const [showHistory, setShowHistory] = useState(false);

    // Gets the data of the table to keep it stored (reloading purposes)
    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('Data') || '[]');
        const storedHistory = JSON.parse(localStorage.getItem('HistoryData') || '[]');
        setData(storedData);
        setFilteredData(storedData);
        setHistoryData(storedHistory);
    }, []);

    // Updates the data from the table every request through websocket connection
    useEffect(() => {
        if (!ws) return;

        // Recieves a message with the data
        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);

            // If the recieved message isn't a contract, is not accepted
            if (message.type !== 'contract negotiation') {
                return;
            }
            const newNegotiation = JSON.parse(event.data);
            console.log('WebSocket message: ', newNegotiation);
            const formattedData = {
                key: newNegotiation.id,
                processId: newNegotiation.id,
                offerId: newNegotiation.params?.offerId || 'N/A',
                title: newNegotiation.title || 'Title',
                provider: newNegotiation.provider ? 'true' : 'false',
                currentState: newNegotiation.state.replace('dspace:', ''),
                initiatedDate: new Date().toLocaleString(),
            };

            // Retrieve the existing data
            const existingData = JSON.parse(localStorage.getItem('Data')) || [];

            // Check if the processId already exists
            const existingIndex = existingData.findIndex(item => item.processId === formattedData.processId);
            let updatedData;
            if (existingIndex !== -1) {

                // If processId exists, update the state of the existing row
                existingData[existingIndex].currentState = formattedData.currentState;

                // If state is FINALIZED OR TERMINATED the data is setted in History data
                if (['FINALIZED', 'TERMINATED'].includes(formattedData.currentState.toUpperCase())) {
                    const updatedHistory = [...historyData, existingData[existingIndex]];
                    setHistoryData(updatedHistory);
                    localStorage.setItem('HistoryData', JSON.stringify(updatedHistory));
                    existingData.splice(existingIndex, 1);
                }

                updatedData = [...existingData];
            } else {
                // If processId doesn't exist, add the new row
                updatedData = [...existingData, formattedData];
            }

            // Updates the data of the table and saves it locally
            setData(updatedData);
            setFilteredData(updatedData);
            localStorage.setItem('Data', JSON.stringify(updatedData));

        };
        // close and error ws functions
        ws.onclose = () => {
            console.log('WebSocket connection closed')
        };
        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
    }, [ws]);

    // Row selection logic
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRow(selectedRows[0]);
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            name: record.name,
        }),
    };

    // Request-contract modal functions
    const showRequestModal = () => setIsRequestModalOpen(true);
    const handleRequestOk = () => setIsRequestModalOpen(false);
    const handleRequestCancel = () => setIsRequestModalOpen(false);
    // Offer-contract modal functions
    const showOfferModal = () => setIsOfferModalOpen(true);
    const handleOfferOk = () => setIsOfferModalOpen(false);
    const handleOfferCancel = () => setIsOfferModalOpen(false);
    // Verify-agreement modal functions
    const showAcceptModal = () => setIsAcceptModalOpen(true);
    const handleAcceptOk = () => setIsAcceptModalOpen(false);
    const handleAcceptCancel = () => setIsAcceptModalOpen(false);
    // Agree-negotiations modal functions
    const showAgreeModal = () => setIsAgreeModalOpen(true);
    const handleAgreeOk = () => setIsAgreeModalOpen(false);
    const handleAgreeCancel = () => setIsAgreeModalOpen(false);
    // Verify-agreement modal functions
    const showVerifyModal = () => setIsVerifyModalOpen(true);
    const handleVerifyOk = () => setIsVerifyModalOpen(false);
    const handleVerifyCancel = () => setIsVerifyModalOpen(false);
    // Finalize-contract modal functions
    const showFinalizeModal = () => setIsFinalizeModalOpen(true);
    const handleFinalizeOk = () => setIsFinalizeModalOpen(false);
    const handleFinalizeCancel = () => setIsFinalizeModalOpen(false);
    // Terminate contract modal functions
    const showTerminateModal = () => setIsTerminateModalOpen(true);
    const handleTerminateOk = () => setIsTerminateModalOpen(false);
    const handleTerminateCancel = () => setIsTerminateModalOpen(false);

    // Search function
    const onSearch = (value) => {
        const filtered = data.filter(item =>
            item.processId.toLowerCase().includes(value.toLowerCase()) ||
            item.offerId.toLowerCase().includes(value.toLowerCase()) ||
            item.title.toLowerCase().includes(value.toLowerCase()) ||
            item.provider.toLowerCase().includes(value.toLowerCase()) ||
            item.currentState.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredData(filtered);
    };

    // State machine for action-buttons of the selected row
    const stateMachine = () => {
        if (!selectedRow) return [];
        const state = selectedRow.currentState;
        const stateTransitions = cnStateMachine[state]?.transitions || {};

        return Object.keys(stateTransitions);
    };

    // Gets the endpoint depending if it is a provider or a consumer
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

        // Render of each button with its modal
        return (
            <>
                {provider && transitions.includes('OFFERED') && (
                    <>
                        <Button className='action-buttons' style={{ width: '20%' }} size='large' type="primary">Offer</Button>
                    </>
                )}
                {!provider && transitions.includes('ACCEPTED') && (
                    <>
                        <Button onClick={showAcceptModal} className='action-buttons' style={{ width: '20%' }} size='large' type="primary">Accept</Button>
                        {selectedRow && (
                            <AcceptModal isAcceptModalOpen={isAcceptModalOpen} handleAcceptOk={handleAcceptOk} handleAcceptCancel={handleAcceptCancel}
                                consumerPid={selectedRow.processId} />
                        )}
                    </>
                )}
                {provider && transitions.includes('AGREED') && (
                    <>
                        <Button onClick={showAgreeModal} className='action-buttons' style={{ width: '20%' }} size='large' type="primary">Agree</Button>
                        {selectedRow && (
                            <AgreeModal isAgreeModalOpen={isAgreeModalOpen} handleAgreeOk={handleAgreeOk} handleAgreeCancel={handleAgreeCancel}
                                negotiationId={selectedRow.processId} />
                        )}
                    </>
                )}
                {!provider && transitions.includes('VERIFIED') && (
                    <>
                        <Button onClick={showVerifyModal} className='action-buttons' style={{ width: '20%' }} size='large' type="primary">Verify</Button>
                        {selectedRow && (
                            <VerifyModal isVerifyModalOpen={isVerifyModalOpen} handleVerifyOk={handleVerifyOk} handleVerifyCancel={handleVerifyCancel}
                                consumerPid={selectedRow.processId} />
                        )}
                    </>
                )}
                {provider && transitions.includes('FINALIZED') && (
                    <>
                        <Button onClick={showFinalizeModal} className='action-buttons' style={{ width: '20%' }} size='large' type="primary">Finalize</Button>
                        {selectedRow && (
                            <FinalizeModal isFinalizeModalOpen={isFinalizeModalOpen} handleFinalizeOk={handleFinalizeOk} handleFinalizeCancel={handleFinalizeCancel}
                                providerPid={selectedRow.processId} />
                        )}
                    </>
                )}
                {(state === 'REQUESTED' || state === 'OFFERED') && transitions.includes('TERMINATED') && (
                    <>
                        <Button onClick={showTerminateModal} className='action-buttons' style={{ width: '20%' }} size='large' type="primary">Terminate</Button>
                        {selectedRow && (
                            <TerminateModal isTerminateModalOpen={isTerminateModalOpen} handleTerminateOk={handleTerminateOk} handleTerminateCancel={handleTerminateCancel}
                                provider={selectedRow.provider === "true"}
                                processId={selectedRow.processId}
                                endpoint={getEndpoint()} />
                        )}
                    </>
                )}
                {state === 'ACCEPTED' && provider && transitions.includes('TERMINATED') && (
                    <>
                        <Button onClick={showTerminateModal} className='action-buttons' style={{ width: '20%' }} size='large' type="primary">Terminate</Button>
                        {selectedRow && (
                            <TerminateModal isTerminateModalOpen={isTerminateModalOpen} handleTerminateOk={handleTerminateOk} handleTerminateCancel={handleTerminateCancel}
                                provider={selectedRow.provider === "true"}
                                processId={selectedRow.processId}
                                endpoint={getEndpoint()} />
                        )}
                    </>
                )}
                {state === 'AGREED' && !provider && transitions.includes('TERMINATED') && (
                    <>
                        <Button onClick={showTerminateModal} className='action-buttons' style={{ width: '20%' }} size='large' type="primary">Terminate</Button>
                        {selectedRow && (
                            <TerminateModal isTerminateModalOpen={isTerminateModalOpen} handleTerminateOk={handleTerminateOk} handleTerminateCancel={handleTerminateCancel}
                                provider={selectedRow.provider === "true"}
                                processId={selectedRow.processId}
                                endpoint={getEndpoint()} />
                        )}
                    </>
                )}
                {state === 'VERIFIED' && provider && transitions.includes('TERMINATED') && (
                    <>
                        <Button onClick={showTerminateModal} className='action-buttons' style={{ width: '20%' }} size='large' type="primary">Terminate</Button>
                        {selectedRow && (
                            <TerminateModal isTerminateModalOpen={isTerminateModalOpen} handleTerminateOk={handleTerminateOk} handleTerminateCancel={handleTerminateCancel}
                                provider={selectedRow.provider === "true"}
                                processId={selectedRow.processId}
                                endpoint={getEndpoint()} />
                        )}
                    </>
                )}
            </>
        )
    }

    // Content display
    return (
        <>
            {/* Table buttons */}
            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '3%', }}>
                <Button className="large-buttons" type="primary" onClick={() => setShowHistory(false)}>Ongoing Processes</Button>
                <Button className="large-buttons" type="primary" onClick={() => setShowHistory(true)}>History</Button>
            </div>

            {/* Action buttons */}
            <div style={{ width: '100%', margin: 'auto', border: 'solid', borderRadius: 6 }}>
                <Row gutter={16} />
                <Col span={24} className="button-grid" style={{ padding: '2%' }}>
                    {/* Request contract form display */}
                    <Button onClick={showRequestModal} className="action-buttons" size="large" type="primary">Request Contract</Button>
                    <RequestModal isModalOpen={isRequestModalOpen} handleOk={handleRequestOk} handleCancel={handleRequestCancel} />
                    {/* Offer form display */}
                    <Button onClick={showOfferModal} className="action-buttons" size='large' type="primary">Send Offer</Button>
                    <OfferModal isModalOpen={isOfferModalOpen} handleOk={handleOfferOk} handleCancel={handleOfferCancel} />
                    {/* Sorter and Filter */}
                    <FilterC className="action-buttons" setFilteredData={setFilteredData} initialData={data} />
                    <SorterC className="action-buttons" filteredData={filteredData} setFilteredData={setFilteredData} />
                    {/* Search */}
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
                                columns={columns}
                                dataSource={historyData}
                                pagination={{ pageSize: 10 }}
                                scroll={{ y: 55 * 6 }} />
                        )}
                    </Col>
                </Row>
                {/* Reactive state buttons */}
                <Row gutter={16}>
                    <Col style={{ width: '95%', margin: 'auto', display: 'flex', justifyContent: 'space-evenly', gap: '10px', paddingBottom: '2%' }}>
                        {changeActionButtons()}
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default ContractNegotiations;
