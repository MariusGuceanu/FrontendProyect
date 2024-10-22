import React, { useState } from 'react';
import { Button, Dropdown, Menu, Checkbox } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const FilterC = ({ setFilteredData, initialData }) => {
    const [filterOptions, setFilterOptions] = useState({
        all: false,
        providers: false,
        consumers: false,
    });

    // Filter logic
    const handleFilterChange = (option) => {
        const newFilterOptions = { ...filterOptions };

        if (option === 'all') {
            const newState = !filterOptions.all;
            newFilterOptions.all = newState;
            newFilterOptions.providers = newState;
            newFilterOptions.consumers = newState;
        } else {
            newFilterOptions[option] = !filterOptions[option];
            if (newFilterOptions.providers || newFilterOptions.consumers) {
                newFilterOptions.all = false;
            }
        }

        setFilterOptions(newFilterOptions);

        // Apply filter logic to the selected options
        let filtered = initialData;
        if (newFilterOptions.all) {
            filtered = initialData.filter(item => item.provider && item.consumer);
        } else if (newFilterOptions.providers && newFilterOptions.consumers) {
            filtered = initialData.filter(item => item.provider && item.consumer);
        } else if (newFilterOptions.providers) {
            filtered = initialData.filter(item => item.provider);
        } else if (newFilterOptions.consumers) {
            filtered = initialData.filter(item => item.consumer);
        }

        setFilteredData(filtered);
    };

    // Menu creation logic
    const filterMenu = (
        <Menu onClick={(e) => e.stopPropagation()}>
            <Menu.Item key="1">
                <Checkbox checked={filterOptions.all} onChange={() => handleFilterChange('all')}>All of them</Checkbox>
            </Menu.Item>
            <Menu.Item key="2">
                <Checkbox checked={filterOptions.providers} onChange={() => handleFilterChange('providers')}>Providers</Checkbox>
            </Menu.Item>
            <Menu.Item key="3">
                <Checkbox checked={filterOptions.consumers} onChange={() => handleFilterChange('consumers')}>Consumers</Checkbox>
            </Menu.Item>
        </Menu>
    );

    // Menu display 
    return (
        <Dropdown getPopupContainer={(trigger) => trigger.parentNode} overlay={filterMenu} trigger={['click']}>
            <Button icon={<DownOutlined />} iconPosition='end' size='large' type="primary">
                Filter by
            </Button>
        </Dropdown>
    );
};

export default FilterC;