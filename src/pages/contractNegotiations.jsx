import React, { useState, useEffect } from 'react';
import { Table, Button, Row, Col } from 'antd';
import '../styles/table-styles.css';
import SorterC from '../components/contractComponents/sortMenu';
import FilterC from '../components/contractComponents/filterMenu';
import RequestModal from '../components/contractComponents/contractForm';
import OfferModal from '../components/contractComponents/offerForm';
import Searcher from '../components/contractComponents/searcher';
import cnStateMachine from '../components/stateMachines/cnStateMachine';
import axios from 'axios';
import { io } from 'socket.io-client';
import config from '../config';

const socket = io.connect('http://localhost:9082', { reconnection: true });

// Table columns
const columns = [
    { title: 'Process ID', dataIndex: 'processId', width: '20%' },
    { title: 'Title', dataIndex: 'title', width: '10%' },
    { title: 'Provider', dataIndex: 'provider', width: '20%' },
    { title: 'Consumer', dataIndex: 'consumer', width: '20%' },
    { title: 'Current state', dataIndex: 'currentState', width: '15%' },
    { title: 'Initiated date', dataIndex: 'initiatedDate', width: '15%' },
];

const ContractNegotiations = () => {
    // Modal states
    const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
    const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
    // selection states
    const selectionType = useState('checkbox');
    const [selectedRow, setSelectedRow] = useState(null);
    // Data states
    const [filteredData, setFilteredData] = useState([]);
    const [data, setData] = useState([]);

    // Updates the data for the first time
    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('contractData') || '[]');
        setData(storedData);
        setFilteredData(storedData);
    }, []);

    // Storage data locally after every request
    useEffect(() => {
        socket.on('newNegotiation', (newNegotiation) => {
            const updatedData = [...data, newNegotiation];
            setData(updatedData);
            setFilteredData(updatedData);
            localStorage.setItem('contractData', JSON.stringify(updatedData));
        });
        return () => socket.off('newNegotiation');
    }, [data]);


    // Function to add the last row to the table
    const addRowToTable = async (contractNegotiationId) => {
        try {
            const response = await axios.get(`${config.providerEndpoint}/api/gateway/negotiations`);
            if (response.status === 200) {
                // Gets the last row of the DB to match with the contractNegotiationId of the POST (to change)
                const negotiations = response.data;
                const newNegotiation = negotiations[negotiations.length - 1];
                // Inserts the collected data to the table
                const newKey = (data.length + 1).toString();
                const newData = {
                    key: newKey,
                    processId: contractNegotiationId,
                    title: `title${newKey}`,
                    provider: newNegotiation['dspace:providerPid'],
                    consumer: newNegotiation['dspace:consumerPid'],
                    currentState: newNegotiation['dspace:state'].replace('dspace:', ''),
                    initiatedDate: new Date().toLocaleString(),
                };
                // Save the data locally
                const updatedData = [...data, newData];
                setData(updatedData);
                setFilteredData(updatedData);
                localStorage.setItem('contractData', JSON.stringify(updatedData));
                // Emits the data to the websocket
                socket.emit('newNegotiation', newData);
            } else {
                console.error('Error fetching negotiations:', response.statusText);
            }
        } catch (error) {
            console.error('Error in addRowToTable:', error);
        }
    };

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
    const showRequestModal = () => {
        setIsRequestModalOpen(true);
    };
    const handleRequestOk = () => {
        setIsRequestModalOpen(false);
    };
    const handleRequestCancel = () => {
        setIsRequestModalOpen(false);
    };

    // Offer-contract modal functions
    const showOfferModal = () => {
        setIsOfferModalOpen(true);
    };
    const handleOfferOk = () => {
        setIsOfferModalOpen(false);
    };
    const handleOfferCancel = () => {
        setIsOfferModalOpen(false);
    };

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
        const transitions = stateMachine();

        return (
            <>
                {transitions.includes('ACCEPTED') && (
                    <Button className='action-buttons' style={{ width: '30%' }} size='large' type="primary">Accept</Button>
                )}
                {transitions.includes('AGREED') && (
                    <Button className='action-buttons' style={{ width: '30%' }} size='large' type="primary">Agree</Button>
                )}
                {transitions.includes('VERIFIED') && (
                    <Button className='action-buttons' style={{ width: '30%' }} size='large' type="primary">Verify</Button>
                )}
                {transitions.includes('FINALIZED') && (
                    <Button className='action-buttons' style={{ width: '30%' }} size='large' type="primary">Finalize</Button>
                )}
                {transitions.includes('TERMINATED') && (
                    <Button className='action-buttons' style={{ width: '30%' }} size='large' type="primary">Terminate</Button>
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
                    <RequestModal isModalOpen={isRequestModalOpen} handleOk={handleRequestOk} handleCancel={handleRequestCancel} addRowToTable={addRowToTable} />
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
        </>
    );
};

export default ContractNegotiations;
