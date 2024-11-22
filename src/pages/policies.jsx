import React, { useState } from 'react';
import { Table, Space, Button } from 'antd';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';

function Policies() {
    // Estado para manejar las filas expandidas
    const [expandedRowKeys, setExpandedRowKeys] = useState([]);

    // Definir las columnas de la tabla expandida
    const expandedRowRender = (record) => {
        const columns = [
            { title: 'Action', dataIndex: 'action', key: 'action', width: '20%' },
            {
                title: 'Rules',
                key: 'state',
                render: () => (
                    <Space size="middle">
                        <PlusCircleOutlined
                            size="small"
                            onClick={() => toggleExpand(record)} />
                    </Space>
                ),
                width: '80%'
            },
        ];

        const data = [];
        for (let i = 0; i < 1; ++i) {
            data.push({
                key: `${record.key}-${i}`,
                action: '2014-12-24 23:12:00',
                rules: `Detail ${i} for ${record.policyId}`,
            });
        }
        return <Table columns={columns} dataSource={data} pagination={false} />;
    };

    // Manejo de expansión
    const toggleExpand = (record) => {
        setExpandedRowKeys((prevKeys) => {
            if (prevKeys.includes(record.key)) {
                return prevKeys.filter((key) => key !== record.key);
            }
            return [...prevKeys, record.key];
        });
    };

    // Definir las columnas de la tabla principal
    const columns = [
        { title: 'Policy ID', dataIndex: 'policyId', key: 'policyId' },
        { title: 'Target', dataIndex: 'target', key: 'target' },
        {
            title: 'Permissions', dataIndex: 'permissions', key: 'permissions',
            render: (_, record) => (
                <Space size="middle" style={{ alignSelf: 'center' }}>
                    <PlusCircleOutlined
                        size="small"
                        onClick={() => toggleExpand(record)} />
                </Space>
            ),
        },
        {
            title: 'Prohibitions', dataIndex: 'prohibitions', key: 'prohibitions',
            render: (_, record) => (
                <Space size="middle">
                    <PlusCircleOutlined
                        size="small"
                        onClick={() => toggleExpand(record)} />
                </Space>
            ),
        },
        {
            title: 'Obligations', dataIndex: 'obligations', key: 'obligations',
            render: (_, record) => (
                <Space size="middle">
                    <PlusCircleOutlined
                        size="small"
                        onClick={() => toggleExpand(record)} />
                </Space>
            ),
        },
    ];

    const data = Array.from({ length: 2 }).map((_, i) => ({
        key: i.toString(),
        policyId: `Policy-${i}`,
        target: `Target-${i}`,
        permissions: `Permission-${i}`,
        prohibitions: `Prohibition-${i}`,
        obligations: `Obligation-${i}`,
    }));

    return (
        <Table
            className="table-contracts"
            columns={columns}
            dataSource={data}
            expandable={{
                expandedRowRender,
                rowExpandable: () => true,
            }}
            expandedRowKeys={expandedRowKeys}
            expandIconColumnIndex={-1}
        />
    );
}

export default Policies;
