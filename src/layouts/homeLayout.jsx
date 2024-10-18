import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Layout, Menu, theme } from 'antd';
import Items from '../components/menuItems';
import Profile from '../components/profile';
import Dashboard from '../pages/dashboard';
import ContractNegotiations from '../pages/contractNegotiations';
import SiderItems from '../components/menuItems';
const { Header, Content, Sider } = Layout;

<Items />

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
          background: '#001529',
          width: '100%',
          minHeight: 210,
          alignContent: 'start'
        }}
      >
        <div>
          <Profile />
        </div>

        <div style={{
          padding: '0 16px',
        }}>
          <h2 style={{ color: 'white', textAlign: 'center', }}>Data space: Railway data space </h2>

        </div>
      </Header>

      <Layout>
        <Content
          style={{ margin: '0', }}>
          <Layout
            style={{
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Sider
              width={290}
              collapsible
              collapsed={collapsed}
              onCollapse={(value) => setCollapsed(value)}
              style={{
                background: '#001529',
              }}
            >
              <Menu theme="dark"
                defaultSelectedKeys={['1']}
                mode="inline"
                items={SiderItems()} />
            </Sider>
            <Content
              style={{
                padding: '24px',
                minHeight: 825,
                background: colorBgContainer,
                alignContent: 'center'
              }}
            >
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/contract-negotiations" element={<ContractNegotiations />} />
              </Routes>
            </Content>
          </Layout>
        </Content>
      </Layout>
    </Layout>

  );
};

export default HomeLayout;
