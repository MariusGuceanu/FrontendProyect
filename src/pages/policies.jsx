import React, { useState } from 'react';
import { Table, Space } from 'antd';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';

function Policies() {
    const [expandedCells, setExpandedCells] = useState({}); // Estado para manejar expansión por celda

    // Manejo de expansión por celda (fila-columna)
    const toggleExpand = (rowKey, colName) => {
        const cellKey = `${rowKey}-${colName}`;
        setExpandedCells((prevState) => ({
            ...prevState,
            [cellKey]: !prevState[cellKey], // Alterna expansión
        }));
    };

    // Función para renderizar tablas anidadas
    const renderNestedTable = (data) => {
        const columns = [
            { title: 'Action', dataIndex: 'action', key: 'action' },
            {
                title: 'Rules',
                dataIndex: 'rules',
                key: 'rules',
                render: (rules) => (
                    <Table
                        dataSource={rules.map((constraint, index) => ({
                            key: index,
                            ...constraint,
                        }))}
                        columns={[
                            { title: 'Left Operand', dataIndex: 'leftOperand', key: 'leftOperand' },
                            { title: 'Operator', dataIndex: 'operator', key: 'operator' },
                            { title: 'Right Operand', dataIndex: 'rightOperand', key: 'rightOperand' },
                        ]}
                        pagination={false}
                    />
                ),
            },
        ];

        return (
            <Table
                dataSource={data.map((item, index) => ({
                    key: index,
                    ...item,
                }))}
                columns={columns}
                pagination={false}
            />
        );
    };

    // Render para cada columna con expansión
    const renderExpandableColumn = (record, colName, dataKey) => {
        const isExpanded = expandedCells[`${record.key}-${colName}`];
        const data = record[dataKey];

        return (
            <div>
                <Space>
                    {isExpanded ? (
                        <MinusCircleOutlined
                            onClick={() => toggleExpand(record.key, colName)}
                        />
                    ) : (
                        <PlusCircleOutlined
                            onClick={() => toggleExpand(record.key, colName)}
                        />
                    )}
                </Space>
                {isExpanded && (
                    <div style={{ marginTop: 10 }}>
                        {renderNestedTable(data)}
                    </div>
                )}
            </div>
        );
    };

    // Columnas principales
    const columns = [
        { title: 'Policy ID', dataIndex: 'policyId', key: 'policyId' },
        { title: 'Target', dataIndex: 'target', key: 'target' },
        {
            title: 'Permissions',
            key: 'permissions',
            render: (_, record) => renderExpandableColumn(record, 'permissions', 'permissions'),
        },
        {
            title: 'Prohibitions',
            key: 'prohibitions',
            render: (_, record) => renderExpandableColumn(record, 'prohibitions', 'prohibitions'),
        },
        {
            title: 'Obligations',
            key: 'obligations',
            render: (_, record) => renderExpandableColumn(record, 'obligations', 'obligations'),
        },
    ];

    // Datos de ejemplo
    const data = [
        {
            key: '1',
            policyId: 'Policy-1',
            target: 'Target-1',
            permissions: [
                {
                    action: 'use',
                    rules: [
                        { leftOperand: 'region', operator: 'eq', rightOperand: 'eu' },
                    ],
                },
            ],
            prohibitions: [
                {
                    action: 'deny',
                    rules: [
                        { leftOperand: 'age', operator: 'lt', rightOperand: '18' },
                    ],
                },
            ],
            obligations: [
                {
                    action: 'notify',
                    rules: [
                        { leftOperand: 'time', operator: 'gt', rightOperand: '2023-01-01' },
                    ],
                },
            ],
        },
        {
            key: '2',
            policyId: 'Policy-2',
            target: 'Target-2',
            permissions: [
                {
                    action: 'read',
                    rules: [
                        { leftOperand: 'country', operator: 'eq', rightOperand: 'US' },
                    ],
                },
            ],
            prohibitions: [],
            obligations: [],
        },
    ];

    return <Table className='table-contracts' columns={columns} dataSource={data} pagination={false} />;
}

export default Policies;
