import React, { useState } from 'react';
import {
  SnippetsOutlined,
  PieChartOutlined,
  ApiOutlined,
  SolutionOutlined
} from '@ant-design/icons';
import { Breadcrumb, Flex, Layout, Menu, theme } from 'antd';

const { Header, Content, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem('Ceit Connector', '1', <PieChartOutlined />, [
    getItem('Dashboard', 'sub1'),
    {
      type: 'group',
      label: 'Self-Description',
      children: [
        getItem('View/Edit', 'sd1'),
        getItem('Publish', 'sd2'),
        getItem('Enable/Disable', 'sd3'),
      ],
    },
  ]),
  getItem('Catalogs', '2', <SnippetsOutlined />, [
    getItem('+New', 'sub3'),
    getItem('Broker 1', 'sub4'),
    getItem('Broker 2', 'sub5'),
  ]),
  getItem('Connectors', '3', <ApiOutlined />, [
    getItem('Connector 1', 'sub6'),
    getItem('Connector 2', 'sub7'),

  ]),
  getItem('Data Transfers', '4', <SolutionOutlined />, [
    {
      type: 'group',
      label: '+New',
      children: [
        getItem('Request', 'new1'),
        getItem('Send Offer', 'new2'),
      ],
    },
    getItem('Ongoing', 'sub10'),
    getItem('History', 'sub11'),
  ]),
];

const HomeLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Header
        style={{
          padding: 0,
          background: '#0c306b',
          width: '100%',
          minHeight: 150,
        }}
      >
        <div style={{
          padding: '0 16px',
        }}>
          <h2 style={{ color: 'white', textAlign: 'center', }}>Data space: Railway data space </h2>
        </div>
      </Header>

      <Layout>
        <Content
          style={{
            margin: '0',
          }}
        >
          <Layout
            style={{
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Sider
              collapsible
              collapsed={collapsed}
              onCollapse={(value) => setCollapsed(value)}
              style={{
                background: '#001529',
              }}
            >
              <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
            </Sider>

            <Content
              style={{
                padding: '24px',
                minHeight: 825,
                background: colorBgContainer,
                alignContent: 'center'
              }}
            >
              <Breadcrumb
                style={{
                  marginBottom: '16px',
                  fontSize: 50,
                  display: 'flex',
                  justifyContent: 'center'
                }}
                items={[
                  { title: 'Select from the sider' },
                  { title: '' }
                ]}
              />

            </Content>
          </Layout>
        </Content>
      </Layout>
    </Layout>
  );
};

export default HomeLayout;
