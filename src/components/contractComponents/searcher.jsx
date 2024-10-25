import React from 'react';
import { Input } from 'antd';

const { Search } = Input;

const Searcher = ({ onSearch }) => {
    return (
        <Search
            className='searcher'
            size='large'
            placeholder="input search text"
            allowClear
            onSearch={onSearch}
        />
    );
};

export default Searcher;