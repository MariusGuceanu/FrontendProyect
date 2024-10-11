import React from "react";
import {
    SnippetsOutlined,
    PieChartOutlined,
    ApiOutlined,
    SolutionOutlined,
    ContainerOutlined
  } from '@ant-design/icons';

function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  
  const Items = () => [
    {
      key: 'sub1',
      label: 'Ceit Connector',
      icon: <PieChartOutlined />,
      children: [
        {
          key: '1',
          label: 'DashBoard',
  
        },
        {
          key: 'subSD',
          label: 'Self-description',
          children: [
            {
              key: '2',
              label: 'View/Edit',
            },
            {
              key: '3',
              label: 'Publish',
            },
            {
              key: '4',
              label: 'Enable/Disable'
            },
          ],
        },
      ],
    },
    {
      key: 'sub2',
      label: 'Catalogs',
      icon: <SnippetsOutlined />,
      children: [
        {
          key: '5',
          label: '+New',
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
      icon: <ApiOutlined/>,
      children: [
        {
          key: '8',
          label: 'Connector 1',
        },
        {
          key: '9',
          label: 'Connector 2'
        }
      ],
    },
    {
      key: 'sub4',
      label: 'Contract Negotiations',
      icon: <ContainerOutlined />,
    },
    {
      key: 'sub5',
      label: 'Data Transfers',
      icon: <SolutionOutlined/>,
      children: [
        {
          key: '10',
          label: '+New'
        }
      ],
    },
  ];


export default Items;