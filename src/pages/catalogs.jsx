import React, { useState, useEffect } from 'react';
import { Table, Space, Button, Col } from 'antd';
import CatalogModal from '../components/catalogsComponents/addDataset';

function Catalogs() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState([]);

    // Main table columns
    const columns = [
        { title: 'Dataset ID', dataIndex: 'datasetId', key: 'datasetId', width: '12%' },
        { title: 'Title', dataIndex: 'title', key: 'title', width: '6%' },
        { title: 'Description', dataIndex: 'description', key: 'description', width: '17%' },
        { title: 'Endpoints', dataIndex: 'endpoints', key: 'endpoints', width: '15%' },
        { title: 'Offer Ids', dataIndex: 'offerIds', key: 'offerIds', width: '15%' },
        { title: 'Keywords', dataIndex: 'keywords', key: 'keywords', width: '15%', render: (keywords) => (keywords ? keywords.join(', ') : 'N/A') },
        { title: 'Format', dataIndex: 'format', key: 'format', width: '10%' },
        {
            title: '',
            render: () => (
                <Space>
                    <Button size="small" type="primary">Edit</Button>
                    <Button size="small" type='primary' danger>Delete</Button>
                </Space>
            ),
            width: '10%',
        },
    ];

    // Gets the stored data to show it on the table
    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('CatalogData') || '[]');
        setData(storedData);
    }, []);

    // Adds a new row to the table with the data from the form
    const addRowToTable = (datasetId, title, description, endpoint, offerId, keywords, format) => {
        const newData = {
            key: data.length + 1,
            datasetId,
            title,
            description,
            endpoints: endpoint,
            offerIds: offerId,
            keywords,
            format,
        };
        setData((prevData) => {
            const updatedData = [...prevData, newData];
            localStorage.setItem('CatalogData', JSON.stringify(updatedData));
            return updatedData;
        });
    };


    // Modal logic
    const showCatalogModal = () => setIsModalOpen(true);
    const handleCatalogOk = () => setIsModalOpen(false);
    const handleCatalogCancel = () => setIsModalOpen(false);

    // Content display
    return (
        <>
            <Col span={24} className="button-gridP" style={{ padding: '1%' }}>
                <Button onClick={showCatalogModal} style={{ width: '20%' }} className='action-button' size='large' type='primary'>Add Dataset</Button>
                <CatalogModal addRowToTable={addRowToTable} isModalOpen={isModalOpen} handleCatalogOk={handleCatalogOk} handleCatalogCancel={handleCatalogCancel}></CatalogModal>
            </Col>
            <Table style={{ marginTop: '2%' }} className='table-contracts'
                columns={columns}
                dataSource={data}
                scroll={{ x: '1500px', y: 93 * 6 }}
                pagination={false} />
        </>


    );
}

export default Catalogs;
