import React from "react";
import { Link } from 'react-router-dom';
import {
    SnippetsOutlined,
    PieChartOutlined,
    ApiOutlined,
    SolutionOutlined,
    ContainerOutlined
} from '@ant-design/icons';

// Items logic for the page navigation
const SiderItems = () => [
    {
        key: 'sub1',
        label: <Link to="/home/dashboard">Dashboard</Link>,
        icon: <PieChartOutlined />,
    },
    {
        key: 'sub2',
        label: 'Connector',
        icon: <ApiOutlined />,
        children: [,
            {
                key: '1',
                label: <Link to="/home/policies">Policies</Link>,
            },
            {
                key: '2',
                label: <Link to="/home/catalogs">Datasets</Link>,
            },
        ],
    },
    {
        key: 'sub3',
        label: 'Brokers',
        icon: <SnippetsOutlined />,
        children: [
            {
                key: '5',
                label: <Link to="/home/catalogs/new">+New</Link>,
            },
            {
                key: '6',
                label: 'Broker1',
            },
            {
                key: '7',
                label: 'Broker2',
            },
        ],
    },
    {
        key: 'sub4',
        label: <Link to="/home/contract-negotiations">Contract Negotiations</Link>,
        icon: <ContainerOutlined />,
    },
    {
        key: 'sub5',
        label: <Link to="/home/data-transfers">Data transfers</Link>,
        icon: <SolutionOutlined />,
    },
];

export default SiderItems;