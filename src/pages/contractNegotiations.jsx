import React, { useState } from 'react';
import { Table, Button, Row, Col, Modal, Select, Form, Input } from 'antd';
import '../styles/table-styles.css';
import SorterC from '../components/contractComponents/sortMenu';
import FilterC from '../components/contractComponents/filterMenu';
import RequestModal from '../components/contractComponents/contractForm';
import OfferModal from '../components/contractComponents/offerForm';

// Table columns
const columns = [
    { title: 'Process ID', dataIndex: 'processId', width:'30%'},
    { title: 'Title', dataIndex: 'title', width:'10%'},
    { title: 'Provider', dataIndex: 'provider', width:'15%'},
    { title: 'Consumer', dataIndex: 'consumer', width:'15%'},
    { title: 'Current state', dataIndex: 'currentState', width:'10%'},
    { title: 'Initiated date', dataIndex: 'initiatedDate', width:'20%'},
];

// Static data for the table
const initialData = [
    { key: '1', processId: 'ceit2', title: 'Ceitaa', provider: 'ceita', consumer: 'clienta', currentState: 'ongoing' },
    { key: '2', processId: 'ceit7', title: 'Ceitab', provider: '', consumer: 'clientb', currentState: 'terminated' },
    { key: '3', processId: 'ceit3', title: 'Ceitbc', provider: 'ceitc', consumer: '', currentState: 'ongoing' },
    
];

const { Search } = Input;

const ContractNegotiations = () => {
    // Defining States
    const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
    const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
    const [filteredData, setFilteredData] = useState(initialData);
    const [data, setData] = useState(initialData);

    // Request modal functions
    const showRequestModal = () => {
        setIsRequestModalOpen(true);
    };
    const handleRequestOk = () => {
        setIsRequestModalOpen(false);
    };
    const handleRequestCancel = () => {
        setIsRequestModalOpen(false);
    };

    const addRowToTable = (processId) => {
        const newKey = (data.length + 1).toString();
        const newData = {
            key: newKey,
            processId: processId,
            title: `title${newKey}`,  
            provider: `provider${newKey}`, 
            consumer: `consumer${newKey}`, 
            currentState: 'ongoing',
            initiatedDate: new Date().toLocaleString(),
        };
        const updatedData = [...data, newData];
        setData(updatedData);
        setFilteredData(updatedData);
        console.log(updatedData);
    };

    // Offer modal functions
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
        const filtered = initialData.filter(item =>
            item.processId.toLowerCase().includes(value.toLowerCase()) ||
            item.title.toLowerCase().includes(value.toLowerCase()) ||
            item.provider.toLowerCase().includes(value.toLowerCase()) ||
            item.consumer.toLowerCase().includes(value.toLowerCase()) ||
            item.currentState.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredData(filtered);
    };

    // All content display
    return (
        <>
            {/* Table buttons */}
            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop:'3%', }}>
                <Button className="large-buttons" type="primary">Ongoing Processes</Button>
                <Button className="large-buttons" type="primary">History</Button>
            </div>

            {/* Action buttons */}
            <div style={{ width: '100%', margin: 'auto', border: 'solid', borderRadius: 6 }}>
                <Row gutter={16} />
                <Col span={24} className="button-grid" style={{ padding: '2%' }}>
                    {/* Request contract form display */}
                    <Button onClick={showRequestModal} className="action-buttons" size="large" type="primary">Request Contract</Button>
                    <RequestModal isModalOpen={isRequestModalOpen} handleOk={handleRequestOk} handleCancel={handleRequestCancel} addRowToTable={addRowToTable}/>
                    {/* Offer form display */}
                    <Button onClick={showOfferModal} className="action-buttons" size='large' type="primary">Send Offer</Button>
                    <OfferModal isModalOpen={isOfferModalOpen} handleOk={handleOfferOk} handleCancel={handleOfferCancel} />
                    {/* Sorter and Filter */}
                    <FilterC className="action-buttons" setFilteredData={setFilteredData} initialData={initialData} />
                    <SorterC className="action-buttons" filteredData={filteredData} setFilteredData={setFilteredData} />
                    {/* Search */}
                    <Search className='searcher' size='large' placeholder="input search text" allowClear onSearch={onSearch} />
                </Col>
                {/* Table and reactive buttons */}
                <Row gutter={16}>
                    <Col span={24}>
                        <Table
                            style={{ padding: '2%', overflowX: 'auto' }}
                            className="table-contracts"
                            columns={columns}
                            dataSource={filteredData}
                            pagination={{ pageSize: 5 }}
                            scroll={{ y: 55 * 6 }}
                        />
                    </Col>
                </Row>
                {/* Reactive buttons */}
                <Row gutter={16}>
                    <Col style={{ width: '95%', margin: 'auto', display: 'flex', justifyContent: 'space-evenly', gap: '10px', paddingBottom: '2%' }}>
                        <Button className='action-buttons' size='large' type="primary">Verify</Button>
                        <Button className='action-buttons' size='large' type="primary">Terminate</Button>
                        <Button className='action-buttons' size='large' type="primary">Request</Button>
                        <Button className='action-buttons' size='large' type="primary">Accept</Button>
                        <Button className='action-buttons' size='large' type="primary">Terminate</Button>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default ContractNegotiations;
