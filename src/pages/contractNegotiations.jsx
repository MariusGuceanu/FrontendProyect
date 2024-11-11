import React, { useState, useEffect } from 'react';
import { Table, Button, Row, Col } from 'antd';
import '../styles/table-styles.css';
import SorterC from '../components/contractComponents/sortMenu';
import FilterC from '../components/contractComponents/filterMenu';
import RequestModal from '../components/contractComponents/contractForm';
import OfferModal from '../components/contractComponents/offerForm';
import AgreeModal from '../components/contractComponents/agreeForm';
import Searcher from '../components/contractComponents/searcher';
import cnStateMachine from '../components/stateMachines/cnStateMachine';

//  Websocket
const ws = new WebSocket(import.meta.env.VITE_WS_URL);

// Table columns
const columns = [
    { title: 'Process ID', dataIndex: 'processId', width: '25%' },
    { title: 'Title', dataIndex: 'title', width: '10%' },
    { title: 'Provider', dataIndex: 'provider', width: '15%' },
    { title: 'Current state', dataIndex: 'currentState', width: '25%' },
    { title: 'Initiated date', dataIndex: 'initiatedDate', width: '25%' },
];

const ContractNegotiations = () => {
    // Modal states
    const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
    const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
    const [isAgreeModalOpen, setIsAgreeModalOpen] = useState(false);
    // Selection states
    const selectionType = useState('checkbox');
    const [selectedRow, setSelectedRow] = useState(null);
    // Data states
    const [filteredData, setFilteredData] = useState([]);
    const [data, setData] = useState([]);

    // Gets the data of the table to keep it stored (reloading purposes)
    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('Data') || '[]');
        setData(storedData);
        setFilteredData(storedData);
    }, []);

    // Updates the data from the table every request through websocket connection
    useEffect(() => {
        ws.onopen = () => {
            console.log('Connected to WebSocket');
        };

        // Recieves a message with the data
        ws.onmessage = (event) => {
            const newNegotiation = JSON.parse(event.data);
            console.log('WebSocket message: ', newNegotiation);
            const formattedData = {
                key: newNegotiation.id,
                processId: newNegotiation.id,
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
            console.log('WebSocket connection closed');
            ws.close();

        };
        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
    }, []);

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

    // Agree-negotiations modal functions
    const showAgreeModal = () => setIsAgreeModalOpen(true);
    const handleAgreeOk = () => setIsAgreeModalOpen(false);
    const handleAgreeCancel = () => setIsAgreeModalOpen(false);

    // Search function
    const onSearch = (value) => {
        const filtered = data.filter(item =>
            item.processId.toLowerCase().includes(value.toLowerCase()) ||
            item.title.toLowerCase().includes(value.toLowerCase()) ||
            item.provider.toLowerCase().includes(value.toLowerCase()) ||
            item.consumer.toLowerCase().includes(value.toLowerCase()) ||
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

    // Renders buttons depending selected current state
    const changeActionButtons = () => {
        if (!selectedRow) return null;
        const transitions = stateMachine();
        const provider = selectedRow.provider;
        console.log("Provider:", provider, "Transitions:", transitions);

        return (
            <>
                {provider == 'true' && transitions.includes('OFFERED') && (
                    <Button className='action-buttons' style={{ width: '20%' }} size='large' type="primary">Offer</Button>
                )}
                {provider == 'true' && transitions.includes('ACCEPTED') && (
                    <Button className='action-buttons' style={{ width: '20%' }} size='large' type="primary">Accept</Button>
                )}
                {provider == 'true' && transitions.includes('AGREED') && (
                    <Button onClick={showAgreeModal} className='action-buttons' style={{ width: '20%' }} size='large' type="primary">Agree</Button>
                )}
                {provider == 'false' && transitions.includes('VERIFIED') && (
                    <Button className='action-buttons' style={{ width: '20%' }} size='large' type="primary">Verify</Button>
                )}
                {provider == 'true' && transitions.includes('FINALIZED') && (
                    <Button className='action-buttons' style={{ width: '20%' }} size='large' type="primary">Finalize</Button>
                )}
                {transitions.includes('TERMINATED') && (
                    <Button className='action-buttons' style={{ width: '20%' }} size='large' type="primary">Terminate</Button>
                )}
            </>
        )
    }

    // All content display
    return (
        <>
            {/* Table buttons */}
            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '3%', }}>
                <Button className="large-buttons" type="primary">Ongoing Processes</Button>
                <Button className="large-buttons" type="primary">History</Button>
            </div>

            {/* Action buttons */}
            <div style={{ width: '100%', margin: 'auto', border: 'solid', borderRadius: 6 }}>
                <Row gutter={16} />
                <Col span={24} className="button-grid" style={{ padding: '2%' }}>
                    {/* Request contract form display */}
                    <Button onClick={showRequestModal} className="action-buttons" size="large" type="primary">Request Contract</Button>
                    <RequestModal isModalOpen={isRequestModalOpen} handleOk={handleRequestOk} handleCancel={handleRequestCancel} addRowToTable={() => { }} />
                    {/* Offer form display */}
                    <Button onClick={showOfferModal} className="action-buttons" size='large' type="primary">Send Offer</Button>
                    <OfferModal isModalOpen={isOfferModalOpen} handleOk={handleOfferOk} handleCancel={handleOfferCancel} />
                    {/* Sorter and Filter */}
                    <FilterC className="action-buttons" setFilteredData={setFilteredData} initialData={data} />
                    <SorterC className="action-buttons" filteredData={filteredData} setFilteredData={setFilteredData} />
                    {/* Search */}
                    <Searcher onSearch={onSearch} />
                </Col>
                {/* Table and reactive state buttons */}
                <Row gutter={16}>
                    <Col span={24}>
                        <Table
                            style={{ padding: '2%', overflowX: 'auto' }}
                            className="table-contracts"
                            rowClassName={(record) => (record.provider === 'false' ? 'provider-false' : '')}
                            rowSelection={{
                                type: selectionType,
                                ...rowSelection,
                            }}
                            columns={columns}
                            dataSource={filteredData}
                            pagination={{ pageSize: 10 }}
                            scroll={{ y: 55 * 6 }}
                        />
                    </Col>
                </Row>
                {/* Reactive state buttons */}
                <Row gutter={16}>
                    <Col style={{ width: '95%', margin: 'auto', display: 'flex', justifyContent: 'space-evenly', gap: '10px', paddingBottom: '2%' }}>
                        {changeActionButtons()}
                    </Col>
                </Row>
            </div>
            {selectedRow && (
                <AgreeModal
                    isAgreeModalOpen={isAgreeModalOpen}
                    handleAgreeOk={handleAgreeOk}
                    handleAgreeCancel={handleAgreeCancel}
                    negotiationId={selectedRow.processId}
                />
            )}
        </>
    );
};

export default ContractNegotiations;
