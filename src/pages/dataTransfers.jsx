import React, { useState, useEffect } from 'react';
import { Table, Button, Row, Col } from 'antd';
import '../styles/table-styles.css';
import SorterC from '../components/contractComponents/sortMenu';
import FilterC from '../components/contractComponents/filterMenu';
import Searcher from '../components/contractComponents/searcher';
import { useWebSocket, WebSocketProvider } from '../WebSocketProvider';

// Table columns
const columns = [
    { title: 'Transfer ID', dataIndex: 'transferId', width: '30%' },
    { title: 'Title', dataIndex: 'title', width: '15%' },
    { title: 'Provider', dataIndex: 'provider', width: '15%' },
    { title: 'Current state', dataIndex: 'currentState', width: '15%' },
    { title: 'Initiated date', dataIndex: 'initiatedDate', width: '25%' },
];

const DataTransfers = () => {
    const ws = useWebSocket();
    const [selectedRow, setSelectedRow] = useState(null);
    const [filteredData, setFilteredData] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('TransfersData') || '[]');
        setData(storedData);
        setFilteredData(storedData);
    }, []);

    useEffect(() => {
        if (!ws) return;

        ws.onmessage = (event) => {
            const newTransfer = JSON.parse(event.data);
            console.log('WebSocket message: ', newTransfer);
            const formattedData = {
                key: newTransfer.id,
                transferId: newTransfer.id,
                title: newTransfer.title || 'Title',
                provider: newTransfer.provider ? 'true' : 'false',
                currentState: newTransfer.state.replace('dspace:', ''),
                initiatedDate: new Date().toLocaleString(),
            };

            const existingData = JSON.parse(localStorage.getItem('TransfersData')) || [];
            const existingIndex = existingData.findIndex(item => item.transferId === formattedData.transferId);

            let updatedData;
            if (existingIndex !== -1) {
                existingData[existingIndex].currentState = formattedData.currentState;
                updatedData = [...existingData];
            } else {
                updatedData = [...existingData, formattedData];
            }

            setData(updatedData);
            setFilteredData(updatedData);
            localStorage.setItem('TransfersData', JSON.stringify(updatedData));
        };

        ws.onclose = () => console.log('WebSocket connection closed');
        ws.onerror = (error) => console.error('WebSocket error:', error);
    }, [ws]);

    const rowSelection = {
        onChange: (_, selectedRows) => setSelectedRow(selectedRows[0]),
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            name: record.name,
        }),
    };

    const onSearch = (value) => {
        const filtered = data.filter(item =>
            item.transferId.toLowerCase().includes(value.toLowerCase()) ||
            item.title.toLowerCase().includes(value.toLowerCase()) ||
            item.provider.toLowerCase().includes(value.toLowerCase()) ||
            item.currentState.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredData(filtered);
    };

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '3%' }}>
                <Button className="large-buttons" type="primary">Ongoing Transfers</Button>
                <Button className="large-buttons" type="primary">History</Button>
            </div>

            <div style={{ width: '100%', margin: 'auto', border: 'solid', borderRadius: 6 }}>
                <Row gutter={16} />
                <Col span={24} className="button-grid" style={{ padding: '2%' }}>
                    <FilterC className="action-buttons" setFilteredData={setFilteredData} initialData={data} />
                    <SorterC className="action-buttons" filteredData={filteredData} setFilteredData={setFilteredData} />
                    <Searcher onSearch={onSearch} />
                </Col>

                <Row gutter={16}>
                    <Col span={24}>
                        <Table
                            style={{ padding: '2%', overflowX: 'auto' }}
                            className="table-contracts"
                            rowSelection={{
                                type: 'checkbox',
                                ...rowSelection,
                            }}
                            columns={columns}
                            dataSource={filteredData}
                            pagination={{ pageSize: 10 }}
                            scroll={{ y: 55 * 6 }}
                        />
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default DataTransfers;
