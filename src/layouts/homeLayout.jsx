import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Button, Layout, Menu, theme } from 'antd';
import Profile from '../components/profile';
import Dashboard from '../pages/dashboard';
import ContractNegotiations from '../pages/contractNegotiations';
import SiderItems from '../components/menuItems';
const { Header, Content, Sider } = Layout;

const HomeLayout = () => {
  const [collapsed, setCollapsed] = useState(window.innerWidth < 980);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Effect to collapse sider when the window is smaller
  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth < 980);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [])

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Header style={{ padding: 0, background: '#001529', width: '100%', minHeight: 150 }}>
        <div style={{ padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ color: 'white', textAlign: 'center', alignSelf: 'end', flexGrow: '1', marginLeft:'8%' }}>Data space: Railway data space <Button>Change</Button> </h2>
          <Profile />
        </div>
      </Header>

      <Layout>
        <Content style={{ margin: '0', }}>
          <Layout
            style={{
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Sider width={280} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} style={{
              background: '#001529',
            }}
            >
              <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={SiderItems()} />
            </Sider>
            <Content
              style={{
                padding: '24px', minHeight: 'calc(100vh - 68px)', background: colorBgContainer, alignContent: 'start',
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
