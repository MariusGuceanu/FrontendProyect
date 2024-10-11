import React from 'react';
import { Table, Button, Row, Col } from 'antd';
import {SearchOutlined} from '@ant-design/icons';
import '../styles/table-styles.css';

const columns = [
    {
        title: 'Process ID',
        dataIndex: 'processId',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Tittle',
        dataIndex: 'tittle',
    },
    {
        title: 'Provider',
        dataIndex: 'provider',
    },
    {
        title: 'Consumer',
        dataIndex: 'consumer',
    },
    {
        title: 'Current state',
        dataIndex: 'currentState',
    },
];
const data = [
    {
        key: '1',
        processId: 'ceitId',
        tittle: 'Ceit',
        provider: 'ceit',
        consumer: 'client',
        currentState: 'ongoing',
    },
    {
        key: '2',
        processId: 'ceitId',
        tittle: 'Ceit',
        provider: 'ceit',
        consumer: 'client',
        currentState: 'ongoing',
    },
    {
        key: '3',
        processId: 'ceitId',
        tittle: 'Ceit',
        provider: 'ceit',
        consumer: 'client',
        currentState: 'ongoing',
    },
    {
        key: '4',
        processId: 'ceitId',
        tittle: 'Ceit',
        provider: 'ceit',
        consumer: 'client',
        currentState: 'ongoing',
    },
    {
        key: '5',
        processId: 'ceitId',
        tittle: 'Ceit',
        provider: 'ceit',
        consumer: 'client',
        currentState: 'ongoing',
    },
    {
        key: '6',
        processId: 'ceitId',
        tittle: 'Ceit',
        provider: 'ceit',
        consumer: 'client',
        currentState: 'ongoing',
    },
    {
        key: '7',
        processId: 'ceitId',
        tittle: 'Ceit',
        provider: 'ceit',
        consumer: 'client',
        currentState: 'ongoing',
    },
    {
        key: '8',
        processId: 'ceitId',
        tittle: 'Ceit',
        provider: 'ceit',
        consumer: 'client',
        currentState: 'ongoing',
    },

];

const ContractNegotiations = () => {
    return (
        <div style={{ width: '100%', margin: 'auto', border: 'solid' }}>
            <Row gutter={16}/>
            <Col span={24} style={{ display: 'flex', gap: '10px', justifyContent: 'space-evenly', padding: '2%' }}>
                <Button size='large' type="primary">Request Contract</Button>
                <Button size='large' type="primary">Send Offer</Button>
                <Button size='large' type="primary">Filter by</Button>
                <Button size='large' type="primary">Sort by</Button>
                <Button size='large' icon={<SearchOutlined />} type="primary">Search</Button>
            </Col>
            <Row gutter={16}>
                <Col span={16}>
                    <Table
                        style={{ padding: '2%' }}
                        className="table-contracts"
                        columns={columns}
                        dataSource={data}
                        pagination={{ pageSize: 6 }}
                    />
                </Col>
                <Col span={8} style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'flex-start', alignItems: 'flex-end', padding: '2%' }}>
                    <Button size='large' type="primary">Verify</Button>
                    <Button size='large' type="primary">Terminate</Button>
                    <Button size='large' type="primary">Request</Button>
                    <Button size='large' type="primary">Accept</Button>
                    <Button size='large' type="primary">Terminate</Button>
                </Col>
            </Row>
        </div>
    );
};

export default ContractNegotiations;