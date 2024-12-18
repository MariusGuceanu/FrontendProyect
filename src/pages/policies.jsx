import React, { useState, useEffect } from 'react';
import { Table, Space, Button, Col } from 'antd';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import PolicyModal from '../components/catalogsComponents/addPolicy';

function Policies() {
    const [expandedCells, setExpandedCells] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState([]);

    // Main table columns
    const columns = [
        { title: 'Policy ID', dataIndex: 'policyId', key: 'policyId', width: '9.5%' },
        { title: 'Target', dataIndex: 'target', key: 'target', width: '5%' },
        {
            title: 'Permissions', key: 'permissions',
            render: (record) => renderExpandableColumn(record, 'permissions', 'permissions'), width: '25%'
        },
        {
            title: 'Prohibitions', key: 'prohibitions',
            render: (record) => renderExpandableColumn(record, 'prohibitions', 'prohibitions'), width: '26%'
        },
        {
            title: 'Obligations', key: 'obligations',
            render: (record) => renderExpandableColumn(record, 'obligations', 'obligations'), width: '26%'
        },
        {
            title: '',
            render: () => (
                <Space>
                    <Button size="small" type="primary">Edit</Button>
                    <Button size="small" type='primary' danger>Delete</Button>
                </Space>
            ),
            width: '8.5%',
        },
    ];

    // Gets the stored data to show it on the table
    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('PolicyData') || '[]');
        setData(storedData);
    }, []);

    // Adds a new row to the table with the data from the form
    const addRowToTable = (policyId, target, rules) => {

        // Filter to get the data from the form
        const permissions = rules.filter(rule => rule.type === "permissions");
        const prohibitions = rules.filter(rule => rule.type === "prohibitions");
        const obligations = rules.filter(rule => rule.type === "obligations");

        const newData = {
            key: data.length + 1,
            policyId: policyId,
            target: target,
            permissions,
            prohibitions,
            obligations,
        };

        // Sets the data
        setData((prevData) => {
            const updatedData = [...prevData, newData];
            localStorage.setItem('PolicyData', JSON.stringify(updatedData));
            return updatedData;
        });
    };

    // Toggle expand
    const toggleExpand = (uniqueKey) => {
        setExpandedCells((prevState) => ({
            ...prevState,
            [uniqueKey]: !prevState[uniqueKey],
        }));
    };

    // Function made to render a nested table
    const renderNestedTable = (data, parentKey) => {
        const columns = [
            { title: 'Action', dataIndex: 'action', key: 'action', width: '12%' },
            {
                title: 'Constraints',
                dataIndex: 'constraints',
                key: 'constraints',
                // Calls operands table to render
                render: (_, record, index) =>
                    renderNestedContraintsTable(record.constraints, `${parentKey}-${index}`),
                width: '88%'
            },
        ];
        // Action/constraints table
        return (
            <Table style={{ width: '100%', border: 'solid 1px', borderRadius: '2%', tableLayout: 'fixed', overflowX: 'auto' }}
                dataSource={data.map((item, index) => ({
                    key: index,
                    ...item,
                }))}
                scroll={{ x: 'max-content' }}
                columns={columns}
                pagination={false}
            />
        );
    };

    // Function made to render the second nested table
    const renderNestedContraintsTable = (constraints, parentKey) => {
        const uniqueKey = `${parentKey}-constraints`;
        const isExpanded = expandedCells[uniqueKey];

        return (
            <div style={{ marginBottom: 10 }}>
                <Space style={{ display: 'flex', justifyContent: 'center' }}>
                    {isExpanded ? (
                        <MinusCircleOutlined
                            onClick={() => toggleExpand(uniqueKey)}
                        />
                    ) : (
                        <PlusCircleOutlined
                            onClick={() => toggleExpand(uniqueKey)}
                        />
                    )}
                </Space>
                {isExpanded && (
                    <Table style={{ border: 'solid 1px', borderRadius: '2%', marginTop: 10 }}
                        dataSource={constraints.map((constraint, index) => ({
                            ...constraint, key: `${uniqueKey}-${index}`,
                        }))}
                        columns={[
                            { title: 'Left Operand', dataIndex: 'leftOperand', key: 'leftOperand', width: '34%' },
                            { title: 'Operator', dataIndex: 'operator', key: 'operator', width: '33%' },
                            { title: 'Right Operand', dataIndex: 'rightOperand', key: 'rightOperand', width: '34%' },
                        ]}
                        pagination={false}
                    />
                )}
            </div>
        );
    };

    // Render for each column with expansion
    const renderExpandableColumn = (record, colName, dataKey) => {
        const uniqueKey = `${record.key}-${colName}`;
        const isExpanded = expandedCells[uniqueKey];
        const data = record[dataKey];

        if (!data || data.length === 0) {
            return <div style={{ textAlign: 'center', color: 'gray' }}>None</div>;
        }

        return (
            <div>
                <Space style={{ display: 'flex', justifyContent: 'center' }} >
                    {isExpanded ? (
                        <MinusCircleOutlined
                            onClick={() => toggleExpand(uniqueKey)}
                        />
                    ) : (
                        <PlusCircleOutlined
                            onClick={() => toggleExpand(uniqueKey)}
                        />
                    )}
                </Space>
                {isExpanded && (
                    <div style={{ marginTop: 10 }}>
                        {renderNestedTable(data, uniqueKey)}
                    </div>
                )}
            </div>
        );
    };

    // Modal logic
    const showPolicyModal = () => setIsModalOpen(true);
    const handlePolicyOk = () => setIsModalOpen(false);
    const handlePolicyCancel = () => setIsModalOpen(false);

    // Content display
    return (
        <>
            <Col span={24} className="button-gridP" style={{ padding: '1%' }}>
                <Button onClick={showPolicyModal} style={{ width: '20%' }} className='action-button' size='large' type='primary'>Add Policy</Button>
                <PolicyModal addRowToTable={addRowToTable} isModalOpen={isModalOpen} handlePolicyOk={handlePolicyOk} handlePolicyCancel={handlePolicyCancel}></PolicyModal>
            </Col>
            <Table style={{ marginTop: '2%' }} className='table-contracts'
                columns={columns} dataSource={data}
                scroll={{ x: '1570px', y: 93 * 6 }}
                pagination={false} />
        </>


    );
}

export default Policies;
