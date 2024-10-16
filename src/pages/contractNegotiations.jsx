import React, { useState } from 'react';
import {Table, Button, Row, Col, Modal, Select, Form, Input, Divider} from 'antd';
const { Search } = Input;
import { SendOutlined } from '@ant-design/icons';
import '../styles/table-styles.css';
import SorterC from '../components/sortMenu';
import FilterC from '../components/filterMenu';


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
    const [inputValue, setInputValue] = useState('');
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

    const selectBefore = (
        <Select defaultValue="http://">
            <Option value="http://">http://</Option>
            <Option value="https://">https://</Option>
        </Select>
    );
    const selectAfter = (
        <Select defaultValue=".com">
            <Option value=".com">.com</Option>
            <Option value=".jp">.jp</Option>
            <Option value=".cn">.cn</Option>
            <Option value=".org">.org</Option>
        </Select>
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
                    <Modal width={800} open={isRequestModalOpen} onOk={handleRequestOk} onCancel={handleRequestCancel}
                        footer={[
                            <div style={{ display: 'flex', justifyContent: 'space-evenly', padding: 10 }}>
                                <Button style={{ width: '20%' }} key="request" type='primary' size='large' icon={<SendOutlined />} iconPosition='end' onClick={handleRequestOk}>Request</Button>
                                <Button style={{ width: '20%' }} key="cancel" type='primary' size='large' onClick={handleRequestCancel}>Cancel</Button>
                            </div>
                        ]}>
                        <h2>Contract Form</h2>
                        <Form className='formRequest' name='requestEndPoint' labelCol={{ span: 8, }} wrapperCol={{ span: 16, }} style={{ maxWidth: 600, }} initialValues={{ remember: true, }}>
                            <Form.Item label="Provider's Endpoint : "
                                name="ProvidersEp"
                                rules={[{
                                    required: true,
                                    message: 'Insert your url endpoint'
                                }]}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Input addonBefore={selectBefore}
                                        addonAfter={selectAfter}
                                        value={inputValue}
                                        onChange={handleInputChange} />
                                    <Button type="primary" disabled={!inputValue} style={{ marginLeft: '10px' }}>Self-Description</Button>
                                </div>
                            </Form.Item>
                            <Divider style={{ borderColor: '#1e4792' }}></Divider>
                            <div style={{ width: '40%', margin: 'auto', alignContent: 'center', textAlign: 'center' }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare,
                                quae sunt a te dicta? Refert tamen, quo modo. Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Minus, quam expedita ipsam quibusdam dignissimos aperiam accusamus architecto! Aliquid provident
                                explicabo placeat, perspiciatis tempora possimus quod corrupti obcaecati minus commodi repudiandae?
                            </div>
                            <Divider style={{ borderColor: '#1e4792' }} ></Divider>
                            <Form.Item label="Offer ID :"
                                name="OfferId"
                                rules={[{
                                    required: true,
                                    message: 'Provide an UUID'
                                }]}>
                                <Input style={{ width: '80%' }}></Input>
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