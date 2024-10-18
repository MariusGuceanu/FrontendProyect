import React, { useState } from 'react';
import { Table, Button, Row, Col, Modal, Select, Form, Input } from 'antd';
import '../styles/table-styles.css';
import SorterC from '../components/contractComponents/sortMenu';
import FilterC from '../components/contractComponents/filterMenu';
import RequestModal from '../components/contractComponents/contractForm';
import OfferModal from '../components/contractComponents/offerForm';

// Static data for the table
const initialData = [
    { key: '1', processId: 'ceitOne', title: 'Ceita', provider: 'ceita', consumer: 'clienta', currentState: 'ongoing' },
    { key: '2', processId: 'ceitTwo', title: 'Ceitb', provider: '', consumer: 'clientb', currentState: 'terminated' },
    { key: '3', processId: 'ceitThree', title: 'Ceitc', provider: 'ceitc', consumer: '', currentState: 'ongoing' },
    { key: '4', processId: 'ceitFour', title: 'Ceitd', provider: 'ceitd', consumer: 'clientd', currentState: 'ongoing' },
    { key: '5', processId: 'ceitFive', title: 'Ceite', provider: 'ceite', consumer: '', currentState: 'ongoing' },
    { key: '6', processId: 'ceitSix', title: 'Ceitf', provider: '', consumer: 'clientf', currentState: 'terminated' },
];

// Table columns
const columns = [
    { title: 'Process ID', dataIndex: 'processId', },
    { title: 'Title', dataIndex: 'title', },
    { title: 'Provider', dataIndex: 'provider', },
    { title: 'Consumer', dataIndex: 'consumer', },
    { title: 'Current state', dataIndex: 'currentState', },
];

const { Search } = Input;

const ContractNegotiations = () => {
    // Defining States
    const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
    const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
    const [filteredData, setFilteredData] = useState(initialData);

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
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Button className="large-buttons" type="primary">Ongoing Processes</Button>
                <Button className="large-buttons" type="primary">History</Button>
            </div>

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
        <FilterC className="action-buttons" setFilteredData={setFilteredData} initialData={initialData} />
        <SorterC className="action-buttons" filteredData={filteredData} setFilteredData={setFilteredData} />

        {/* Search */}
        <Search className='searcher' size='large' placeholder="input search text" allowClear onSearch={onSearch} />

    </Col>

    <Row gutter={16}>
        <Col span={24}>
            <Table
                style={{ padding: '2%', overflowX: 'auto' }}
                className="table-contracts"
                columns={columns}
                dataSource={filteredData}
                pagination={{ pageSize: 50 }}
                scroll={{ y: 55 * 10 }}
            />
        </Col>
    </Row>

    <Row gutter={16}>
        <Col style={{ width: '100%', margin: 'auto', display: 'flex', justifyContent: 'space-evenly', gap: '10px', paddingBottom: '2%' }}>
            <Button style={{ width: '15%' }} size='large' type="primary">Verify</Button>
            <Button style={{ width: '15%' }} size='large' type="primary">Terminate</Button>
            <Button style={{ width: '15%' }} size='large' type="primary">Request</Button>
            <Button style={{ width: '15%' }} size='large' type="primary">Accept</Button>
            <Button style={{ width: '15%' }} size='large' type="primary">Terminate</Button>
        </Col>
    </Row>
</div>


        </>
    );
};

export default ContractNegotiations;
