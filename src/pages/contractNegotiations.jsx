import React, { useState } from 'react';
import { Table, Button, Row, Col, Modal, Select, Form, Input, Divider } from 'antd';
const { Search } = Input;
import { SendOutlined } from '@ant-design/icons';
import '../styles/table-styles.css';
import SorterC from '../components/contractComponents/sortMenu';
import FilterC from '../components/contractComponents/filterMenu';
import RequestModal from '../components/contractComponents/contractForm';

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

const onSearch = (value, _e, info) => console.log(info?.source, value);

const ContractNegotiations = () => {

    /*  // Select Ids
        const [selectedRowKeys, setSelectedRowKeys] = useState([]);
        const onSelectChange = (newSelectedRowKeys) => {
            console.log('selectedRowKeys changed: ', newSelectedRowKeys);
            setSelectedRowKeys(newSelectedRowKeys);
        };
        const rowSelection = {
            selectedRowKeys,
            onChange: onSelectChange,
        };
        */

    // Defining States
    const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
    const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
    const [filteredData, setFilteredData] = useState(initialData)

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
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }

    // Offer modal functions
    const showOfferModal = () => {
        setIsOfferModalOpen(true);
    }
    const handleOfferOk = () => {
        setIsOfferModalOpen(false);
    };
    const handleOfferCancel = () => {
        setIsOfferModalOpen(false);
    };

    // All content display
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Button style={{ width: '35%', padding: 30 }} size='large' type="primary">Ongoing Processes</Button>
                <Button style={{ width: '35%', padding: 30 }} size='large' type="primary">History</Button>
            </div>

            <div style={{ width: '100%', margin: 'auto', border: 'solid', borderRadius: 10, }}>
                <Row gutter={16} />
                <Col span={24} style={{ display: 'flex', gap: '10px', justifyContent: 'space-evenly', padding: '2%' }}>

                    {/* Request contract form display */}
                    <Button onClick={showRequestModal} style={{ width: '15%' }} size="large" type="primary">Request Contract</Button>
                    <RequestModal isModalOpen={isRequestModalOpen} handleOk={handleRequestOk} handleCancel={handleRequestCancel} />

                    {/* Offer form display */}
                    <Button onClick={showOfferModal} style={{ width: '15%' }} size='large' type="primary">Send Offer</Button>
                    <Modal width={1000} open={isOfferModalOpen} onOk={handleOfferOk} onCancel={handleOfferCancel}>
                        <p>Offer Form</p>
                        <p>Offer Form</p>
                        <p>Offer Form</p>
                    </Modal>

                    <FilterC setFilteredData={setFilteredData} initialData={initialData} />

                    <SorterC filteredData={filteredData} setFilteredData={setFilteredData} />

                    <Search className='searcher' size='large' color='dark' placeholder="input search text" allowClear onSearch={onSearch} style={{ width: 200, }}
                    />
                </Col>
                <Row gutter={16}>
                    <Col span={18}>
                        <Table
                            style={{ padding: '2%' }}
                            className="table-contracts"
                            columns={columns}
                            dataSource={filteredData}
                            // rowSelection={rowSelection}
                            pagination={{ pageSize: 50 }}
                            scroll={{ y: 55 * 5 }}
                        />
                    </Col>
                    <Col span={6} style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'flex-start', alignItems: 'flex-start', padding: '2%', marginTop: '3%' }}>
                        <Col style={{ display: 'flex', gap: '10px', justifyContent: 'space-evenly' }}>
                            <Button size='large' type="primary">Verify</Button>
                            <Button size='large' type="primary">Terminate</Button>
                        </Col>
                        <Col style={{ display: 'flex', gap: '10px', justifyContent: 'space-evenly' }}>
                            <Button size='large' type="primary">Request</Button>
                            <Button size='large' type="primary">Accept</Button>
                            <Button size='large' type="primary">Terminate</Button>
                        </Col>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default ContractNegotiations;