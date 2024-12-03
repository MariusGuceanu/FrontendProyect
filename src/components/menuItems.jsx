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
        label: 'Ceit Connector',
        icon: <PieChartOutlined />,
        children: [
            {
                key: '1',
                label: <Link to="/home/dashboard">Dashboard</Link>,
            },
            {
                key: '2',
                label: <Link to="/home/organizations">Organization</Link>,
            },
            {
                key: '3',
                label: <Link to="/home/policies">Policies</Link>,
            },
            {
                key: '4',
                label: <Link to="/home/catalogs">Catalog</Link>,
            },
        ],
    },
    {
        key: 'sub2',
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
        key: 'sub3',
        label: 'Connectors',
        icon: <ApiOutlined />,
        children: [
            {
                key: '8',
                label: 'Connector 1',
            },
            {
                key: '9',
                label: 'Connector 2',
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