import React, { useState } from 'react';
import { Table, Space, Button, Col } from 'antd';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import PolicyModal from '../components/policiesComponents/addPolicy';

function Policies() {
    const [expandedCells, setExpandedCells] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Toggle expand
    const toggleExpand = (uniqueKey) => {
        setExpandedCells((prevState) => ({
            ...prevState,
            [uniqueKey]: !prevState[uniqueKey],
        }));
    };

    // Main table columns
    const columns = [
        { title: 'Policy ID', dataIndex: 'policyId', key: 'policyId', width: '12%' },
        { title: 'Target', dataIndex: 'target', key: 'target', width: '4%' },
        {
            title: 'Permissions', key: 'permissions',
            render: (record) => renderExpandableColumn(record, 'permissions', 'permissions'), width: '25%'
        },
        {
            title: 'Prohibitions', key: 'prohibitions',
            render: (record) => renderExpandableColumn(record, 'prohibitions', 'prohibitions'), width: '25%'
        },
        {
            title: 'Obligations', key: 'obligations',
            render: (record) => renderExpandableColumn(record, 'obligations', 'obligations'), width: '25%'
        },
        {
            title: '',
            render: () => (
                <Space>
                    <Button size="small" type="primary">Edit</Button>
                    <Button size="small" danger>Delete</Button>
                </Space>
            ),
            width: '9%',
        },
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
                        { leftOperand: "region", operator: "eq", rightOperand: "eu" },
                        { leftOperand: "time", operator: "eq", rightOperand: "5.00" },
                        { leftOperand: "test", operator: "eq", rightOperand: "xyz44" }
                    ],
                },
                {
                    action: 'read',
                    constraints: [
                        { leftOperand: "region", operator: "eq", rightOperand: "eu" },
                        { leftOperand: "test", operator: "eq", rightOperand: "xyz44" }
                    ],
                },
            ],
            prohibitions: [
                {
                    action: 'string', constraints: [
                        { leftOperand: "region", operator: "eq", rightOperand: "eu" },
                        { leftOperand: "test", operator: "eq", rightOperand: "xyz44" }
                    ],
                },
            ],
            obligations: [
                {
                    action: 'string', constraints: [
                        { leftOperand: "test", operator: "eq", rightOperand: "xyz44" },
                        { leftOperand: "test", operator: "eq", rightOperand: "xyz44" },
                        { leftOperand: "test", operator: "eq", rightOperand: "xyz44" }
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
        {
            key: '2', policyId: 'urn:uuid:f41035a9-683f-11ef-b391-7cb27ddc6923', target: 'String',

        },
        
    ];

    // Function made to render a nested table
    const renderNestedTable = (data, parentKey) => {
        const columns = [
            { title: 'Action', dataIndex: 'action', key: 'action', width: '15%' },
            {
                title: 'Constraints',
                dataIndex: 'constraints',
                key: 'constraints',
                // Calls operands table to render
                render: (_, record, index) =>
                    renderNestedContraintsTable(record.constraints, `${parentKey}-${index}`),
                width: '85%'
            },
        ];
        // Action/constraints table
        return (
            <Table style={{ border: 'solid 1px', borderRadius: '2%', }}
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
                            { title: 'Left Operand', dataIndex: 'leftOperand', key: 'leftOperand' },
                            { title: 'Operator', dataIndex: 'operator', key: 'operator' },
                            { title: 'Right Operand', dataIndex: 'rightOperand', key: 'rightOperand' },
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
                <PolicyModal isModalOpen={isModalOpen} handlePolicyOk={handlePolicyOk} handlePolicyCancel={handlePolicyCancel}></PolicyModal>
            </Col>
            <Table style={{ marginTop: '2%' }} className='table-contracts' columns={columns} dataSource={data} pagination={false} />
        </>


    );
}

export default Policies;
