import React from 'react';
import { Table, Button } from 'antd';
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
];

const ContractNegotiations = () => {
    return (
        <div style={{ width:'90%', margin: 'auto', border: 'solid' }}>
            <div >
                <Table
                    style={{ width: '60%', padding: '2%' }}
                    className="table-contracts"
                    columns={columns}
                    dataSource={data}
                />
            </div>
            <div style={{ width:'40%'}}>
                <Button size='large' type="primary">Verify</Button>
                <Button size='large' type="primary">Terminate</Button>
                <Button size='large' type="primary">Request</Button>
                <Button size='large' type="primary">Accept</Button>
                <Button size='large' type="primary">Terminate</Button>
            </div>
        </div>
    );
};

export default ContractNegotiations;