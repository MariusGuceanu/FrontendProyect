import React, { useState } from 'react';
import { Table, Space } from 'antd';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';

function Policies() {
    const [expandedCells, setExpandedCells] = useState({});

    // Toggle expand
    const toggleExpand = (uniqueKey) => {
        setExpandedCells((prevState) => ({
            ...prevState,
            [uniqueKey]: !prevState[uniqueKey],
        }));
    };

    // Main table columns
    const columns = [
        { title: 'Policy ID', dataIndex: 'policyId', key: 'policyId', width: '11%' },
        { title: 'Target', dataIndex: 'target', key: 'target', width: '5%' },
        { title: 'Permissions', key: 'permissions', render: (_, record) => renderExpandableColumn(record, 'permissions', 'permissions'), width: '28%' },
        { title: 'Prohibitions', key: 'prohibitions', render: (_, record) => renderExpandableColumn(record, 'prohibitions', 'prohibitions'), width: '28%' },
        { title: 'Obligations', key: 'obligations', render: (_, record) => renderExpandableColumn(record, 'obligations', 'obligations'), width: '28%' },
    ];

    // Example data
    const data = [
        {
            key: '1',
            policyId: 'urn:uuid:f41035a9-683f-11ef-b391-7cb27ddc6923',
            target: 'String',
            permissions: [
                {
                    action: 'use', constraints: [
                        { leftOperand: 'region', operator: 'eq', rightOperand: 'eu' },
                    ],
                },
            ],
            prohibitions: [
                {
                    action: 'string', constraints: [
                        { leftOperand: 'string', operator: 'string', rightOperand: 'string' },
                    ],
                },
            ],
            obligations: [
                {
                    action: 'string', constraints: [
                        { leftOperand: 'string', operator: 'string', rightOperand: 'string' },
                    ],
                },
            ],
        },
        {
            key: '2', policyId: 'urn:uuid:f41035a9-683f-11ef-b391-7cb27ddc6923', target: 'String',
            permissions: [
                {
                    action: 'use',
                    constraints: [
                        { leftOperand: 'country', operator: 'eq', rightOperand: 'Spain' },
                    ],
                },
            ],
            prohibitions: [
                {
                    action: 'string', constraints: [
                        { leftOperand: 'string', operator: 'string', rightOperand: 'string' },
                    ],
                },
            ],
            obligations: [
                {
                    action: 'string', constraints: [
                        { leftOperand: 'string', operator: 'string', rightOperand: 'string' },
                    ],
                },
            ],
        },
    ];

    // Function made to render a nested table
    const renderNestedTable = (data, parentKey) => {
        const columns = [
            { title: 'Action', dataIndex: 'action', key: 'action' },
            {
                title: 'Constraints',
                dataIndex: 'constraints',
                key: 'constraints',
                // Calls operands table to render
                render: (_, record, index) =>
                    renderNestedTable2(record.constraints, `${parentKey}-${index}`),
            },
        ];
        // Use/actions table
        return (
            <Table style={{ border: 'solid 1px', borderRadius: '2%' }}
                dataSource={data.map((item, index) => ({
                    key: index,
                    ...item,
                }))}
                columns={columns}
                pagination={false}
            />
        );
    };

    // Function made to render the second nested table
    const renderNestedTable2 = (constraints, parentKey) => {
        return constraints.map((constraint, index) => {
            const uniqueKey = `${parentKey}-constraint-${index}`;
            const isExpanded = expandedCells[uniqueKey];

            return (
                <div key={index} style={{ marginBottom: 10 }}>
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
                            dataSource={[{ ...constraint, key: index }]}
                            columns={[
                                { title: 'Left Operand', dataIndex: 'leftOperand', key: 'leftOperand' },
                                { title: 'Operator', dataIndex: 'operator', key: 'operator' },
                                { title: 'Right Operand', dataIndex: 'rightOperand', key: 'rightOperand' },
                            ]}
                            pagination={false}
                        />
                    )}
                </div>
            );
        });
    };

    // Render for each column with expansion
    const renderExpandableColumn = (record, colName, dataKey) => {
        const uniqueKey = `${record.key}-${colName}`;
        const isExpanded = expandedCells[uniqueKey];
        const data = record[dataKey];

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

    // Content display
    return <Table style={{ marginTop: '2%' }} className='table-contracts' columns={columns} dataSource={data} pagination={false} />;
}

export default Policies;
