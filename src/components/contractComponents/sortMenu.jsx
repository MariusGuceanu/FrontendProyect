import React, { useState } from 'react';
import { Button, Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const SorterC = ({ filteredData, setFilteredData }) => {
    const [sortOrder, setSortOrder] = useState({});

    const handleSortClick = (sortBy) => {
        const order = sortOrder[sortBy] === 'ascend' ? 'descend' : 'ascend';
        const sorted = [...filteredData].sort((a, b) => {
            if (order === 'ascend') {
                return a[sortBy].localeCompare(b[sortBy]);
            } else {
                return b[sortBy].localeCompare(a[sortBy]);
            }
        });
        setSortOrder({ [sortBy]: order });
        setFilteredData(sorted);
    };

    const sortMenu = (
        <Menu onClick={(e) => e.stopPropagation()}>
            <Menu.Item onClick={() => handleSortClick('processId')}>Process Id</Menu.Item>
            <Menu.Item onClick={() => handleSortClick('title')}>Title</Menu.Item>
            <Menu.Item onClick={() => handleSortClick('provider')}>Provider</Menu.Item>
            <Menu.Item onClick={() => handleSortClick('consumer')}>Consumers</Menu.Item>
        </Menu>
    );

    return (
        <Dropdown overlay={sortMenu} trigger={['click']}>
            <Button icon={<DownOutlined />} iconPosition='end' size='large' type="primary">
                Sort by
            </Button>
        </Dropdown>
    );
};

export default SorterC;