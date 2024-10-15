import React, { useState } from 'react';
import { Table, Button, Row, Col, Dropdown, Menu, Checkbox, Modal, Form } from 'antd';
import { DownOutlined, SearchOutlined } from '@ant-design/icons';
import '../styles/table-styles.css';

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

const ContractNegotiations = () => {

    const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
    const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);

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
    }
    const handleOfferOk = () => {
        setIsOfferModalOpen(false);
    };
    const handleOfferCancel = () => {
        setIsOfferModalOpen(false);
    };

    const [filteredData, setFilteredData] = useState(initialData)
    const [sortOrder, setSortOrder] = useState({});
    const [filterOptions, setFilterOptions] = useState({
        all: false,
        providers: false,
        consumers: false,
    })

    //Filter logic
    const handleFilterChange = (option) => {
        const newFilterOptions = { ...filterOptions }

        if (option === 'all') {
            const newState = !filterOptions.all
            newFilterOptions.all = newState
            newFilterOptions.providers = newState
            newFilterOptions.consumers = newState
        } else {
            newFilterOptions[option] = !filterOptions[option];
            if (newFilterOptions.providers || newFilterOptions.consumers) {
                newFilterOptions.all = false
            }
        }
        setFilterOptions(newFilterOptions);

        let filtered = initialData;
        if (newFilterOptions.all) {
            filtered = initialData.filter(item => item.provider && item.consumer);
        } else if (newFilterOptions.providers && newFilterOptions.consumers) {
            filtered = initialData.filter(item => item.provider && item.consumer);
        } else if (newFilterOptions.providers) {
            filtered = initialData.filter(item => item.provider);
        } else if (newFilterOptions.consumers) {
            filtered = initialData.filter(item => item.consumer);
        }
        setFilteredData(filtered);
    };

    // Sorter logic
    const handleSortClick = (sortBy) => {
        const order = sortOrder[sortBy] === 'ascend' ? 'descend' : 'ascend';
        const sorted = [...filteredData].sort((a, b) => {
            if (order === 'ascend') {
                return a[sortBy].localeCompare(b[sortBy]);
            } else {
                return b[sortBy].localeCompare(a[sortBy]);
            }
        });
        setSortOrder({ [sortBy]: order });
        setFilteredData(sorted);
    };

    // Filter and Sorter menu creation
    const filterMenu = (
        <Menu onClick={(e) => e.stopPropagation()}>
            <Menu.Item key="1">
                <Checkbox checked={filterOptions.all} onChange={() => handleFilterChange('all')}>All of them</Checkbox>
            </Menu.Item>
            <Menu.Item key="2">
                <Checkbox checked={filterOptions.providers} onChange={() => handleFilterChange('providers')}>Providers</Checkbox>
            </Menu.Item>
            <Menu.Item key="3">
                <Checkbox checked={filterOptions.consumers} onChange={() => handleFilterChange('consumers')}>Consumers</Checkbox>
            </Menu.Item>
        </Menu>
    );
    const sortMenu = (
        <Menu onClick={(e) => e.stopPropagation()}>
            <Menu.Item onClick={() => handleSortClick('processId')}>Process Id</Menu.Item>
            <Menu.Item onClick={() => handleSortClick('title')}>Title</Menu.Item>
            <Menu.Item onClick={() => handleSortClick('provider')}>Provider</Menu.Item>
            <Menu.Item onClick={() => handleSortClick('consumer')}>Consumers</Menu.Item>
        </Menu>
    );

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
                    <Button onClick={showRequestModal} style={{ width: '15%' }} size='large' type="primary">Request Contract</Button>
                    <Modal width={1000} open={isRequestModalOpen} onOk={handleRequestOk} onCancel={handleRequestCancel}>
                        <h2>Contract Form</h2>
                        <Form name='requestEndPoint' labelCol={{ span: 8, }} wrapperCol={{ span: 16, }} style={{ maxWidth: 600, }} initialValues={{ remember: true, }}>
                            <Form.Item label="Provider's Endpoint"
                                name="ProvidersEp"
                                rules={[{
                                    required: true,
                                    message: 'Insert your url endpoint'
                                }]}>
                            </Form.Item>
                        </Form>
                    </Modal>

                    {/* Offer form display */}
                    <Button onClick={showOfferModal} style={{ width: '15%' }} size='large' type="primary">Send Offer</Button>
                    <Modal width={1000} open={isOfferModalOpen} onOk={handleOfferOk} onCancel={handleOfferCancel}>
                        <p>Offer Form</p>
                        <p>Offer Form</p>
                        <p>Offer Form</p>
                    </Modal>

                    <Dropdown getPopupContainer={(trigger) => trigger.parentNode} overlay={filterMenu} trigger={['click']}>
                        <Button style={{ width: '15%' }} icon={<DownOutlined />} iconPosition='end' size='large' type="primary">Filter by</Button>
                    </Dropdown>
                    <Dropdown overlay={sortMenu} trigger={['click']}>
                        <Button style={{ width: '15%' }} icon={<DownOutlined />} iconPosition='end' size='large' type="primary">Sort by</Button>
                    </Dropdown>
                    <Button style={{ width: '15%' }} size='large' icon={<SearchOutlined />} type="primary">Search</Button>
                </Col>
                <Row gutter={16}>
                    <Col span={18}>
                        <Table
                            style={{ padding: '2%' }}
                            className="table-contracts"
                            columns={columns}
                            dataSource={filteredData}
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